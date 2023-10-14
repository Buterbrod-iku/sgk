'use client'

import style from './fleet.module.scss';
import CarBlock from "@/app/fleet/carBlock/carBlock";
import Link from "next/link";
import {useState} from "react";
import CarForm from "@/app/fleet/carForm/carForm";

export default function Fleet() {
    const [openForm, setOpenForm] = useState(false)

    const funOpenForm = (e) => {
        e.preventDefault()
        setOpenForm(!openForm)
    }

    return (
        <div className={style.main}>
            {
                openForm ? (<CarForm openForm={openForm} setOpenForm={setOpenForm}/>) : ''
            }

            <div className={style.positionTitle}>
                <h2 className={style.title}>Автопарк</h2>
                <button onClick={funOpenForm} className={style.button}>Загрузить машину</button>
            </div>

            <div className={style.position}>
                <CarBlock />
                <CarBlock />
                <CarBlock />
                <CarBlock />
                <CarBlock />
                <CarBlock />
                <CarBlock />
                <CarBlock />
            </div>
        </div>
    )
}