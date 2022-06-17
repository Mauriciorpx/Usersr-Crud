import React from 'react';
import swal from 'sweetalert';

const UsersList = ({ users, selectUser, setOpenForm, deleteUser }) => {
  return (
    <div>
      <ul className="users-list-container">
        {users.map(user => (
          <li key={user.id}>
            <ul className="user-render">
              <li>
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
              </li>
              <li>
                <h4>{user.email}</h4>
              </li>
              <li>
                <i className="fa-solid fa-gift"></i>
                {user.birthday}
              </li>
            </ul>
            <button
              className="delete-btn"
              onClick={() =>
                swal({
                  title: 'Delete User',
                  text: `desea eliminar el usuario? ${user.first_name} ${user.last_name}`,
                  icon: 'warning',
                  buttons: ['No', 'Yes'],
                }).then(res => {
                  if (res) {
                    deleteUser(user.id);
                    swal({
                      text: `The user ${user.first_name} ${user.last_name} has been deleted`,
                      icon: 'success',
                    });
                  }
                })
              }
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <button
              className="edit-btn"
              onClick={() => {
                selectUser(user);
                setOpenForm(true);
              }}
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
