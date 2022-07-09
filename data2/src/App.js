import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/theme.js";
import Header from "./components/Header.js";
import MatchesList from "./pages/matchesList/matchesList";
import MatchOverview from "./pages/matchOverview/matchOverview";

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="matches/professional"
                element={<MatchesList />}
              />
              <Route path="matches/public" element={<MatchesList />} />
              <Route path="matches/:id/overview" element={<MatchOverview />} />
              <Route
                path="/"
                element={<Navigate to="/matches/professional" replace />}
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
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;