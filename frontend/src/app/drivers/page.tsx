'use client'

import style from './drivers.module.scss';
import Link from "next/link";
import {useEffect, useState} from "react";
import Pagination from "@/app/requests/pagination/pagination";
import DriversBlock from "@/app/drivers/driverBlock/driversBlock";
import DriversForm from "@/app/drivers/driverForm/driversForm";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";
import PostCar from "@/app/API/postCar";
import PostDrivers from "@/app/API/postDrivers";

export default function Drivers() {
    const [openForm, setOpenForm] = useState(false)

    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async () => {
        let response = await PostDrivers.getAll()

        setAppState(response)
    })

    useEffect(() => {
        fetchPostGetAll()
    }, [isLoading])

    const funOpenForm = (e) => {
        e.preventDefault()
        setOpenForm(!openForm)
    }

    // currentPage - текущая страница пагинации
    const [currentPage, setCurrentPage] = useState(1)
    // perPage - сколько объектов будет на одной странице
    const perPage = 10

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    let current;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // функции для кнопок в пагинации
    const prevPage = () => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)
    const nextPage = () => setCurrentPage(prev => prev >= appState.length / perPage ? prev : prev + 1)
    const startPage = () => setCurrentPage(1)

    current = appState.slice(firstIndex, lastIndex)

    return (
        <div className={style.main}>
            {
                openForm ? (<DriversForm openForm={openForm} setOpenForm={setOpenForm} fun={fetchPostGetAll}/>) : ''
            }
            <div className={style.positionTitle}>
                <h2 className={style.title}>Водители</h2>
                <button onClick={funOpenForm} className={style.button}>Загрузить данные водителя</button>
            </div>

            <div className={style.position}>
                {
                    isLoading ?
                        <Loading />
                        :
                        current.map(item => (
                            <DriversBlock key={item.id} id={item.id} info={item}/>
                        ))
                }
            </div>
            {
                // компонент пагинации, если страница одна, то ничего не выводим
                appState.length < perPage ? "" : <Pagination startPage={startPage} currentPage={currentPage} perPage={perPage} totalCount={appState.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
            }
        </div>
    )
}