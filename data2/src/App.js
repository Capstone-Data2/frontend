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
import Header from "./components/common/Header.js";
import MatchesList from "./pages/matchesList/matchesList";
import MatchOverview from "./pages/matchOverview/matchOverview";
import MatchLog from './pages/matchLog/matchLog';
import MatchCombat from './pages/matchCombat/matchCombat.js';
import MatchPerformance from "./pages/matchPerformance/matchPerformance";
import MatchVision from './pages/matchVision/matchVision';
import MatchRivals from "./pages/matchRivals/matchRivals";
import MatchGraphs from "./pages/matchGraphs/matchGraphs";
import Search from "./pages/search/search";
import Profile from "./pages/profile/profile";
import Meta from "./pages/meta/meta";
import TeamBuilder from "./pages/teamBuilder/teamBuilder";


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
              <Route path="matches/:id/performance" element={<MatchPerformance />} />
              <Route path="matches/:id/rivals" element={<MatchRivals />} />
              <Route path="matches/:id/combat" element={<MatchCombat />} />
              <Route path="matches/:id/graphs" element={<MatchGraphs />} />
              <Route path="matches/:id/vision" element={<MatchVision />} />
              <Route path="matches/:id/log" element={<MatchLog />} />
              <Route path="search/:query/" element={<Search />} />
              <Route path="profile/:id" element={<Profile />}/>
              <Route path="meta/professional" element={<Meta />}/>
              <Route path="meta/public" element={<Meta />}/>
              <Route path="teambuilder" element={<TeamBuilder />}/>

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
