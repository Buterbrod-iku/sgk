'use client' // TODO: Изучить

import style from './request.module.scss'
import {useEffect, useState} from "react";
import Link from "next/link";
import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import Table from "@/app/requests/table/table";

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (id) => {
        let response = await PostService.getAll()

        response = response.filter(item => (item.route?.status !== 'merged'))

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
                    "devisionName": "Пример"
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