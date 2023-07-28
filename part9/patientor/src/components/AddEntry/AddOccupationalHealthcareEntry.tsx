import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  AlertTitle,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useState } from "react";

import { Formik, Form } from "formik";

import axios from "axios";
import { Diagnosis, OccupationalHealthcareEntryWithoutId, Patient } from "../../types";

import patientService from "../../services/patients";

interface Props {
  id: string;
  setAddOccupationalHealthcareEntryVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
  patient: Patient;
  diagnoses: Array<Diagnosis>;
}

const AddOccupationalHealthcareEntry = ({
  id,
  setAddOccupationalHealthcareEntryVisibility,
  setPatient,
  patient,
  diagnoses,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [diagnoseCode, setDiagnoseCode] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const initialValuesOccupationalHealthcare: OccupationalHealthcareEntryWithoutId = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
    type: "OccupationalHealthcare",
  };

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnoseCode>) => {
    const {
      target: { value },
    } = event;
    setDiagnoseCode(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (
    values: OccupationalHealthcareEntryWithoutId,
    props: { resetForm: () => void }
  ) => {
    let newEntry = null;
    if (startDate || endDate) {
      newEntry = {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: diagnoseCode,
        employerName: values.employerName,
        sickLeave: {
          startDate: startDate,
          endDate: endDate,
        },
        type: values.type,
      };
    } else {
      newEntry = {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: diagnoseCode,
        employerName: values.employerName,
        type: values.type,
      };
    }

    try {
      const entry = await patientService.addEntry(id, newEntry);
      patient.entries.concat(entry);
      setPatient(patient);
      setDiagnoseCode([]);
      setStartDate("");
      setEndDate("");
      props.resetForm();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace("Something went wrong. Error: ", "");
          console.error(message);
          notify(message);
        } else {
          notify("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        notify("Unknown error");
      }
    }
  };

  return (
    <div>
      {errorMessage ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      ) : (
        <div></div>
      )}

      <Formik initialValues={initialValuesOccupationalHealthcare} onSubmit={handleSubmit}>
        {(props) => {
          return (
            <Form>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                border="dashed black 1.5px"
                gap="30px"
              >
                <Typography marginTop={2} marginLeft={1} variant="h6">
                  New OccupationalHealthcare Entry
                </Typography>

                <Box marginLeft={1}>
                  <InputLabel id="date">Entry Date</InputLabel>
                  <TextField
                    type="date"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.date}
                    name="date"
                    error={Boolean(props.touched.date) && Boolean(props.errors.date)}
                  />
                </Box>

                <Box marginLeft={1}>
                  <TextField
                    label="Specialist"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.specialist}
                    name="specialist"
                    error={Boolean(props.touched.specialist) && Boolean(props.errors.specialist)}
                  />
                </Box>

                <Box marginLeft={1}>
                  <TextField
                    label="Description"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.description}
                    name="description"
                    error={Boolean(props.touched.description) && Boolean(props.errors.description)}
                  />
                </Box>

                <Box marginLeft={1}>
                  <InputLabel id="diagnosisCodes">Diagnosis codes</InputLabel>
                  <Select
                    labelId="diagnosisCodes"
                    onChange={handleChange}
                    value={diagnoseCode}
                    id="diagnosisCodes"
                    multiple
                    error={
                      Boolean(props.touched.diagnosisCodes) && Boolean(props.errors.diagnosisCodes)
                    }
                  >
                    {diagnoses.map((code) => (
                      <MenuItem key={code.code} value={code.code}>
                        {code.code}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box marginLeft={1}>
                  <TextField
                    label="Employer"
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    value={props.values.employerName}
                    name="employerName"
                    error={
                      Boolean(props.touched.employerName) && Boolean(props.errors.employerName)
                    }
                  />
                </Box>

                <Box marginLeft={1}>
                  <InputLabel id="sickLeave.startDate">Sick leave start date</InputLabel>
                  <TextField
                    type="date"
                    onBlur={props.handleBlur}
                    onChange={(event) => setStartDate(event.target.value)}
                    value={startDate}
                    name="sickLeave.startDate"
                  />

                  <InputLabel id="sickLeave.endDate">Sick leave end date</InputLabel>
                  <TextField
                    type="date"
                    onBlur={props.handleBlur}
                    onChange={(event) => setEndDate(event.target.value)}
                    value={endDate}
                    name="sickLeave.endDate"
                  />
                </Box>

                <Box textAlign="right">
                  <Button
                    onClick={() => setAddOccupationalHealthcareEntryVisibility(false)}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" color="primary">
                    Add
                  </Button>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddOccupationalHealthcareEntry;
