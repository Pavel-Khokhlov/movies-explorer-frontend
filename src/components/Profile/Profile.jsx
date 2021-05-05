import React, { useContext } from 'react';
import { CurrentUserContext } from "../context/CurrentUserContext";

import './Profile.css';

const Profile = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <h2>`Привет ${currentUser}`</h2>
    </section>
  )
};

export default Profile;
