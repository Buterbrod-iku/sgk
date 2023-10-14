'use client'

import style from './openCar.module.scss';
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useState} from "react";
import ModalConfirm from "@/app/requests/[id]/modalConfirm/modalConfirm";

export default function OpenCar() {
    const [confirm, setConfirm] = useState(false);
    const [edit, setEdit] = useState(false);

    const openConfirm = (e) => {
        e.preventDefault()
        setConfirm(!confirm)
    }

    const startEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }

    let b = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aspernatur at beatae consectetur cbus? Ab animi aspernatur blanditiis cum debitis dolore dolores ete.'
    return (
        <div className={style.main}>
            {
                confirm ? <ModalConfirm setConfirm={openConfirm}/> : ""
            }
            <div className={style.block}>
                <h2 className={style.title}>Лада гранта</h2>
                <button onClick={openConfirm} className={style.cancelButton}>Удалить машину</button>

                <div style={{display: 'flex'}}>
                    <div className={style.posLeft}>
                        <InfoBlock title="ФИО водителя" name="name" info={"Евдокимов Михаил Владимирович"} edit={edit}/>
                        <InfoBlock title="Номер телефона" name="name" info={"+7 (909) 555-44-33"} edit={edit}/>
                        <InfoBlock title="E-mail водителя" name="name" info={"vodila@mail.ru"} edit={edit}/>
                        <InfoBlock title="Цена за 1 километр" name="name" info={"30р"} edit={edit}/>
                    </div>

                    <div className={style.posRight}>
                        <InfoBlock title="Номер автомобиля" name="name" info={"а000аа"} edit={edit}/>
                        <InfoBlock title="Грузоподъемность" name="name" info={"100 кг/м3"} edit={edit}/>
                        <InfoBlock title="Количество посадочных мест" name="name" info={"4"} edit={edit}/>
                        <InfoBlock title="Комментарий" name="name" info={b} edit={edit}/>
                    </div>
                </div>

                <div className={style.editRequestPosition}>
                    <button onClick={startEdit} className={style.editRequestButton} style={edit ? {background: "#0b626c"} : {background: "#3ea19d"}}>{edit ? "Сохранить" : "Изменить данные"}</button>
                    {
                        edit ? (
                            <button onClick={startEdit} className={style.editRequestButton} style={{background: "#5b5757", marginLeft: "20px"}}>Отменa</button>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    )
}