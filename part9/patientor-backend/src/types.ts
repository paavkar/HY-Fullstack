export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NoSSNPatient = Omit<PatientEntry, "ssn">;

export type NewPatient = Omit<PatientEntry, "id">;

//export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
