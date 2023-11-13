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

    return (dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()) + '.' + ((dateTime.getUTCMonth() + 1) < 10 ? '0' + (dateTime.getUTCMonth() + 1) : (dateTime.getUTCMonth() + 1)) + '.' + dateTime.getUTCFullYear();
}

const ReversRoutePoint = (request) => {
    let result = request.orders[0]?.route.loadingAddress.address.split(',')[0]

    request.orders.map(item => (
        result += ' - ' + item.route?.unloadingAddress.address.split(',')[0]
    ))

    return result
}

export const NoneRequests = () => {
    return (
        <div className={style.NoneRequests}>
            <p>Нет заявок</p>
        </div>
    )
}

let test = [
    {
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1696271100
                },
                "order": {
                    "devisionName": "Структура структура"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск"
                    },
                    "unloadingAddress": {
                        "address": "Тальменка"
                    }
                }
            },
            {
                "date": {
                    "loadingTime": 1696271100
                },
                "order": {
                    "devisionName": "Структура структура"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул"
                    }
                }
            },
            {
                "date": {
                    "loadingTime": 1696271100
                },
                "order": {
                    "devisionName": "Структура структура"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Барнаул"
                    },
                    "unloadingAddress": {
                        "address": "Бийск"
                    }
                }
            }
        ]
    }
]

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);
    const [appStateServer, setAppStateServer] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (id) => {
        let response = await PostService.getAll()

        response = response.filter(item => item.route?.status !== 'merged')

        setAppState(test.concat(response))
    })



    useEffect(() => {
        fetchPostGetAll()
    }, [])

    // currentPage - текущая страница пагинации
    const [currentPage, setCurrentPage] = useState(1)
    // perPage - сколько объектов будет на одной странице
    const perPage = 11

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const [current, setCurrent] = useState([])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // функции для кнопок в пагинации
    const prevPage = () => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)
    const nextPage = () => setCurrentPage(prev => prev >= appState.length / perPage ? prev : prev + 1)
    const startPage = () => setCurrentPage(1)

    useEffect(() => {
        setCurrent(appState.slice(firstIndex, lastIndex))
    }, [appState, lastIndex])

    const sort = () => {
        setAppState(appState.sort((a, b) => a.orders[0].date.loadingTime <= b.orders[0].date.loadingTime ? 1 : -1))
        setCurrent(appState.slice(firstIndex, lastIndex))
    }

    const altSort = () => {
        setAppState(appState.sort((a, b) => a.orders[0].date.loadingTime >= b.orders[0].date.loadingTime ? 1 : -1))
        setCurrent(appState.slice(firstIndex, lastIndex))
    }

    const name = () => {
        setAppState(appState.sort((a, b) => a.orders[0].order.devisionName >= b.orders[0].order.devisionName ? 1 : -1))
        setCurrent(appState.slice(firstIndex, lastIndex))
    }

    const altName = () => {
        setAppState(appState.sort((a, b) => a.orders[0].order.devisionName >= b.orders[0].order.devisionName ? -1 : 1))
        setCurrent(appState.slice(firstIndex, lastIndex))
    }

    const [date, setDate] = useState(0)
    const [tc, setTc] = useState(0)

    const dateSort = (e) => {
        e.preventDefault()
        if(date === 0){
            sort()
            setDate(1)
            setTc(0)
        }
        else if(date === 1){
            altSort()
            setDate(2)
            setTc(0)
        }
        else if(date === 2){
            fetchPostGetAll()
            setDate(0)
            setTc(0)
        }
    }

    const tcSort = (e) => {
        e.preventDefault()
        if(tc === 0){
            name()
            setTc(1)
            setDate(0)
        }
        else if(tc === 1){
            altName()
            setTc(2)
            setDate(0)
        }
        else if(tc === 2){
            fetchPostGetAll()
            setTc(0)
            setDate(0)
        }
    }

    return (
        <div className={style.main}>
            <div className={style.position}>

                <div className={style.sortPosition}>
                    <h3 className={style.title}>Все заявки</h3>
                </div>
                <Link href={"/requests/new"}><button className={style.button}>Создать заявку</button></Link>
            </div>

            {/*<div className={style.sortPosition}>*/}
            {/*    <SortItem />*/}
            {/*</div>*/}

            <table className={style.table}>
                <thead>
                    <tr className={style.tr}>
                        <th className={style.date} onClick={dateSort}>
                            Дата
                            <div style={date === 0 ? {width: "15px",height: "0"} : date === 2 ? {transform: 'rotate(180deg)'} : {}}></div>
                        </th>
                        <th className={style.tc} onClick={tcSort}>
                            Структурное подразделение
                            <div style={tc === 0 ? {width: "15px",height: "0"} : tc === 2 ? {transform: 'rotate(180deg)'} : {}}></div>
                        </th>
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
                                current?.length === 0
                                    ? (<NoneRequests />)
                                    :  current?.map(item => {
                                            return (
                                                <LineTable key={item.route._id}
                                                           requestID={item.route._id}
                                                           date={ReversDateTime(item?.orders[0]?.date.loadingTime)}
                                                           name={item?.orders[0]?.order?.devisionName}
                                                           path={ReversRoutePoint(item)}
                                                           isSingle={item.route.isSingle} />
                                            )
                                    })
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
