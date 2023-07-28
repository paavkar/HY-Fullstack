import { Box, Typography, Divider } from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
  getDiagnoseName: (code: string) => string | null;
}

const DisplayHospitalEntry = ({ entry, getDiagnoseName }: Props) => {
  return (
    <div key={entry.id}>
      <Box mt={2} sx={{ p: 0.1, border: "1px solid grey", borderRadius: "16px" }}>
        <Divider sx={{ height: "10px", border: "none" }} />
        <Typography>
          {entry.date} {""}
          <LocalHospitalIcon />
        </Typography>

        <Typography>
          <i> {entry.description}</i>
        </Typography>
        <Typography>discharge: {entry.discharge.date} </Typography>
        <Typography>
          <i>criteria: {entry.discharge.criteria}</i>
        </Typography>
        <Typography>diagnose by {entry.specialist} </Typography>

        {entry.diagnosisCodes?.map((code) => {
          return (
            <div key={code}>
              <ul>
                {code} {getDiagnoseName(code)}{" "}
              </ul>
            </div>
          );
        })}
      </Box>
    </div>
  )
};

export default DisplayHospitalEntry;
