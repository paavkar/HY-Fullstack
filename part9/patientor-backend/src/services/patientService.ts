import patientData from "../../data/patients";
import { NoSSNPatient } from "../types";

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

export default { getPatients };
