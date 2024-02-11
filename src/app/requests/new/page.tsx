"use client";

import style from './new.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {useEffect, useState, Fragment} from "react";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";
import axios from 'axios';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import {useRouter} from "next/navigation";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import ModalConfirm from "@/app/requests/new/modalConfirm/modalConfirm";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import PageBlock from "@/app/requests/new/pageBlock/pageBlock";
import getCoordsByAddress from "@/app/API/geocoder";

export default function New() {
    const [values, setValues] = useState({
        "waypoints": {}
    });

    // Получение координат через геокодер Яндекса
    // TODO: заменить на собственный
    const parser = new XMLParser();

    const link = useRouter()

    async function submitHandler (e) {
        e.preventDefault();
        // 1. Попытка получения геоданных из всех адресов
        //let startCoords = await getCoordsByAddress(values.carStartPoint_address, parser);
        // console.log('startCoords: ', startCoords);

        let valuesCopy = values; // Не изменяем values, а дополняем копию

        // // Перебор всех пунктов назначения (создание объекта)
        // // TODO: Проверка на !null
        // let destinationsCoords = {}
        // for (let value in valuesCopy.destinationPoints) {
        //     destinationsCoords[value] = await getCoordsByAddress(valuesCopy.destinationPoints[value].destinationPoint_address, parser);
        // }
        // console.log(destinationsCoords);
        // // TODO: Добавить проверки на удачное получение координат и прекратить отправку запроса в случае неудачи

        // // 2. Изменение valuesCopy
        // valuesCopy.carStartPoint_coords = startCoords;
        // for (let destinationPointID in destinationsCoords) {
        //     valuesCopy.destinationPoints[destinationPointID].Coords = destinationsCoords[destinationPointID];
        // }

        // // 3. Реструктурирование values в требуемый вид и вывод данных
        console.log('первая версия...');
        console.log(values);


        // await PostService.sendRequest(valuesCopy)
        setTimeout(() => {
            setModalOpened(true);
        }, 500);
        // link.push('/requests')
    }

    const [modalOpened, setModalOpened] = useState(false);

    const selectArray = ["Грузовой", "Пассажирский", "Грузо-пассажирский"];

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
