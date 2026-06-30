import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../utils/api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/teams/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setTeams(normalizeCollectionResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load teams.');
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="card">
      <h2>Teams</h2>
      <p className="text-muted">Group competitions and team rosters.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.name} className="list-group-item">
            <strong>{team.name}</strong>
            <div className="small">Sport: {team.sport || 'N/A'}</div>
            <div className="small text-muted">Captain: {team.captain || 'TBD'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
