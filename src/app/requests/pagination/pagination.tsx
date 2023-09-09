import React from 'react';
import style from './pagination.module.scss';

const Pagination = ({totalCount, perPage, paginate}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCount / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={style.main}>
            <ul className={style.ul} style={{gridTemplateColumns: `repeat(${pageNumbers.length}, 1fr)`}}>
                {
                    pageNumbers.map(number => (
                        <a href="!#" onClick={(e) => {e.preventDefault(); paginate(number)}} className={style.a}>
                            <li key={number} className={style.li}>
                                {number}
                            </li>
                        </a>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;