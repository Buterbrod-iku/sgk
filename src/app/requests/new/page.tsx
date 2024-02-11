"use client";

import style from './new.module.scss';
import {useEffect, useState, Fragment} from "react";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";
import axios from 'axios';
import {XMLBuilder, XMLParser, XMLValidator} from "fast-xml-parser";
import {useRouter} from "next/navigation";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import ModalConfirm from "@/app/requests/new/modalConfirm/modalConfirm";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import PageBlock from "@/app/requests/new/pageBlock/pageBlock";
import getCoordsByAddress from "@/app/API/geocoder";
import {ReverseObject} from "@/components/utils/objectRestructuring";
import PostService from "@/app/API/postService";

export default function New() {
    const [values, setValues] = useState({
        "waypoints": {},
        "isSingle": false
    });

    const parser = new XMLParser();

    async function submitHandler (e) {
        e.preventDefault();
        // 3. Реструктурирование values в требуемый вид и вывод данных
        // console.log('первая версия...');
        // console.log(values);
        //
        // console.log("result")
        await console.log(await ReverseObject(values))
        // console.log(await getCoordsByAddress("Новосибирск, улица Сибиряков-Гвардейцев, 34", parser))

        await PostService.sendRequest(await ReverseObject(values))
        setTimeout(() => {
            setModalOpened(true);
        }, 500);
        // link.push('/requests')
    }

    const [modalOpened, setModalOpened] = useState(false);

    const selectArray = [
        {
            text: "Грузовой",
            value: "cargo"
        },
        {
            text: "Пассажирский",
            value: "human"
        },
        {
            text: "Грузо-пассажирский",
            value: "all"
        },
    ];

    return (
        <>
            <p className={style.titlePage}>Формирование Заявки</p>
            <form className={style.form}>
                <div className={style.headerPage}>
                    <div className={style.styleElement}></div>
                    <h3 className={style.title}>Сведения о заявке</h3>
                </div>

                <TitleBlock text={"Основные данные"} fontSize={"18px"}/>

                <div className={style.pos}>
                    <BlockInput gridName={"A"} type={'text'} text={"Структурное подразделение"} placeholder={"Название подразделения"} require={true} name={"department"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"B"} type={'checkbox'} text={"Сделать поездку приватной"} require={false} name={"isSingle"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"C"} type={'select'} text={"Тип перевозки"} placeholder={"Не выбран"} selectArray={selectArray} require={true} name={"unit"} onChange={(e) => onChangeDefault(e, values, setValues)}/>

                    <BlockInput gridName={"D"} type={'textarea'} text={"Комментарий к заявке"} placeholder={"Комментарий к заявке"} require={false} name={"description"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                </div>

                <TitleBlock text={"Маршрутная карта"} fontSize={"18px"}/>

                <PageBlock values={values} setValues={setValues}/>

                <div className={style.positionButton}>
                    <button className={style.buttonConfirm} onClick={submitHandler}>Создать заявку</button>
                </div>
            </form>

            {
                (modalOpened) ?
                    <ModalConfirm />
                    : null
            }
        </>
    )
}
