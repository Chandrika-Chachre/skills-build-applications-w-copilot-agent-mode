import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const leaderboardApiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
    : '/api/leaderboard';

  useEffect(() => {
    let isMounted = true;

    fetch(leaderboardApiUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload?.items || payload?.results || [];

        if (isMounted) {
          setEntries(items);
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
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Your competitive standings at a glance.</p>
        </div>
        <span className="badge text-bg-success">API</span>
      </div>

      {error ? <div className="alert alert-warning">{error}</div> : null}

      {!error && entries.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries available yet.</div>
      ) : null}

      <div className="list-group">
        {entries.map((entry, index) => (
          <div className="list-group-item d-flex justify-content-between align-items-start" key={entry._id || `${entry.name}-${index}`}>
            <div>
              <h3 className="h6 mb-1">#{index + 1} {entry.name}</h3>
              <p className="mb-0 text-muted">Score: {entry.totalScore ?? '—'} • Streak: {entry.streakDays ?? '—'} days</p>
            </div>
            <span className="badge text-bg-dark">{entry.totalScore ?? 0}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
