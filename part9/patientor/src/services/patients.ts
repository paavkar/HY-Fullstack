import axios from "axios";
import { Patient, PatientFormValues, HealthCheckEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const addEntry = async (id: string, object: HealthCheckEntry) => {
  const { data } = await axios.post<HealthCheckEntry>(
    `http://localhost:3001/api/patients/${id}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  addEntry,
};
