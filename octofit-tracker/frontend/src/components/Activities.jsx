import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../utils/api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/activities/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setActivities(normalizeCollectionResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load activities.');
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="card">
      <h2>Activities</h2>
      <p className="text-muted">Recent workouts and activity logs.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.completedAt} className="list-group-item">
            <strong>{activity.type}</strong>
            <div className="small">{activity.userName}</div>
            <div className="small text-muted">
              {activity.distanceKm ? `${activity.distanceKm} km` : ''}{' '}
              {activity.durationMinutes ? `${activity.durationMinutes} min` : ''}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
