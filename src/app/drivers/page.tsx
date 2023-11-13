'use client'

import style from './drivers.module.scss';
import Link from "next/link";
import {useState} from "react";
import Pagination from "@/app/requests/pagination/pagination";
import DriversBlock from "@/app/drivers/driverBlock/driversBlock";
import DriversForm from "@/app/drivers/driverForm/driversForm";

export default function Drivers() {
    const [openForm, setOpenForm] = useState(false)

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
    const nextPage = () => setCurrentPage(prev => prev >= array.length / perPage ? prev : prev + 1)
    const startPage = () => setCurrentPage(1)

    current = array.slice(firstIndex, lastIndex)

    return (
        <div className={style.main}>
            {
                openForm ? (<DriversForm openForm={openForm} setOpenForm={setOpenForm}/>) : ''
            }

            <div className={style.positionTitle}>
                <h2 className={style.title}>Водители</h2>
                <button onClick={funOpenForm} className={style.button}>Загрузить данные водителя</button>
            </div>

            <div className={style.position}>
                {
                    current.map(item => (
                        <DriversBlock info={item}/>
                    ))
                }
            </div>
            {
                // компонент пагинации, если страница одна, то ничего не выводим
                array.length < perPage ? "" : <Pagination startPage={startPage} currentPage={currentPage} perPage={perPage} totalCount={array.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
            }
        </div>
    )
}

let array = [
    {
        fioName: 'Евдокимов М.В.',
        phone: '+7 (909) 555-44-33',
        email: 'driver1@mail.ru',
    },
    {
        fioName: 'Иванов И.И.',
        phone: '+7 (111) 111-11-11',
        email: 'driver2@mail.ru',
    },
    {
        fioName: 'Максимов М.М.',
        phone: '+7 (222) 222-22-22',
        email: 'driver3@mail.ru',
    },
    {
        fioName: 'Антонов А.А.',
        phone: '+7 (333) 333-33-33',
        email: 'driver4@mail.ru',
    },
    {
        fioName: 'Белов Б.Б.',
        phone: '+7 (444) 444-44-44',
        email: 'driver5@mail.ru',
    },
    {
        fioName: 'Андропов Г.Г.',
        phone: '+7 (555) 555-55-55',
        email: 'driver6@mail.ru',
    },
    {
        fioName: 'Милюков М.М.',
        phone: '+7 (666) 666-66-66',
        email: 'driver7@mail.ru',
    },
    {
        fioName: 'Евдокимов М.В.',
        phone: '+7 (909) 555-44-33',
        email: 'driver8@mail.ru',
    },
    {
        fioName: 'Иванов И.И.',
        phone: '+7 (111) 111-11-11',
        email: 'driver9@mail.ru',
    },
    {
        fioName: 'Максимов М.М.',
        phone: '+7 (222) 222-22-22',
        email: 'driver10@mail.ru',
    },{
        fioName: 'Евдокимов М.В.',
        phone: '+7 (909) 555-44-33',
        email: 'driver1@mail.ru',
    },
    {
        fioName: 'Иванов И.И.',
        phone: '+7 (111) 111-11-11',
        email: 'driver2@mail.ru',
    },
    {
        fioName: 'Максимов М.М.',
        phone: '+7 (222) 222-22-22',
        email: 'driver3@mail.ru',
    },
    {
        fioName: 'Антонов А.А.',
        phone: '+7 (333) 333-33-33',
        email: 'driver4@mail.ru',
    },
    {
        fioName: 'Белов Б.Б.',
        phone: '+7 (444) 444-44-44',
        email: 'driver5@mail.ru',
    },
    {
        fioName: 'Андропов Г.Г.',
        phone: '+7 (555) 555-55-55',
        email: 'driver6@mail.ru',
    },
    {
        fioName: 'Милюков М.М.',
        phone: '+7 (666) 666-66-66',
        email: 'driver7@mail.ru',
    },
]