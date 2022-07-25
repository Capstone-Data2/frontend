import { Button } from "@mui/material";

export function MatchButton({ type, click, text }) {
  return (
    <Button
      variant="main"
      color={type}
      sx={{ boxShadow: 2 }}
      onClick={click}
    >
      {text}
    </Button>
  );
}
