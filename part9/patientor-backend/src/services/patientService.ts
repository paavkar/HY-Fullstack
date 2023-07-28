import patientData from "../../data/patients";
import { NoSSNPatient, NewPatient, PatientEntry, Entry, EntryWithoutId } from "../types";

import { v1 as uuid } from "uuid";

const getPatients = (): NoSSNPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientData.push(NewPatientEntry);
  return NewPatientEntry;
};

const getPatient = (id: string): PatientEntry | undefined => {
  const returnedPatient = patientData.find((patient) => patient.id === id);
  return returnedPatient;
};

const addEntry = (patient: PatientEntry, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, addPatient, getPatient, addEntry };
