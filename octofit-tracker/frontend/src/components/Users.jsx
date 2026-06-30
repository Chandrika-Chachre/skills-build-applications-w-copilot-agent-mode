import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../utils/api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/users/'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setUsers(normalizeCollectionResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load users.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="card">
      <h2>Users</h2>
      <p className="text-muted">Community members and profile details.</p>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.email} className="list-group-item">
            <strong>{user.name}</strong>
            <div className="small text-muted">{user.email}</div>
            <div className="small">Goal: {user.fitnessGoal || 'Not specified'}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
