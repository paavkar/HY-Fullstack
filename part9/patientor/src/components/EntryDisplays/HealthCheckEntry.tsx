import { Box, Typography, Divider } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import { HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry;
  getDiagnoseName: (code: string) => string | null;
}

const DisplayHealthCheckEntry = ({ entry, getDiagnoseName }: Props) => {
  return (
    <div key={entry.id}>
      <Box mt={2} sx={{ p: 0.1, border: "1px solid grey", borderRadius: "16px" }}>
        <Divider sx={{ height: "10px", border: "none" }} />
        <Typography>
          {entry.date} {""}
          <MedicalServicesIcon />
        </Typography>
        <Typography>
          <i> {entry.description}</i>
        </Typography>
        {((): JSX.Element => {
          if (entry.healthCheckRating === 0) {
            return (
              <div>
                <FavoriteIcon style={{ color: "green" }} />
              </div>
            );
          }

          if (entry.healthCheckRating === 1) {
            return (
              <div>
                <FavoriteIcon style={{ color: "yellow" }} />
              </div>
            );
          }

          if (entry.healthCheckRating === 2) {
            return (
              <div>
                <FavoriteIcon style={{ color: "orange" }} />
              </div>
            );
          } else {
            return (
              <div>
                <FavoriteIcon style={{ color: "red" }} />
              </div>
            );
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

export default DisplayHealthCheckEntry;
