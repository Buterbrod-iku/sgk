"use client";

import style from './new.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {useEffect, useState, Fragment} from "react";
import InputButton from "./inputButton/inputButton";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";
import axios from 'axios';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import {useRouter} from "next/navigation";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import ModalConfirm from "@/app/requests/new/modalConfirm/modalConfirm";
import InputForm from "@/app/requests/new/inputForm/inputForm";
import BlockInput from "@/app/requests/new/blockInput/blockInput";
import Checkbox from "@/app/requests/new/checkbox/checkbox";

export default function New() {

    // Получение адреса с символом "-" вместо пробелов (вспомогательная для submitHandler)
    function getFormattedAddress(prevAddress) {
        let newAddress = prevAddress.
            split(' ').
            join('-');

        return encodeURI(newAddress);
    }

    // Отправка запроса для получения геоданных от Яндекса
    function getCoordsByAddress(address) {
        return axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=09ffa4b8-a280-4606-a6f2-91f74c2bba7b&geocode=${getFormattedAddress(address)}`)
        .then(response => {
            // console.log("yandex", parser.parse(response.data));
            // console.log("yandex", `https://geocode-maps.yandex.ru/1.x/?apikey=09ffa4b8-a280-4606-a6f2-91f74c2bba7b&geocode=${getFormattedAddress(address)}`);
            
            let dataParsed = parser.parse(response.data);
            let coordsArr;
            if (Array.isArray(dataParsed.ymaps.GeoObjectCollection.featureMember)) {
                coordsArr = parser.parse(response.data).ymaps.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            } else {
                coordsArr = parser.parse(response.data).ymaps.GeoObjectCollection.featureMember.GeoObject.Point.pos.split(' ');
            }
            
            return (
                {
                    long: coordsArr[0],
                    lat: coordsArr[1]
                }
            )
        })
        .catch(error => {
            console.error(error);
        });
    }

    // Получение координат через геокодер Яндекса 
    // TODO: заменить на собственный
    const parser = new XMLParser();

    const link = useRouter()

    async function submitHandler (e) {
        e.preventDefault();
        // 1. Попытка получения геоданных из всех адресов
        // let startCoords = await getCoordsByAddress(values.carStartPoint_address);
        // console.log('startCoords: ', startCoords);
        
        // let valuesCopy = values; // Не изменяем values, а дополняем копию
    
        // // Перебор всех пунктов назначения (создание объекта)
        // // TODO: Проверка на !null
        // let destinationsCoords = {} 
        // for (let value in valuesCopy.destinationPoints) {
        //     destinationsCoords[value] = await getCoordsByAddress(valuesCopy.destinationPoints[value].destinationPoint_address);
        // }
        // console.log(destinationsCoords);
        // // TODO: Добавить проверки на удачное получение координат и прекратить отправку запроса в случае неудачи

        // // 2. Изменение valuesCopy
        // valuesCopy.carStartPoint_coords = startCoords;
        // for (let destinationPointID in destinationsCoords) {
        //     valuesCopy.destinationPoints[destinationPointID].Coords = destinationsCoords[destinationPointID];
        // }

        // // 3. Реструктурирование values в требуемый вид и вывод данных
        // console.log('первая версия...');
        // console.log(valuesCopy);
        // console.log('результат...');
        // console.log(ObjectRestructuring(valuesCopy));


        // await PostService.sendRequest(ObjectRestructuring(valuesCopy))
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
                    <BlockInput gridName={"A"} type={'text'} text={"Структурное подразделение"} placeholder={"Название подразделения"} require={true} />
                    <BlockInput gridName={"B"} type={'checkbox'} text={"Сделать поездку приватной"} require={false} />
                    <BlockInput gridName={"C"} type={'select'} text={"Тип перевозки"} placeholder={"Не выбран"} selectArray={selectArray} require={true} />

                    <BlockInput gridName={"D"} type={'textarea'} text={"Комментарий к заявке"} placeholder={"Комментарий к заявке"} require={false} />
                </div>

                <TitleBlock text={"Маршрутная карта"} fontSize={"18px"}/>

            </form>

            {
                (modalOpened) ?
                    <ModalConfirm />
                    : null
            }
        </>
    )
}
