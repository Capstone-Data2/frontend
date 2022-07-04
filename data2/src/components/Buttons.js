import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';



const MainButton = styled(Button)({
  minWidth: 120,
  background: "#FFA750",
  color: "white",
  transition: "background 0.3s, color 0.3s",
  borderRadius: 4,
  transitionTimingFunction: 'ease-in-out',
  ":hover": {
    backgroundColor: alpha("#FFFFE4", 0.6),
    color: "black",
    border: "solid",
    borderColor: "#FFA750",
    
  } 
}); 

export default MainButton