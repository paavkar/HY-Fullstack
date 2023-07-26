import patientData from "../../data/patients";
import { NoSSNPatient, NewPatient, PatientEntry } from "../types";

import { v1 as uuid } from 'uuid';

const getPatients = (): NoSSNPatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (entry: NewPatient): PatientEntry => {
  const NewPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientData.push(NewPatientEntry);
  return NewPatientEntry;
};

const getPatient = (id: string): PatientEntry | undefined => {
  const returnedPatient = patientData.find(patient => patient.id === id)
  return returnedPatient
}

export default { getPatients, addPatient, getPatient };
