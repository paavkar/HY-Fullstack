import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const returnedPatient = patientService.getPatient(req.params.id);

  if (!returnedPatient) {
    return res.status(404).send({ error: "no patient found with given id" });
  }
  return res.status(200).send(returnedPatient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const returnedPatient = patientService.getPatient(req.params.id);

  if (!returnedPatient) {
    return res.status(404).send({ error: "no patient found with given id" });
  }

  try {
    const { description, date, specialist, diagnosisCodes, type } = req.body;
    switch (type) {
      case "HealthCheck":
        const newHealthCheckEntryWithoutId = {
          date: date,
          type: type,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          description: description,
          healthCheckRating: req.body.healthCheckRating,
        };
        const newHealthCheckEntry = toNewEntry(newHealthCheckEntryWithoutId);

        if (!newHealthCheckEntry) {
          return res.status(409).send({ error: "missing parameters" });
        }

        const addedHealthCheckEntry = patientService.addEntry(returnedPatient, newHealthCheckEntry);
        res.json(addedHealthCheckEntry);
        break;

      case "Hospital":
        const newHospitalEntryWithoutId = {
          date: date,
          type: type,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          description: description,
          discharge: {
            date: req.body.discharge.date,
            criteria: req.body.discharge.criteria,
          },
        };

        const newHospitalEntry = toNewEntry(newHospitalEntryWithoutId);

        if (!newHospitalEntry) {
          return res.status(409).send({ error: "missing parameters" });
        }

        const addedHospitalEntry = patientService.addEntry(returnedPatient, newHospitalEntry);
        res.json(addedHospitalEntry);
        break;

      case "OccupationalHealthcare":
        if (req.body.sickLeave) {
          const newOccupationalHealthcareEntryWithoutId = {
            date: date,
            type: type,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            description: description,
            employerName: req.body.employerName,
            sickLeave: {
              startDate: req.body.sickLeave.startDate,
              endDate: req.body.sickLeave.endDate,
            },
          };
          const newOccupationalHealthcareEntry = toNewEntry(
            newOccupationalHealthcareEntryWithoutId
          );

          if (!newOccupationalHealthcareEntry) {
            return res.status(409).send({ error: "missing parameters" });
          }

          const addedOccupationalHealthcareEntry = patientService.addEntry(
            returnedPatient,
            newOccupationalHealthcareEntry
          );
          res.json(addedOccupationalHealthcareEntry);
        } else {
          const newOccupationalHealthcareEntryWithoutId = {
            date: date,
            type: type,
            specialist: specialist,
            diagnosisCodes: diagnosisCodes,
            description: description,
            employerName: req.body.employerName,
          };
          const newOccupationalHealthcareEntry = toNewEntry(
            newOccupationalHealthcareEntryWithoutId
          );

          if (!newOccupationalHealthcareEntry) {
            return res.status(409).send({ error: "missing parameters" });
          }

          const addedOccupationalHealthcareEntry = patientService.addEntry(
            returnedPatient,
            newOccupationalHealthcareEntry
          );
          res.json(addedOccupationalHealthcareEntry);
        }

        break;

      default:
        break;
    }
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
  return;
});

export default router;
