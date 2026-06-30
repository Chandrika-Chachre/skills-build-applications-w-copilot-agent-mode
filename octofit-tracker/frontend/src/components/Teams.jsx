import { useEffect, useState } from 'react';
import { fetchResource } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchResource('teams')
      .then((items) => {
        if (isMounted) {
          setTeams(items);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Collaborate with your training groups.</p>
        </div>
        <span className="badge text-bg-info">API</span>
      </div>

      {error ? <div className="alert alert-warning">{error}</div> : null}

      {!error && teams.length === 0 ? (
        <div className="alert alert-info">No teams found yet.</div>
      ) : null}

      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {teams.map((team) => (
          <div className="col" key={team._id || team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{team.name}</h3>
                <p className="mb-2"><strong>Sport:</strong> {team.sport ?? '—'}</p>
                <p className="mb-2"><strong>Captain:</strong> {team.captain ?? '—'}</p>
                <p className="mb-0"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
