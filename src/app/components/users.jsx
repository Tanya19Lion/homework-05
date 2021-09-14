import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from '../api';
import GroupList from './groupList';
import SearchStatus from "./searchStatus";
import _ from 'lodash';

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 3;

    useEffect(() => {
        api.professions.fetchAll()
            .then( (data) => setProfessions(data)) 
    }, []);

    useEffect( () => {
        setCurrentPage(1);
    }, [selectedProf]);
    
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };    

    const filteredUsers = selectedProf 
        ? allUsers.filter( (user) => _.isEqual(user.profession, selectedProf)) 
        : allUsers;

    const count = filteredUsers.length;

    const usersCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex"> 
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">              
                    <GroupList 
                        items={professions} 
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button 
                        className="btn btn-secondary mt-2" 
                        onClick={clearFilter}
                    >
                        Очистить фильтр
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">  
                <SearchStatus length={count} />          
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User {...rest} {...user} key={user._id} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">    
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
