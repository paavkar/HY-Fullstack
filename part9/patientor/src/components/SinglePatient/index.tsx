import { Box, Typography, Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useState, useEffect } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    //void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      const data = await patientService.getPatient(String(id));
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  if (patient) {
    return (
      <div className="App">
        <Box>
          <Divider sx={{ height: "15px" }} />
          <div>
            <Typography variant="h6">
              {patient.name}
              {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
            </Typography>
          </div>
          <Divider sx={{ height: "10px" }} />
          <div>
            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
          </div>
        </Box>
      </div>
    );
  }
};

export default SinglePatient;
