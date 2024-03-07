import React, {useState} from 'react';
import style from './pagination.module.scss';

const PointPagination = ({number, paginate, focus}) => {
    return(
        <>
            <a href="!#" onClick={(e) => {e.preventDefault(); paginate(number)}} className={style.a}>
                <li className={style.li} style={focus ? {background: "rgb(0, 66, 92)", color: "white"} : {}}>
                    {number}
                </li>
            </a>
        </>
    );
};

const CenterPagination = () => {
    return(
        <li className={style.liCenter}>
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
    let typeCountPageNumbers = true

    //провека на то какую пагинацию рендерим
    if(pageNumbers.length > 6){
        // выделяем часть всех страниц и выводим
        typeCountPageNumbers = true
        if(currentPage <= 3){
            dynamicPagination = pageNumbers.slice(1, 5)
        } else if(currentPage >= pageNumbers.length - 2){
            dynamicPagination = pageNumbers.slice(pageNumbers.length - 5, pageNumbers.length - 1)
        } else {
            dynamicPagination = pageNumbers.slice(currentPage - 2, currentPage + 1)
        }
    } else {
        typeCountPageNumbers = false
    }


    return (
        <div className={style.main}>
            <li className={style.liPrev} onClick={prevPage} style={currentPage === 1 ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                Предыдущая
            </li>

            <ul className={style.ul}>
                {/*если элементов больше 6, то выводим кнопку для первой страницы*/}
                {typeCountPageNumbers ? <PointPagination focus={currentPage === 1} number={1} paginate={startPage}/> : ''}

                {
                    // выбираем что рендерить
                    typeCountPageNumbers ?
                        // если страниц > 6
                        dynamicPagination.length === 4 ?
                            // для рендера начала или конца списка
                            (dynamicPagination.map((number, index) =>  (
                                <React.Fragment key={index}>
                                    {(index === 0 && pageNumbers.length > 6 && currentPage > pageNumbers.length - 3) ? <CenterPagination /> : ''}
                                    <PointPagination focus={currentPage === number} number={number} paginate={paginate}/>
                                    {(index === dynamicPagination.length - 1 && pageNumbers.length > 6 && currentPage < pageNumbers.length - 2) ? <CenterPagination /> : ''}
                                </React.Fragment>
                            )))
                            :
                            // для середины списка чтобы отображать текущий и 2 ближних
                            dynamicPagination.map((number, index) =>  (
                                <React.Fragment key={index}>
                                    {index === 0 ? <CenterPagination /> : ''}
                                    <PointPagination focus={currentPage === number} number={number} paginate={paginate}/>
                                    {index === dynamicPagination.length - 1  ? <CenterPagination /> : ''}
                                </React.Fragment>
                            ))
                        :
                        // обычная пагинация для < 6
                        pageNumbers.map((number, index) => (
                            <PointPagination key={index} focus={currentPage === number} number={number} paginate={paginate} />
                        ))
                }

                {/*если элементов больше 6, то выводим кнопку для первой страницы*/}
                {typeCountPageNumbers ? <PointPagination focus={currentPage === pageNumbers[pageNumbers.length - 1]} number={pageNumbers[pageNumbers.length - 1]} paginate={paginate}/> : ''}
            </ul>


            <li className={style.liPrev} onClick={nextPage} style={currentPage === pageNumbers[pageNumbers.length - 1] ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                Следующая
            </li>
        </div>
    );
};

export default Pagination;