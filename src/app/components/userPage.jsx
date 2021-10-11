import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';

import QualitiesList from '../components/qualitiesList';

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    const handleClick = () => {
        history.push('/users');
    };

    if (user) {
         return (
            <div>
                <h1>Name: {user.name}</h1>
                <h2>Profession: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>CompletedMettings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}> All users</button>
            </div>           
        );
    } else {
        return 'loading...';
    }    
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserPage;