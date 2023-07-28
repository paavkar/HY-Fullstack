import { Diagnosis, Entry, EntryWithoutId, Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }

  return date;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries || !Array.isArray(entries) || !parseDiagnosisCodes(entries)) {
    return [] as Array<Entry>;
  }

  return entries as Array<Entry>;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const isNumber = (num: unknown): num is number => {
  return !isNaN(Number(num));
};

const isHealthCheckRating = (num: number) => {
  return num >= 0 && num <= 3;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (
    (!healthCheckRating && healthCheckRating != 0) ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(`Incorrect or missing healthcheck rating: ${healthCheckRating}`);
  }

  return healthCheckRating;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

type Discharge = {
  date: string;
  criteria: string;
};

const parseDischargeDate = (entryDate: string, discharge: Discharge): string => {
  if (!discharge || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error("Incorrect or missing discharge");
  }

  if (Date.parse(discharge.date) < Date.parse(entryDate)) {
    throw new Error("The discharge date cannot be before the entry's date");
  }

  return discharge.date;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }

  return employerName;
};

const parseHealthCheck = (type: unknown): "HealthCheck" => {
  if (!type || !isString(type) || type !== "HealthCheck") {
    throw new Error("Incorrect or missing type: HealthCheck");
  }

  return type;
};

const parseHospital = (type: unknown): "Hospital" => {
  if (!type || !isString(type) || type !== "Hospital") {
    throw new Error("Incorrect or missing check type: Hospital");
  }

  return type;
};

const parseOccupationalHealthcare = (type: unknown): "OccupationalHealthcare" => {
  if (!type || !isString(type) || type !== "OccupationalHealthcare") {
    throw new Error("Incorrect or missing type: occupational healthcare");
  }

  return type;
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

/*
const isSickLeave = (param: SickLeave): param is SickLeave => {
  if (!param.startDate || !param.endDate || !param.startDate || !isString(param.startDate) || 
  !isDate(param.startDate) || !param.endDate || !isString(param.endDate) || 
  !isDate(param.endDate)) {
    return false
  }

  return true
}*/

const parseSickLeaveStart = (entryDate: string, sickLeave: SickLeave): string => {
  if (!sickLeave.startDate || !isDate(sickLeave.startDate)) {
    throw new Error("Incorrect or missing sick leave start date");
  }

  if (Date.parse(sickLeave.startDate) < Date.parse(entryDate)) {
    throw new Error("The sick leave start date cannot be before the entry's date");
  }

  return sickLeave.startDate;
};

const parseSickLeaveEnd = (sickLeave: SickLeave): string => {
  if (!sickLeave.endDate || !isDate(sickLeave.endDate)) {
    throw new Error("Incorrect or missing sick leave end date");
  }

  if (Date.parse(sickLeave.endDate) < Date.parse(sickLeave.startDate)) {
    throw new Error("The sick leave end date cannot be before the sick leave's start date");
  }

  return sickLeave.endDate;
};

const parseCriteria = (discharge: Discharge): string => {
  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }

  return discharge.criteria;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId | undefined => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            type: parseHealthCheck(object.type),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newEntry;
        }
        break;
      case "Hospital":
        if ("discharge" in object) {
          const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            type: parseHospital(object.type),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            discharge: {
              date: parseDischargeDate(String(object.date), object.discharge as Discharge),
              criteria: parseCriteria(object.discharge as Discharge),
            },
          };
          return newEntry;
        }
        break;
      case "OccupationalHealthcare":
        if ("sickLeave" in object && "employerName" in object) {
          const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            type: parseOccupationalHealthcare(object.type),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            employerName: parseEmployerName(object.employerName),
            sickLeave: {
              startDate: parseSickLeaveStart(String(object.date), object.sickLeave as SickLeave),
              endDate: parseSickLeaveEnd(object.sickLeave as SickLeave),
            },
          };
          return newEntry;
        } else if ("employerName" in object) {
          const newEntry: EntryWithoutId = {
            date: parseDate(object.date),
            type: parseOccupationalHealthcare(object.type),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            description: parseDescription(object.description),
            employerName: parseEmployerName(object.employerName),
          };
          return newEntry;
        }
        break;
      default:
        return undefined;
        break;
    }
  }
  return undefined;
};
