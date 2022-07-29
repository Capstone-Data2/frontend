import { Button } from "@mui/material";

export function MatchButton({ type, click, text, id }) {
  return (
    <Button
      variant="main"
      color={type}
      sx={{ boxShadow: 2 }}
      onClick={click}
      id={id}
    >
      {text}
    </Button>
  );
}
