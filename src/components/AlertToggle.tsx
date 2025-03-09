import { Switch, Typography, Box } from "@mui/material";

export default function AlertToggle() {
  return (
    <Box className="set-alert">
      <Typography variant="h6">UI Designer in Egypt</Typography>
      <Switch defaultChecked />
    </Box>
  );
}
