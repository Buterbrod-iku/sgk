'use client' // TODO: Изучить

import style from './request.module.scss'
import LineTable from "@/app/requests/lineTable/lineTable";
import {useEffect, useState} from "react";
import Link from "next/link";

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'About',
}

export default function Request() {
    // возможно этот стэйт не нужен тк просто будем брать из запроса на сервер
    // const [request, setRequest] = useState([<LineTable requestID="1" date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasasdadsasadasdassadasdasdasasdasdasdd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
    //     <LineTable date="123123" name="jjjjjjj" path="asdasd"/>]);
    const [request, setRequest] = useState([
        <LineTable requestID="99" date="15.07.2023" name="Подразделение A" path="Москва - Казань - Екатеринбург - Тюмень" />,
        <LineTable requestID="98" date="14.07.2023" name="Подразделение B" path="Санкт-Петербург - Самара - Уфа - Челябинск - Екатеринбург" />,
        <LineTable requestID="97" date="13.07.2023" name="Подразделение C" path="Новосибирск - Омск - Челябинск" />,
        <LineTable requestID="96" date="12.07.2023" name="Подразделение A" path="Владивосток - Хабаровск - Иркутск" />,
        <LineTable requestID="95" date="11.07.2023" name="Подразделение B" path="Ростов-на-Дону - Волгоград - Нижний Новгород" />,
        <LineTable requestID="94" date="10.07.2023" name="Подразделение C" path="Пермь - Красноярск - Саратов" />,
        <LineTable requestID="93" date="09.07.2023" name="Подразделение A" path="Казань - Уфа - Оренбург - Пермь" />,
        <LineTable requestID="92" date="08.07.2023" name="Подразделение B" path="Самара - Волгоград - Ярославль" />,
        <LineTable requestID="91" date="07.07.2023" name="Подразделение C" path="Омск - Челябинск - Воронеж" />,
        <LineTable requestID="90" date="06.07.2023" name="Подразделение A" path="Краснодар - Новосибирск - Тольятти" />,
        <LineTable requestID="89" date="05.07.2023" name="Подразделение B" path="Красноярск - Саратов - Кемерово - Иркутск" />,
        <LineTable requestID="88" date="04.07.2023" name="Подразделение C" path="Иркутск - Пермь - Тюмень" />
    ]);

    // стейт для пагинации здесь скорее всего будет перечисление страниц. На странице примрно 12 заявок
    const [pagination, setPagination] = useState([]);

    // массив объектов который будет приходить с сервера
    let requestJson = [{}, {}];

    //проверка, надо ли нам задавать пагинацию или нет + надо ли её обновлять. Хотя скорее всего этот стейт будет напривлен только на рендеринг
    useEffect( () => {
            if(requestJson.length > 12){
                requestJson.push({})
            }
    }, requestJson);

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
                        request.map(item => item)
                    }
                </tbody>
            </table>
        </div>
    )
}
