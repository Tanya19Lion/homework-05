import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import api from '../api';
import GroupList from '../components/groupList';
import SearchStatus from "../components/searchStatus";
import UserTable from '../components/userTable';
import _ from 'lodash';

const UsersList = () => {
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({path: 'rate', order: 'asc', class: 'bi bi-caret-down-fill'});
    const pageSize = 7;

    useEffect(() => {
        api.users.fetchAll()
            .then((data) => setUsers(data)) 
    }, []);
  
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    
    const handleToggleBookMark = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
        console.log(id);
    };

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

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };    

    if (users) {
        const filteredUsers = selectedProf 
            ? users.filter( (user) => _.isEqual(user.profession, selectedProf)) 
            : users;

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

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
                    {count > 0 && <UserTable 
                                        users={usersCrop} 
                                        onSort={handleSort} 
                                        selectedSort={sortBy} 
                                        onToggleBookMark={handleToggleBookMark}
                                        onDelete={handleDelete}
                                />}
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
        );}
    return 'loading...';
};

UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;