'use client' // TODO: Изучить

import style from './request.module.scss'
import {useEffect, useState} from "react";
import Link from "next/link";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import Table from "@/app/requests/table/table";
import Loading from "@/app/requests/loading/loading";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import {onChangeDefault} from "@/components/utils/formUtils";

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (query) => {
        let response = await PostService.getAll(query)

        setAppState(response)
    })

    const [activeState, setActiveState] = useState()

    const [fetchGetActive, isLoadingGetActive, errorGetActive] = useFetching(async () => {
        let response = await PostService.getActive()

        setActiveState(response)
    })

    useEffect(() => {
        fetchPostGetAll("?active=false")
        fetchGetActive()
    }, [])



    const selectType = (e) => {
        fetchPostGetAll(e.target.value)
    }

    return (
        <div className={style.main}>
            <div className={style.position}>

                <div className={style.sortPosition}>
                    <h3 className={style.title}>Все заявки</h3>
                </div>
                <Link href={"/requests/new"}><button className={style.button}>Создать заявку</button></Link>
            </div>

            {

                    isLoadingGetActive ?
                        <Loading />
                        :
                        activeState.length !== 0 ?
                            (
                                <div className={style.pos}>
                                    <h2>Активные</h2>
                                    <Table array={activeState} fetchPostGetAll={fetchGetActive} isLoading={isLoadingGetActive} perPage={3}/>
                                </div>
                            )
                    : null
            }

            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        <select className={style.select} onChange={(e) => selectType(e)}>
                            <option value={"?active=false"}>Все</option>
                            <option value={"?type=order&active=false"}>Заявки</option>
                            <option value={"?type=route&active=false"}>Маршруты</option>
                        </select>
                        <Table array={appState} perPage={11}/>
                    </>
            }
        </div>
    )
}