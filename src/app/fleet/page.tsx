'use client'

import style from './fleet.module.scss';
import CarBlock from "@/app/fleet/carBlock/carBlock";
import Link from "next/link";
import {useState} from "react";
import CarForm from "@/app/fleet/carForm/carForm";
import Pagination from "@/app/requests/pagination/pagination";

export default function Fleet() {
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
                openForm ? (<CarForm openForm={openForm} setOpenForm={setOpenForm}/>) : ''
            }

            <div className={style.positionTitle}>
                <h2 className={style.title}>Автопарк</h2>
                <button onClick={funOpenForm} className={style.button}>Загрузить машину</button>
            </div>

            <div className={style.position}>
                {
                    current.map(item => (
                        <CarBlock info={item}/>
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
        carName: 'УАЗ-452',
        carNumber: 'а000аа',
        price: '20р/км'
    },
    {
        fioName: 'Иванов И.И.',
        phone: '+7 (111) 111-11-11',
        carName: 'Лада Гранта',
        carNumber: 'в001вв',
        price: '11р/км'
    },
    {
        fioName: 'Максимов М.М.',
        phone: '+7 (222) 222-22-22',
        carName: 'Тойота Тундра',
        carNumber: 'к020кк',
        price: '18р/км'
    },
    {
        fioName: 'Антонов А.А.',
        phone: '+7 (333) 333-33-33',
        carName: 'ВАЗ-2121',
        carNumber: 'ц140цк',
        price: '15р/км'
    },
    {
        fioName: 'Белов Б.Б.',
        phone: '+7 (444) 444-44-44',
        carName: 'ВАЗ-111',
        carNumber: 'ф453пк',
        price: '17р/км'
    },
    {
        fioName: 'Андропов Г.Г.',
        phone: '+7 (555) 555-55-55',
        carName: 'ВАЗ-777',
        carNumber: 'н999нн',
        price: '12р/км'
    },
    {
        fioName: 'Милюков М.М.',
        phone: '+7 (666) 666-66-66',
        carName: 'ВАЗ-555',
        carNumber: 'ш140фс',
        price: '21р/км'
    },
    {
        fioName: 'Калинов К.К.',
        phone: '+7 (777) 777-77-77',
        carName: 'ВАЗ-889',
        carNumber: 'т423гн',
        price: '25р/км'
    },
    {
        fioName: 'Евдокимов М.В.',
        phone: '+7 (909) 555-44-33',
        carName: 'УАЗ-452',
        carNumber: 'а000аа',
        price: '20р/км'
    },
    {
        fioName: 'Иванов И.И.',
        phone: '+7 (111) 111-11-11',
        carName: 'Лада Гранта',
        carNumber: 'в001вв',
        price: '11р/км'
    },
    {
        fioName: 'Максимов М.М.',
        phone: '+7 (222) 222-22-22',
        carName: 'Тойота Тундра',
        carNumber: 'к020кк',
        price: '18р/км'
    },
    {
        fioName: 'Антонов А.А.',
        phone: '+7 (333) 333-33-33',
        carName: 'ВАЗ-2121',
        carNumber: 'ц140цк',
        price: '15р/км'
    },
    {
        fioName: 'Белов Б.Б.',
        phone: '+7 (444) 444-44-44',
        carName: 'ВАЗ-111',
        carNumber: 'ф453пк',
        price: '17р/км'
    },
    {
        fioName: 'Андропов Г.Г.',
        phone: '+7 (555) 555-55-55',
        carName: 'ВАЗ-777',
        carNumber: 'н999нн',
        price: '12р/км'
    },
    {
        fioName: 'Милюков М.М.',
        phone: '+7 (666) 666-66-66',
        carName: 'ВАЗ-555',
        carNumber: 'ш140фс',
        price: '21р/км'
    },
    {
        fioName: 'Калинов К.К.',
        phone: '+7 (777) 777-77-77',
        carName: 'ВАЗ-889',
        carNumber: 'т423гн',
        price: '25р/км'
    },
    {
        fioName: 'Евдокимов М.В.',
        phone: '+7 (909) 555-44-33',
        carName: 'УАЗ-452',
        carNumber: 'а000аа',
        price: '20р/км'
    },
    {
        fioName: 'Иванов И.И.',
        phone: '+7 (111) 111-11-11',
        carName: 'Лада Гранта',
        carNumber: 'в001вв',
        price: '11р/км'
    },
    {
        fioName: 'Максимов М.М.',
        phone: '+7 (222) 222-22-22',
        carName: 'Тойота Тундра',
        carNumber: 'к020кк',
        price: '18р/км'
    },
    {
        fioName: 'Антонов А.А.',
        phone: '+7 (333) 333-33-33',
        carName: 'ВАЗ-2121',
        carNumber: 'ц140цк',
        price: '15р/км'
    },
    {
        fioName: 'Белов Б.Б.',
        phone: '+7 (444) 444-44-44',
        carName: 'ВАЗ-111',
        carNumber: 'ф453пк',
        price: '17р/км'
    },
    {
        fioName: 'Андропов Г.Г.',
        phone: '+7 (555) 555-55-55',
        carName: 'ВАЗ-777',
        carNumber: 'н999нн',
        price: '12р/км'
    },
    {
        fioName: 'Милюков М.М.',
        phone: '+7 (666) 666-66-66',
        carName: 'ВАЗ-555',
        carNumber: 'ш140фс',
        price: '21р/км'
    },
    {
        fioName: 'Калинов К.К.',
        phone: '+7 (777) 777-77-77',
        carName: 'ВАЗ-889',
        carNumber: 'т423гн',
        price: '25р/км'
    },
]