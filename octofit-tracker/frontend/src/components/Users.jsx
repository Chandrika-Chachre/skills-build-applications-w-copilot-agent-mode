import { useEffect, useState } from 'react';
import { fetchResource } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchResource('users')
      .then((items) => {
        if (isMounted) {
          setUsers(items);
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
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Browse the community members from the backend API.</p>
        </div>
        <span className="badge text-bg-primary">API</span>
      </div>

      {error ? <div className="alert alert-warning">{error}</div> : null}

      {!error && users.length === 0 ? (
        <div className="alert alert-info">No users found yet.</div>
      ) : null}

      <div className="row row-cols-1 row-cols-lg-2 g-3">
        {users.map((user) => (
          <div className="col" key={user._id || user.email}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5">{user.name}</h3>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Age:</strong> {user.age ?? '—'}</p>
                <p className="mb-2"><strong>Goal:</strong> {user.fitnessGoal ?? '—'}</p>
                <p className="mb-0"><strong>City:</strong> {user.city ?? '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
