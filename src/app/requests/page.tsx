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
                    "loadingTime": 1700046660
                },
                "order": {
                    "devisionName": "Подразделение А"
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

    const [fetchPostGetAll, isLoading, error] = useFetching(async (id) => {
        let response = await PostService.getAll()

        response = response.filter(item => (item.route?.status !== 'merged' && item.route.isSingle !== true))

        setAppState(test.concat(response))
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
