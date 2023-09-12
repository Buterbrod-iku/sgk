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
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Д",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Е",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Л",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Ф",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение К",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Ц",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
    {
        requestID: "99",
        date: "15.07.2023",
        name: "Подразделение Д",
        path: "Москва - Казань - Екатеринбург - Тюмень",
    },
]

export default function Request() {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 3

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    let current;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const prevPage = () => setCurrentPage(prev => prev <= 1 ? prev : prev + 1)
    const nextPage = () => setCurrentPage(prev => prev >= array.length / 3 ? prev : prev + 1)


    current = array.slice(firstIndex, lastIndex)

    // const [request, setRequest] = useState([
    //     <LineTable requestID="99" date="15.07.2023" name="Подразделение A" path="Москва - Казань - Екатеринбург - Тюмень" />,
    //     <LineTable requestID="98" date="14.07.2023" name="Подразделение B" path="Санкт-Петербург - Самара - Уфа - Челябинск - Екатеринбург" />,
    //     <LineTable requestID="97" date="13.07.2023" name="Подразделение C" path="Новосибирск - Омск - Челябинск" />,
    //     <LineTable requestID="96" date="12.07.2023" name="Подразделение A" path="Владивосток - Хабаровск - Иркутск" />,
    //     <LineTable requestID="95" date="11.07.2023" name="Подразделение B" path="Ростов-на-Дону - Волгоград - Нижний Новгород" />,
    //     <LineTable requestID="94" date="10.07.2023" name="Подразделение C" path="Пермь - Красноярск - Саратов" />,
    //     <LineTable requestID="93" date="09.07.2023" name="Подразделение A" path="Казань - Уфа - Оренбург - Пермь" />,
    //     <LineTable requestID="92" date="08.07.2023" name="Подразделение B" path="Самара - Волгоград - Ярославль" />,
    //     <LineTable requestID="91" date="07.07.2023" name="Подразделение C" path="Омск - Челябинск - Воронеж" />,
    //     <LineTable requestID="90" date="06.07.2023" name="Подразделение A" path="Краснодар - Новосибирск - Тольятти" />,
    //     <LineTable requestID="89" date="05.07.2023" name="Подразделение B" path="Красноярск - Саратов - Кемерово - Иркутск" />,
    //     <LineTable requestID="88" date="04.07.2023" name="Подразделение C" path="Иркутск - Пермь - Тюмень" />
    // ]);

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
            <Pagination perPage={perPage} totalCount={array.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
        </div>
    )
}
