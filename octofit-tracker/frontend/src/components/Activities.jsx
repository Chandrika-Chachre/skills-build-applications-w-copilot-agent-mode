import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const activitiesApiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : '/api/activities';

  useEffect(() => {
    let isMounted = true;

    fetch(activitiesApiUrl)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to load activities');
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : payload?.items || payload?.results || [];

        if (isMounted) {
          setActivities(items);
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
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent movement and training entries.</p>
        </div>
        <span className="badge text-bg-primary">API</span>
      </div>

      {error ? <div className="alert alert-warning">{error}</div> : null}

      {!error && activities.length === 0 ? (
        <div className="alert alert-info">No activities found yet.</div>
      ) : null}

      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {activities.map((activity) => (
          <div className="col" key={activity._id || `${activity.userName}-${activity.type}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{activity.type}</h3>
                <p className="mb-2"><strong>User:</strong> {activity.userName}</p>
                <p className="mb-2"><strong>Distance:</strong> {activity.distanceKm ?? '—'} km</p>
                <p className="mb-2"><strong>Duration:</strong> {activity.durationMinutes ?? '—'} min</p>
                <p className="mb-0"><strong>Calories:</strong> {activity.caloriesBurned ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
