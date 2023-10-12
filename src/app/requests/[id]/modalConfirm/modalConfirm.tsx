'use client'

import style from './modalConfirm.module.scss'
import {useEffect, useState} from "react";
import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function ModalConfirm(props) {
    const router = useRouter();

    const deleteRoute = async (e) => {
        e.preventDefault()

        await props.orders.map(item => {
            PostService.deleteOrder(item)
        })

        await PostService.deleteRoute(props.routeId)

        setTimeout(() => {
            router.push('/requests/');
        }, 200)
    }


    return (
        <>
            <div className={style.main}>
                <div className={style.window}>
                    <p>Вы уверенны, что хотете отменить заявку?</p>
                    <div className={style.position}>
                        <button onClick={deleteRoute} style={{background: "#2ecc71"}}>Подтвердить</button>

                        <button onClick={props.setConfirm} style={{background: "#e74c3c"}}>Закрыть</button>
                    </div>
                </div>
            </div>
        </>
    )
}