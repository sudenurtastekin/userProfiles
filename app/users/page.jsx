"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {users.map(user => (
          <div key={user.id} className="card">
            <img  src={user.image} alt={`${user.firstName} ${user.lastName}`} className="image" />
            <p className='username'>@ {user.username}</p>
            <h2 className="name">{user.firstName} {user.lastName}</h2>
            <Link href={`/users/${user.id}`}>
              <button className="button">Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
