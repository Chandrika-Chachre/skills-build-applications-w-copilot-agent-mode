import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../utils/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/leaderboard/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setEntries(normalizeCollectionResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section className="card">
      <h2>Leaderboard</h2>
      <p className="text-muted">Top performers and current streaks.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry._id || entry.name} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{entry.name}</strong>
              <div className="small text-muted">Streak: {entry.streakDays ?? 0} days</div>
            </span>
            <span className="badge bg-primary rounded-pill">{entry.totalScore ?? 0}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
