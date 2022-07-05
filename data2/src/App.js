import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/theme.js'
import Header from './components/Header.js'
import ProfessionalMatches from './pages/matchesList/professionalMatches';
import PublicMatches from './pages/matchesList/publicMatches';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProfessionalMatches />} />
              <Route path="matches/professional" element={<ProfessionalMatches/>}/>
              <Route path="matches/public" element={<PublicMatches/>}/> 
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
              <Route
                path="matches"
                element={<Navigate to="/matches/professional" replace />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}

function Layout() {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
