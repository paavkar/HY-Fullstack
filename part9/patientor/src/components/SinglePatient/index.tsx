import { Box, Typography, Divider, Button } from "@mui/material";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { useState, useEffect } from "react";
import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useParams } from "react-router-dom";

import AddHealthCheckEntry from "../AddEntry/AddHealthCheckEntry";
import AddHospitalEntry from "../AddEntry/AddHospitalEntry";
import AddOccupationalHealthcareEntry from "../AddEntry/AddOccupationalHealthcareEntry";
import DisplayHealthCheckEntry from "../EntryDisplays/HealthCheckEntry";
import DisplayHospitalEntry from "../EntryDisplays/HospitalEntry";
import DisplayOccupationalHealthcareEntry from "../EntryDisplays/OccupationalHealthcareEntry";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [addHealthCheckEntryVisibility, setAddHealthCheckEntryVisibility] = useState(false);
  const [addHospitalEntryVisibility, setAddHospitalEntryVisibility] = useState(false);
  const [addOccupationalHealthcareEntryVisibility, setAddOccupationalHealthcareEntryVisibility] =
    useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    //void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      const data = await patientService.getPatient(String(id));
      setPatient(data);
    };
    void fetchPatient();

    const fethDiagnoses = async () => {
      const data = await diagnoseService.getAll();
      setDiagnoses(data);
    };
    void fethDiagnoses();
  }, [id, patient]);

  const getDiagnoseName = (code: string): string | null => {
    const diagnosis = diagnoses.find((diagnoseCode) => diagnoseCode.code === code);
    if (!diagnosis) {
      return null;
    }
    return diagnosis.name;
  };

  if (patient) {
    return (
      <div className="App">
        <Box>
          <Divider sx={{ height: "15px", border: "none" }} />
          <div>
            <Typography variant="h6">
              {patient.name}
              {patient.gender === "male" ? (
                <MaleIcon />
              ) : patient.gender === "female" ? (
                <FemaleIcon />
              ) : (
                <TransgenderIcon />
              )}
            </Typography>
          </div>
          <Divider sx={{ height: "10px", border: "none" }} />
          <div>
            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
          </div>

          <Divider sx={{ height: "10px", border: "none" }} />

          {/** Add Healthcheck entry */}
          {addHealthCheckEntryVisibility ? (
            <div>
              <AddHealthCheckEntry
                id={id}
                setAddHealthCheckEntryVisibility={setAddHealthCheckEntryVisibility}
                setPatient={setPatient}
                patient={patient}
                diagnoses={diagnoses}
              />
            </div>
          ) : !addHospitalEntryVisibility && !addOccupationalHealthcareEntryVisibility ? (
            <Button
              variant="contained"
              onClick={() => {
                setAddHealthCheckEntryVisibility(true);
              }}
            >
              Add HealthCheck entry
            </Button>
          ) : (
            <div></div>
          )}

          {/** Add Hospital entry */}
          {addHospitalEntryVisibility ? (
            <div>
              <AddHospitalEntry
                id={id}
                setAddHospitalEntryVisibility={setAddHospitalEntryVisibility}
                setPatient={setPatient}
                patient={patient}
                diagnoses={diagnoses}
              />
            </div>
          ) : !addHealthCheckEntryVisibility && !addOccupationalHealthcareEntryVisibility ? (
            <Button
              variant="contained"
              onClick={() => {
                setAddHospitalEntryVisibility(true);
              }}
            >
              Add Hospital entry
            </Button>
          ) : (
            <div></div>
          )}

          {/** Add Occupational Healthcare entry */}
          {addOccupationalHealthcareEntryVisibility ? (
            <div>
              <AddOccupationalHealthcareEntry
                id={id}
                setAddOccupationalHealthcareEntryVisibility={
                  setAddOccupationalHealthcareEntryVisibility
                }
                setPatient={setPatient}
                patient={patient}
                diagnoses={diagnoses}
              />
            </div>
          ) : !addHealthCheckEntryVisibility && !addHospitalEntryVisibility ? (
            <Button
              variant="contained"
              onClick={() => {
                setAddOccupationalHealthcareEntryVisibility(true);
              }}
            >
              Add OccupationalHealthcare entry
            </Button>
          ) : (
            <div></div>
          )}

          <Divider sx={{ height: "10px", border: "none" }} />
          <div>
            <Typography variant="h6">entries</Typography>
          </div>
          {patient.entries.length > 0 ? (
            patient.entries.map((entry) => {
              switch (entry.type) {
                case "HealthCheck":
                  return (
                    <DisplayHealthCheckEntry entry={entry} getDiagnoseName={getDiagnoseName} />
                  );
                case "Hospital":
                  return <DisplayHospitalEntry entry={entry} getDiagnoseName={getDiagnoseName} />;
                case "OccupationalHealthcare":
                  return (
                    <DisplayOccupationalHealthcareEntry
                      entry={entry}
                      getDiagnoseName={getDiagnoseName}
                    />
                  );

                default:
                  break;
              }
            })
          ) : (
            <div>
              <Typography>No entries</Typography>
            </div>
          )}
        </Box>
      </div>
    );
  }
};

export default SinglePatient;
