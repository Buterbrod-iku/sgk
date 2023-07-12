'use client'

import style from './request.module.scss'
import LineTable from "@/app/request/lineTable/lineTable";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Request() {
    // возможно этот стэйт не нужен тк просто будем брать из запроса на сервер
    const [request, setRequest] = useState([<Link href={"/openRequest"}><LineTable date="123123" name="jjjjjjj" path="asdasd"/></Link>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>,
        <LineTable date="123123" name="jjjjjjj" path="asdasd"/>]);

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
                <Link href={"/form"}><button className={style.button}>Создать заявку</button></Link>
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
