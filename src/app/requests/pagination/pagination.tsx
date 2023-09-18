import React, {useState} from 'react';
import style from './pagination.module.scss';

const PointPagination = ({number, paginate}) => {
    return(
        <>
            <a href="!#" onClick={(e) => {e.preventDefault(); paginate(number)}} className={style.a}>
                <li key={number} className={style.li}>
                    {number}
                </li>
            </a>
        </>
    );
};

const CenterPagination = () => {
    return(
        <li className={style.li}>
            ...
        </li>
    );
};

const Pagination = ({totalCount, perPage, paginate, nextPage, prevPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCount / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={style.main}>
            <ul className={style.ul} style={{gridTemplateColumns: `repeat(${8}, 1fr)`}}>
                <li className={style.li} onClick={prevPage} style={{cursor: "pointer"}}>
                    {"<"}
                </li>

                {
                    pageNumbers.map(number => number <= 4 ? (
                        <PointPagination number={number} paginate={paginate}/>
                    ) : "")
                }

                <CenterPagination />

                <PointPagination number={pageNumbers[pageNumbers.length-1]} paginate={paginate}/>

                <li className={style.li} onClick={nextPage} style={{cursor: "pointer"}}>
                    {">"}
                </li>
            </ul>
        </div>
    );
};

export default Pagination;