import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { ReactComponent as SteamIcon} from '../steam.svg'

const Bar = styled(Toolbar)(({theme}) => ({
    backgroundColor: theme.palette.primary.dark
}))

const TitleButton = styled(Button)(({theme}) => ({  
    fontFamily: "Roboto Slab", 
    fontSize: 52, 
    fontWeight: "bold", 
    padding: 8,
    marginRight: 100,
    marginLeft: 12,
    color: "white",
    backgroundColor: "transparent",
    border: 0,
    '&:hover': {
        color: alpha(theme.palette.common.white, 0.6),
    },
}))

const Wrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  transition: theme.transitions.create(['background-color']),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  color: alpha(theme.palette.common.white, 0.6),
  width: '100%',
  marginRight: 15,
  [theme.breakpoints.up('sm')]: {
    marginLeft: "auto",
    width: 'auto',
  },

}));

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    color: "white",
  },
}));

const HeadButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    textTransform: "uppercase",
    fontSize: 20,
    marginRight: 20,
    '&:hover': {
        color: alpha(theme.palette.common.white, 0.6),
    },
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: 400,
    paddingRight: 40,
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
}));

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Bar>
            <TitleButton
                disableRipple
            >
                Data 2
            </TitleButton>
            <HeadButton>Matches</HeadButton>
            <HeadButton>Meta</HeadButton>
            <HeadButton>Team Builder</HeadButton>
            <Box sx={{display: "flex", marginLeft: "auto"}}>
                <Wrapper>
                    <IconWrapper>
                        <SearchIcon />
                    </IconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Wrapper>
                <Wrapper sx={{backgroundColor: "transparent",}}>
                    <IconWrapper sx={{paddingLeft: 1}}>
                        <SteamIcon height="16" fill="white"/>
                    </IconWrapper>
                    <LoginButton>Login</LoginButton>
                </Wrapper>
            </Box>
        </Bar>
      </AppBar>
    </Box>
  );
}
