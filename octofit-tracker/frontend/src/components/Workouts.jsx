import { useEffect, useState } from 'react';
import { fetchResource } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchResource('workouts')
      .then((items) => {
        if (isMounted) {
          setWorkouts(items);
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
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Suggested routines and training ideas.</p>
        </div>
        <span className="badge text-bg-warning">API</span>
      </div>

      {error ? <div className="alert alert-warning">{error}</div> : null}

      {!error && workouts.length === 0 ? (
        <div className="alert alert-info">No workouts available yet.</div>
      ) : null}

      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {workouts.map((workout) => (
          <div className="col" key={workout._id || workout.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{workout.name}</h3>
                <p className="mb-2"><strong>Category:</strong> {workout.category ?? '—'}</p>
                <p className="mb-2"><strong>Duration:</strong> {workout.durationMinutes ?? '—'} min</p>
                <p className="mb-2"><strong>Difficulty:</strong> {workout.difficulty ?? '—'}</p>
                <p className="mb-0"><strong>Focus:</strong> {workout.focusArea ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
