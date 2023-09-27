import React, {useState} from 'react';
import style from './pagination.module.scss';

const PointPagination = ({number, paginate, focus}) => {
    return(
        <>
            <a href="!#" onClick={(e) => {e.preventDefault(); paginate(number)}} className={style.a}>
                <li key={number} className={style.li} style={focus ? {background: "red"} : {}}>
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

const Pagination = ({currentPage, totalCount, perPage, paginate, nextPage, prevPage, startPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalCount / perPage); i++) {
        pageNumbers.push(i)
    }

    let dynamicPagination

    if(currentPage <= 3){
        dynamicPagination = pageNumbers.slice(1, 5)
    } else if(currentPage >= pageNumbers.length - 1){
        dynamicPagination = pageNumbers.slice(pageNumbers.length - 5, pageNumbers.length + 1)
    } else {
        dynamicPagination = pageNumbers.slice(currentPage - 3, currentPage + 3)
    }

    return (
        <div className={style.main}>
            <li className={style.li} onClick={prevPage}>
                Предыдущая
            </li>
            <ul className={style.ul}>
                <PointPagination focus={currentPage === 1} number={1} paginate={startPage}/>
                {
                    dynamicPagination.map(number =>  (
                        <PointPagination focus={currentPage === number} number={number} paginate={paginate}/>
                    ))
                }
                <PointPagination focus={currentPage === pageNumbers[pageNumbers.length-1]} number={pageNumbers[pageNumbers.length-1]} paginate={paginate}/>

            </ul>
            <li className={style.li} onClick={nextPage}>
                Следующая
            </li>
        </div>
    );
};

export default Pagination;