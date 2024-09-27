"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfile({ params }) {
  const { id } = params;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const userResponse = await fetch(`https://dummyjson.com/users/${id}`);
          const userData = await userResponse.json();
          setUser(userData);

          const todosResponse = await fetch(`https://dummyjson.com/users/${id}/todos`);
          const todosData = await todosResponse.json();
          setTodos(todosData.todos);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };

      fetchUserData();
    }
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="containerDetails">
      <div className="sidebar">
        <button onClick={() => router.back()} className="button backBtn">
          Geri
        </button>
        <h2>{user.firstName}&apos; s Todo List</h2>

        {todos.length === 0 ? (
          <p>You haven&apos;t created any todos. Create one!</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                {todo.todo}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="profile">

        <h1 className='detailProfile'> <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="detailProfileImg" />{user.firstName} {user.lastName}'s Profile   </h1>
        <span className='usernameDetails'> <strong>@{user.username}</strong></span>


        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="profile-item">
            <span><strong>Email:</strong></span>
            <span>{user.email}</span>
          </div>
          <div className="profile-item">
            <span><strong>Phone:</strong></span>
            <span>{user.phone}</span>
          </div>
          <div className="profile-item">
            <span><strong>Birth Date:</strong></span>
            <span>{user.birthDate}</span>
          </div>
          <div className="profile-item">
            <span><strong>Age:</strong></span>
            <span>{user.age}</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Address</h2>
          <div className="profile-item">
            <span><strong>Address:</strong></span>
            <span>{user.address.address}</span>
          </div>
          <div className="profile-item">
            <span><strong>City:</strong></span>
            <span>{user.address.city}</span>
          </div>
          <div className="profile-item">
            <span><strong>State:</strong></span>
            <span>{user.address.state}</span>
          </div>
          <div className="profile-item">
            <span><strong>Country:</strong></span>
            <span>{user.address.country}</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>Education</h2>
          <div className="profile-item">
            <span><strong>University:</strong></span>
            <span>{user.university}</span>
          </div>
        </div>

        {user.company && (
          <div className="profile-section">
            <h2>Company</h2>
            <div className="profile-item">
              <span><strong>Company Name:</strong></span>
              <span>{user.company.name}</span>
            </div>
            <div className="profile-item">
              <span><strong>Title:</strong></span>
              <span>{user.company.title}</span>
            </div>
            <div className="profile-item">
              <span><strong>Department:</strong></span>
              <span>{user.company.department}</span>
            </div>
            <div className="profile-item">
              <span><strong>Company Address:</strong></span>
              <span>{user.company.address.address}</span>
            </div>
          </div>
        )}
      </div>



    </div>
  );
}
