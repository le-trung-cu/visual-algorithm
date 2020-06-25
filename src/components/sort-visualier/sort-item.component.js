import React from 'react'

const SortItem = ({ name, children }) => {
    return (
        <div className="sort__item">
            {children}
            <h3 className="sort__name">{name}</h3>
        </div>
    )
}

export default SortItem
