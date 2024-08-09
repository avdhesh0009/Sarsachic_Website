import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdPass from '../../images/updpass.jpg';
import './updatepass.css';
import useAxiosPublic from '../../hooks/useAxios';
import Sidebar from './Sidebar';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const axios = useAxiosPublic();

  const updatePassword = async (ev) => {
    ev.preventDefault();
    if (oldPassword === newPassword) {
      setMessage('Your new password is the same as the previous one.');
      return;
    }
    try {
      const response = await axios.post('/users/update-password', {
        oldPassword,
        newPassword
      });
      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        {message && <div className="message">{message}</div>}
        <Sidebar />
      </div>
      <div className="profile-content">
        <h1 className="pheading">Update Password</h1>
        <div className="passboard">
          <img src={UpdPass} alt="Update Password" className="update-pass-img" />
          <form className="profileinfo" onSubmit={updatePassword}>
            <div className="form-group">
              <label htmlFor="oldpass">Old Password</label>
              <input
                type="password"
                name="oldpass"
                id="oldpass"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(ev) => setOldPassword(ev.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newpass">New Password*</label>
              <input
                type="password"
                name="newpass"
                id="newpass"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
            </div>
            <button className="upd" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
