import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../utils/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/workouts/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setWorkouts(normalizeCollectionResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section className="card">
      <h2>Workouts</h2>
      <p className="text-muted">Suggested sessions tailored to your goals.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.name} className="list-group-item">
            <strong>{workout.name}</strong>
            <div className="small">{workout.category || 'General'}</div>
            <div className="small text-muted">{workout.description || 'A focused session for your fitness plan.'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
