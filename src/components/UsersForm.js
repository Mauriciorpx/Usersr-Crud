import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const UsersForm = ({
  setOpenForm,
  addUser,
  selectUser,
  updateUser,
  userEdit,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birthday, setBirthday] = useState(Date.now);
  const [title, setTitle] = useState('');
  const defaultValues = () => {
    setTitle('Create a new User');
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setBirthday('');
  };

  const showAlert = (title, text) => {
    swal({
      title,
      text,
      icon: 'success',
      buttons: {
        confirm: { text: 'Ok', className: 'ok-button' },
      },
    });
  };

  useEffect(() => {
    if (userEdit) {
      setTitle('Edit User');
      setEmail(userEdit.email);
      setPassword(userEdit.password);
      setFirstName(userEdit.first_name);
      setLastName(userEdit.last_name);
      setBirthday(userEdit.birthday);
    } else {
      defaultValues();
    }
  }, [userEdit]);

  const submit = e => {
    e.preventDefault();
    const user = {
      email,
      password,
      first_name,
      last_name,
      birthday,
    };
    if (userEdit) {
      user.id = userEdit.id;
      updateUser(user);
      setOpenForm(false);
      selectUser(null);
      showAlert(
        'Edit user',
        `The user ${user.first_name} ${user.last_name} has been edited`
      );
    } else {
      addUser(user);
      setOpenForm(false);
      selectUser(null);
      showAlert(
        'User Created',
        `The user ${user.first_name} ${user.last_name} has been created`
      );
    }
  };

  return (
    <div className="users-form">
      <div className="form-container">
        <div className="form-header">
          <h3>{title}</h3>
          <button
            className="close-Btn"
            onClick={() => {
              setOpenForm(false);
              selectUser(null);
            }}
          >
            X
          </button>
        </div>

        <form action="" onSubmit={submit}>
          <div className="input-container">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              onChange={e => setFirstName(e.target.value)}
              value={first_name}
            />
          </div>
          <div className="input-container">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              onChange={e => setLastName(e.target.value)}
              value={last_name}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="input-container">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              onChange={e => setBirthday(e.target.value)}
              value={birthday}
            />
          </div>
          <button className="form-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;
