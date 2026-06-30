import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

const navItems = [
  { to: '/', label: 'Users', end: true },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6 mb-2">Octofit Tracker</h1>
        <p className="text-muted mb-3">
          Multi-tier fitness tracking dashboard powered by the Node.js API.
        </p>
        <div className="alert alert-secondary small mb-3">
          <strong>Configuration:</strong> define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces. Without it, the app falls back to the local API.
        </div>
        <nav className="nav nav-pills flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="text-muted small mt-3 mb-0">
          API base: {codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : '/api'}
        </p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
