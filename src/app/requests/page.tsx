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
import Table from "@/app/requests/table/table";

const ReversDateTime = (dataTime) => {
    const dateTime = new Date(dataTime * 1000);

    return (dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()) + '.' + ((dateTime.getUTCMonth() + 1) < 10 ? '0' + (dateTime.getUTCMonth() + 1) : (dateTime.getUTCMonth() + 1)) + '.' + dateTime.getUTCFullYear();
}

const ReversRoutePoint = (request) => {
    let result = request.orders[0]?.route.loadingAddress.address

    request.orders.map(item => (
        result += ' - ' + item.route?.unloadingAddress.address
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

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (id) => {
        let response = await PostService.getAll()

        response = response.filter(item => item.route?.status !== 'merged')

        setAppState(response)
    })

    useEffect(() => {
        fetchPostGetAll()
    }, [])



    return (
        <div className={style.main}>
            <div className={style.position}>

                <div className={style.sortPosition}>
                    <h3 className={style.title}>Все заявки</h3>
                </div>
                <Link href={"/requests/new"}><button className={style.button}>Создать заявку</button></Link>
            </div>

            <Table array={appState} fetchPostGetAll={fetchPostGetAll} isLoading={isLoading}/>
        </div>
    )
}
