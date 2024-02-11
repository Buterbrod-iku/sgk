'use client' // TODO: Изучить

import style from './request.module.scss'
import {useEffect, useState} from "react";
import Link from "next/link";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import Table from "@/app/requests/table/table";
import Loading from "@/app/requests/loading/loading";

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (id) => {
        let response = await PostService.getAll()

        setAppState(response)
    })

    useEffect(() => {
        fetchPostGetAll()
        console.log(appState)
    }, [])

    return (
        <div className={style.main}>
            <div className={style.position}>

                <div className={style.sortPosition}>
                    <h3 className={style.title}>Все заявки</h3>
                </div>
                <Link href={"/requests/new"}><button className={style.button}>Создать заявку</button></Link>
            </div>

            {
                isLoading ?
                    <Loading />
                    :
                    <Table array={appState} fetchPostGetAll={fetchPostGetAll} isLoading={isLoading}/>
            }
        </div>
    )
}