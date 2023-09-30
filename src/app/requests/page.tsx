'use client' // TODO: Изучить

import style from './request.module.scss'
import LineTable from "@/app/requests/lineTable/lineTable";
import {useEffect, useState} from "react";
import Link from "next/link";

import { Metadata } from 'next'
import Pagination from "./pagination/pagination";
 
export const metadata: Metadata = {
  title: 'About',
}

let array = [
    {
        requestID: "99",
        date: "1",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "2",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "3",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "4",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "5",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "6",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "7",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "8",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "9",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение В",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Г",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },{
        requestID: "99",
        date: "6",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "7",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "8",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "9",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение В",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Г",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },{
        requestID: "99",
        date: "6",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "7",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "8",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "9",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение В",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Г",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },{
        requestID: "99",
        date: "6",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "7",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "8",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "9",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Б",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение A",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
]

export default function Request() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 5

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    let current;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const prevPage = () => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)
    const nextPage = () => setCurrentPage(prev => prev >= array.length / perPage ? prev : prev + 1)
    const startPage = () => setCurrentPage(1)


    current = array.slice(firstIndex, lastIndex)

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
                        current.map(item => <LineTable requestID={item.requestID} date={item.date} name={item.name} path={item.path} />)
                    }
                </tbody>
            </table>
            <Pagination startPage={startPage} currentPage={currentPage} perPage={perPage} totalCount={array.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
        </div>
    )
}
