import './App.css';
import UsersForm from './components/UsersForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UsersList from './components/UsersList';

function App() {
  //State for users
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  /* Modals States */
  const [openForm, setOpenForm] = useState(false);

  //Get the users info

  const getUsers = () => {
    axios
      .get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data));
  };

  const addUser = user => {
    axios
      .post('https://users-crud1.herokuapp.com/users/', user)
      .then(res => getUsers(res.data));
  };

  //Select and update user

  const selectUser = user => setUserEdit(user);

  const updateUser = userInfo => {
    axios
      .put(`https://users-crud1.herokuapp.com/users/${userInfo.id}/`, userInfo)
      .then(res => getUsers());
  };

  const deleteUser = id => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      {openForm && (
        <UsersForm
          addUser={addUser}
          setOpenForm={setOpenForm}
          updateUser={updateUser}
          selectUser={selectUser}
          userEdit={userEdit}
        />
      )}
      <div className="header-page">
        <h2>Users</h2>
        <button className="new-btn" onClick={() => setOpenForm(true)}>
          + Create a new user
        </button>
      </div>

      <UsersList
        users={users}
        selectUser={selectUser}
        setOpenForm={setOpenForm}
        deleteUser={deleteUser}
      />
    </div>
  );
}

export default App;
