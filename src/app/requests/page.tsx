'use client' // TODO: Изучить

import style from './request.module.scss'
import LineTable from "@/app/requests/lineTable/lineTable";
import {useEffect, useState} from "react";
import Link from "next/link";
import Pagination from "./pagination/pagination";
import axios from "axios";
import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";

const ReversDateTime = (dataTime) => {
    const dateTime = new Date(dataTime * 1000);

    return (dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()) + '.' + (dateTime.getUTCMonth() < 10 ? '0' + dateTime.getUTCMonth() : dateTime.getUTCMonth()) + '.' + dateTime.getUTCFullYear();
}

const ReversRoutePoint = (request) => {
    let result = request.orders[0]?.route.loadingAddress.address

    request.orders.map(item => (
        result += ' - ' + item.route?.unloadingAddress.address
    ))

    return result
}

const NoneRequests = () => {
    return (
        <div className={style.NoneRequests}>
            <p>Нет заявок</p>
        </div>
    )
}

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getAll()
        setAppState(response)
    })

    useEffect(() => {
        fetchPostGetAll()
    }, [appState])

    // currentPage - текущая страница пагинации
    const [currentPage, setCurrentPage] = useState(1)
    // perPage - сколько объектов будет на одной странице
    const perPage = 10

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    let current;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // функции для кнопок в пагинации
    const prevPage = () => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)
    const nextPage = () => setCurrentPage(prev => prev >= appState.length / perPage ? prev : prev + 1)
    const startPage = () => setCurrentPage(1)

    current = appState.slice(firstIndex, lastIndex)

    return (
        <div className={style.main}>
            <div className={style.position}>
                <h3 className={style.title}>Все заявки</h3>
                <Link href={"/requests/new"}><button className={style.button}>Создать заявку</button></Link>
            </div>
            <table className={style.table}>
                <thead>
                    <tr className={style.tr}>
                        <th>Дата</th>
                        <th>Структурное подразделение</th>
                        <th>Маршрут</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // проверяем на загрузку
                        isLoading
                            ? (<Loading />)
                            // выводим страницу с заявками
                            : (
                                current.length === 0
                                    ? (<NoneRequests />)
                                    :  current.map(item => <LineTable key={item.route._id}
                                                                      requestID={item.route._id}
                                                                      date={ReversDateTime(item?.orders[0]?.date.loadingTime)}
                                                                      name={item?.orders[0]?.order?.devisionName}
                                                                      path={ReversRoutePoint(item)}
                                                                      isSingle={item.route.isSingle} />)
                            )
                    }
                </tbody>
            </table>
            {
                // компонент пагинации, если страница одна, то ничего не выводим
                appState.length < perPage ? "" : <Pagination startPage={startPage} currentPage={currentPage} perPage={perPage} totalCount={appState.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
            }
        </div>
    )
}
