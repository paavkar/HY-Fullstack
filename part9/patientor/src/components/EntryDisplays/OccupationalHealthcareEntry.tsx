import { Box, Typography, Divider } from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";

import { OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
  getDiagnoseName: (code: string) => string | null;
}

const DisplayOccupationalHealthcareEntry = ({ entry, getDiagnoseName }: Props) => {
  return (
    <div key={entry.id}>
      <Box mt={2} sx={{ p: 0.1, border: "1px solid grey", borderRadius: "16px" }}>
        <Divider sx={{ height: "10px", border: "none" }} />
        <Typography>
          {entry.date} {""}
          <WorkIcon /> {entry.employerName}
        </Typography>
        <Typography>
          <i> {entry.description}</i>
        </Typography>

        {((): JSX.Element => {
          if (entry.sickLeave != null) {
            return (
              <Typography>
                sick leave from {entry.sickLeave?.startDate} {}
                to {entry.sickLeave?.endDate}
              </Typography>
            );
          } else {
            return <div></div>;
          }
        })()}

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
  );
};

export default DisplayOccupationalHealthcareEntry;
