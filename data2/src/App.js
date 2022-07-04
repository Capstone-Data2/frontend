import './App.css';
import MainButton from './components/Buttons.js'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { fill } from './pages/matchesList/matchesSlice'
import Header from './components/Header.js'
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/theme.js'

function App() {
  const matches = useSelector((state) => state.matches.value)
  const dispatch = useDispatch()

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header/>
        <div className="App">
          <MainButton sx={{boxShadow: 2}} onClick={async () => dispatch(fill(await testAxios()))}>HI</MainButton>
          <span>{matches[0]["match_id"]}</span>
        </div>
      </ThemeProvider>
    </div>
  );
}

async function testAxios() {
  var response = []
  await axios.get(`http://127.0.0.1:8000/matches/`)
  .then(res => {
    response = res.data.matches
  })
  .catch(error => {
    console.log(error)
  })
  return(response)

}

export default App;
