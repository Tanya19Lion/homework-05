import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({onSort, selectedSort, columns}) => {
   
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort( {...selectedSort, 
                    order: selectedSort.order === 'asc' ? 'desc' : 'asc', 
                    class: selectedSort.class === 'bi bi-caret-down-fill' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill' });
        } else {
            onSort({path: item, order: 'asc', class: 'bi bi-caret-down-fill'});
        }
    }; 
        return (
        <thead>
            <tr>
                {Object.keys(columns).map( (column) => {
                   return <th className={columns[column].path === selectedSort.path ? selectedSort.class : undefined}
                            key={column} 
                            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                            scope="col"
                            {...{role: columns[column].path && 'button'}}
                          >
                            {columns[column].name}
                        </th>
                })}
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}

export default TableHeader;