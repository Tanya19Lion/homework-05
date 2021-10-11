import React from 'react';
import { Link } from 'react-router-dom';
import Table from './table';
import Bookmark from './bookmark';
import QualitiesList from './qualitiesList';
import PropTypes from 'prop-types';

const UserTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest}) => {
    
    const columns = {
        name: {path: 'name', name: 'Имя', component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>},
        qualities: {name: 'Качества',
                    component: (user) => <QualitiesList qualities={user.qualities}/>},
        professions: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {path: 'bookmark', 
                    name: 'Избранное', 
                    component: (user) => <Bookmark status={user.bookmark} onClick={() => onToggleBookMark(user._id)}/> 
                },
        deleted: {component: (user) =>  ( <button
                                onClick={() => onDelete(user._id)}
                                className="btn btn-danger"
                            >
                                delete
                            </button> )
                }  
    };

    return  (
        <Table 
            onSort={onSort}  
            selectedSort={selectedSort} 
            columns={columns} 
            data={users}
        >
            {/* <TableHeader { ...{onSort, selectedSort, columns} }/>
            <TableBody {...{data: users, columns}}/> */}
        </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;