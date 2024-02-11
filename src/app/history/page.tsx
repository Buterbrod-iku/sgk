"use client"
import style from './history.module.scss';
import Table from "@/app/requests/table/table";
import {useEffect, useState} from "react";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";

export default function Report() {
    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async (query) => {
        let response = await PostService.getAll(query)

        setAppState(response)
    })
    useEffect(() => {
        fetchPostGetAll("?done=true")
        console.log(appState)
    }, [])

    return (
        <div className={style.main}>
            <div className={style.position}>
                <h3 className={style.title}>История заявок</h3>
            </div>

            {
                isLoading ?
                    <Loading />
                    :
                    (
                        <Table array={appState} isLoading={false} history={true} perPage={10}/>
                    )
            }
        </div>
    )
}
