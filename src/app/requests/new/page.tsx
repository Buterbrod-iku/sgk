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

    // Объект с точками назначения
    const [distPoints, setDistPoints] = useState([]);

    // Необходим для скрывания крестика удаления компонента
    const [isOnlyOneDist, setIsOnlyOneDist] = useState(false);

    // Обновляет isOnlyOneDist
    useEffect(() => {
        if (distPoints.length === 1) {
            setIsOnlyOneDist(true)
        } else {
            setIsOnlyOneDist(false)
        }
    }, [distPoints])


    function addDistPointHandler () {
        console.log('point added');

        let repObjStruct = {
            component: "section",
            sectionLabel: "Пункт назначения",
            require: true,
            closable: true,
            customStruct: "dateTime",
            inputs: [
                {
                    name: "destinationPoint_address",
                    type: "text",
                    placeholder: "Адрес"
                },
                {
                    name: "destinationPoint_date",
                    type: "date",
                    inputLabel: "Дата подачи"
                },
                {
                    name: "destinationPoint_arriveTime",
                    type: "time",
                    inputLabel: "Время подачи"
                },
                {
                    name: "destinationPoint_waitingTime",
                    type: "time",
                    inputLabel: "Время ожидания"
                }
            ]
        }

        let idKey = "dist_" + (distPoints.length + 1);

        //TODO: !!!!!!!!!!!!!!
        //setDistPoints([...distPoints, <SectionInput key={idKey} id={idKey} closeHandler={closeDistHandler} {...repObjStruct} onChange={(e) => onListChange(e, "destinationPoints", setValues)}/>])
    }


    function closeDistHandler(e, id) {
        setDistPoints(prevEndPoint => {
            return prevEndPoint.filter(item => {
                return item.key !== id
            });
        });

        setValues(prev => {
            return {...prev,
                "destinationPoints": {...prev.destinationPoints,
                    [id]: null,
                },
            }
        })
    }


    // Объект с пассажирами
    const [passengers, setPassengers] = useState([]);

    function addPassengerHandler () {
        console.log('passenger added');

        let repObjStruct = {
            component: "section",
            sectionLabel: "Данные пассажира",
            require: true,
            closable: true,
            inputs: [
                {
                    name: "passengersInfo_fullName",
                    type: "text",
                    placeholder: "ФИО сотрудника"
                },
                {
                    name: "passengersInfo_phoneNumber",
                    type: "tel",
                    placeholder: "Номер телефона"
                },
                {
                    name: "passengersInfo_from",
                    type: "select",
                    placeholder: "Откуда едет"
                },
                {
                    name: "passengersInfo_to",
                    type: "select",
                    placeholder: "Куда едет"
                }
            ]
        }

        let idKey = "passenger_" + (passengers.length + 1);

        //TODO: !!!!!!!!!!!!!!!!!!!!!!!
        //setPassengers([...passengers, <SectionInput key={idKey} id={idKey} closeHandler={closePassengerHandler} {...repObjStruct} onChange={(e) => onListChange(e, "passengersInfo", setValues)}/>])
    }

    // Объект с пассажирами
    const [cargo, setCargo] = useState([]);

    function addCargoHandler () {
        console.log('cargo added');

        let repObjStruct = {
            component: "section",
            sectionLabel: "Информация о грузе",
            require: true,
            closable: true,
            inputs: [
                {
                    name: "cargo_description",
                    type: "text",
                    placeholder: "Характер груза"
                },
                {
                    name: "cargo_volume",
                    type: "text",
                    placeholder: "Объем груза"
                },
                {
                    name: "cargo_weight",
                    type: "text",
                    placeholder: "Вес груза"
                },
                {
                    name: "cargo_from",
                    type: "select",
                    placeholder: "Откуда едет"
                },
                {
                    name: "cargo_to",
                    type: "select",
                    placeholder: "Куда едет"
                }
            ]
        }

        let idKey = "cargo_" + (cargo.length + 1);

        //TODO: !!!!!!!!!!!!!
        //setCargo([...cargo, <SectionInput key={idKey} id={idKey} closeHandler={closeCargoHandler} {...repObjStruct} onChange={(e) => onListChange(e, "cargoInfo", setValues)}/>])
    }


    // Инициализирует sections точки назначения и информации о пассажире
    const [firstCreated, setFirstCreated] = useState(true);
    if (firstCreated) {
        setFirstCreated(false);

        addDistPointHandler(); // TODO: Убрать аргумент e из функции
        addPassengerHandler(); // TODO: Убрать аргумент e из функции
        addCargoHandler(); // TODO: Убрать аргумент e из функции
    }

    function closePassengerHandler(e, id) {
        console.log("closed " + id);
        setPassengers(prevEndPoint => {
            return prevEndPoint.filter(item => {
                return item.key !== id
            });
        });

        setValues(prev => {
            return {...prev,
                "passengersInfo": {...prev.passengersInfo,
                    [id]: null,
                },
            }
        })
    }

    function closeCargoHandler(e, id) {
        console.log("closed " + id);
        setCargo(prevEndPoint => {
            return prevEndPoint.filter(item => {
                return item.key !== id
            });
        });

        setValues(prev => {
            return {...prev,
                "cargoInfo": {...prev.cargoInfo,
                    [id]: null,
                },
            }
        })
    }


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
                    <BlockInput gridName={"A"} type={'text'} text={"Структурное подразделение"} placeholder={"Название подразделения"} require={true} name={"divisionName"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"B"} type={'checkbox'} text={"Сделать поездку приватной"} require={false} name={"isSingle"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                    <BlockInput gridName={"C"} type={'select'} text={"Тип перевозки"} placeholder={"Не выбран"} selectArray={selectArray} require={true} name={"typeCar"} onChange={(e) => onChangeDefault(e, values, setValues)}/>

                    <BlockInput gridName={"D"} type={'textarea'} text={"Комментарий к заявке"} placeholder={"Комментарий к заявке"} require={false} name={"comment"} onChange={(e) => onChangeDefault(e, values, setValues)}/>
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
