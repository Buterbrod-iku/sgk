'use client'

import style from './fleet.module.scss';
import CarBlock from "@/app/fleet/carBlock/carBlock";
import {useEffect, useState} from "react";
import CarForm from "@/app/fleet/carForm/carForm";
import Pagination from "@/app/requests/pagination/pagination";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostDrivers from "@/app/API/postDrivers";
import Loading from "@/app/requests/loading/loading";
import DriversBlock from "@/app/drivers/driverBlock/driversBlock";
import PostCar from "@/app/API/postCar";

export default function Fleet() {
    const [openForm, setOpenForm] = useState(false)

    const [appState, setAppState] = useState([]);

    const [fetchPostGetAll, isLoading, error] = useFetching(async () => {
        let response = await PostCar.getAll()

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
                openForm ? (<CarForm openForm={openForm} setOpenForm={setOpenForm} fun={fetchPostGetAll}/>) : ''
            }

            <div className={style.positionTitle}>
                <h2 className={style.title}>Автопарк</h2>
                <button onClick={funOpenForm} className={style.button}>Загрузить машину</button>
            </div>

            <div className={style.position}>
                {
                    isLoading ?
                        <Loading />
                        :
                        current.map(item => (
                            <CarBlock key={item.id} id={item.id} info={item}/>
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