'use client' // TODO: Изучить

import style from './table.module.scss'
import LineTable from "@/app/requests/lineTable/lineTable";
import {useEffect, useState} from "react";
import Pagination from "../pagination/pagination";
import {ReversDateTime} from "@/components/utils/refactorUtil/ReversDateTime";
import {ReversRoutePoint} from "@/components/utils/refactorUtil/ReversRoutePoint";
import Loading from "@/app/requests/loading/loading";
import NoneRequests from "@/components/utils/refactorUtil/NoneRequests/NoneRequests";

export default function Table(props) {
    // import data allRequest from server
    const [appState, setAppState] = useState(props.array);

    useEffect(() => {
        setAppState(props.array)
    }, [props.array])

    // currentPage - текущая страница пагинации
    const [currentPage, setCurrentPage] = useState(1)
    // perPage - сколько объектов будет на одной странице
    const perPage = props.perPage

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

    return (
        <>
            <table className={style.table} style={props.perPage === 3 ? {border: "1px solid rgb(0, 168, 77)"} : {}}>
                <thead>
                    <tr className={style.tr} style={props.history ? {gridTemplateColumns: "1fr 2fr 4fr 1fr"} : {gridTemplateColumns: "1fr 2fr 5fr"}}>
                        <th className={style.date}>
                            Дата
                        </th>
                        <th className={style.tc}>
                            Структурное подразделение
                        </th>
                        <th>Маршрут</th>
                        {
                            props.history ? (
                                <th>Путевой лист</th>
                            )
                                : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        current?.length === 0
                            ? (<tr className={style.NoneRequests}>
                                    <td>Нет заявок</td>
                                </tr>
                            )
                            :  current?.map((item, index) => {
                                if("orders" in item){
                                    return (
                                        <LineTable route={true}
                                                   history={props.history}
                                                   key={item.id}
                                                   requestID={item.id}
                                                   date={ReversDateTime(item.orders[0].deadline.beginDate)}
                                                   name={item.orders[0].cargo.department}
                                                   path={ReversRoutePoint(item)}
                                                   isSingle={item.orders[0].isSingle}/>
                                    )
                                } else{
                                    return (
                                        <LineTable route={false}
                                                   history={props.history}
                                                   key={item.id}
                                                   requestID={item.id}
                                                   date={ReversDateTime(item.deadline.beginDate)}
                                                   name={item.cargo.department}
                                                   path={ReversRoutePoint(item)}
                                                   isSingle={item.isSingle}/>
                                    )
                                }
                            })
                    }
                </tbody>
            </table>
            {
                // компонент пагинации, если страница одна, то ничего не выводим
                appState.length < perPage ? "" : <Pagination startPage={startPage} currentPage={currentPage} perPage={perPage} totalCount={appState.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
            }
        </>
    )
}
