"use client";

import style from './new.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {use, useEffect, useState, Fragment} from "react";
import InputButton from "./inputButton/inputButton";
import {ObjectRestructuring} from "@/app/requests/utils/objectRestructuring";
import {onChangeDefault, onListChange} from "@/app/requests/utils/formUtils";
import axios from 'axios';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import {useRouter} from "next/navigation";
import successIcon from '@/assets/images/success.svg'

export default function New() {
    const [keys, setKeys] = useState(0);

    const [values, setValues] = useState({
        // devisionName: "",
        isSingle: false,
        // carStartPoint: {
        //     address: "",
        //     startDateTime: 0,
        //     waiting: 0
        // },
        destinationPoints: {
        },
        // cargoWeight: 0,
        // passengersAmount: 0,
        passengersInfo: {
        },
        // comment: ""
    });

    // key и id будут определены в цикле
    const sectionsInputs = [
        {
            component: "section",
            sectionLabel: "Структурное подразделение",
            require: true,
            inputs: [
                {
                    name: "devisionName",
                    type: "text",
                    placeholder: "Название"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Приватная поездка",
            require: true,
            customStruct: "checkbox",
            inputs: [
                {
                    name: "isSingle",
                    type: "checkbox"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Место подачи авто",
            require: true,
            customStruct: "dateTime",
            inputs: [
                {
                    name: "carStartPoint_address",
                    type: "text",
                    placeholder: "Адрес"
                },
                {
                    name: "carStartPoint_date",
                    type: "date",
                    inputLabel: "Дата подачи",
                    require: true
                },
                {
                    name: "carStartPoint_arriveTime",
                    type: "time",
                    inputLabel: "Время подачи",
                    require: true
                },
                {
                    name: "carStartPoint_waitingTime",
                    type: "time",
                    inputLabel: "Время ожидания",
                    require: true
                }
            ]
        },
        {
            component: "distPointsSection"
        },
        {
            component: "input",
            type: "button",
            value: "+ Добавить пункт назначения",
            onClick: addDistPointHandler,
        },
        {
            component: "passengersSection"
        },
        {
            component: "input",
            type: "button",
            value: "+ Добавить пассажира",
            onClick: addPassengerHandler,
        },
        {
            component: "cargoSection"
        },
        {
            component: "input",
            type: "button",
            value: "+ Добавить груз",
            onClick: addCargoHandler,
        },
        {
            component: "section",
            sectionLabel: "Тип перевозки",
            require: true,
            inputs: [
                {
                    name: "devisionName",
                    type: "select2",
                    placeholder: "Название"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Дополнительная информация",
            require: true,
            inputs: [
                {
                    name: "comment",
                    type: "text",
                    placeholder: "Комментарий",
                    textarea: true
                }
            ]
        },
        {
            component: "input",
            type: "submit",
            value: "Создать",
            onClick: submitHandler,
        }

    ]
    // Объект с точками назначения
    const [distPoints, setDistPoints] = useState([
        
    ]);

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

    
    function addDistPointHandler (e) {
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
        setDistPoints([...distPoints, <SectionInput key={idKey} id={idKey} closeHandler={closeDistHandler} {...repObjStruct} onChange={(e) => onListChange(e, "destinationPoints", setValues)}/>])
    }
    

    function closeDistHandler(e, id) {
        console.log("closed " + id);
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
    const [passengers, setPassengers] = useState([
        
    ]);

    function addPassengerHandler (e) {
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
       setPassengers([...passengers, <SectionInput key={idKey} id={idKey} closeHandler={closePassengerHandler} {...repObjStruct} onChange={(e) => onListChange(e, "passengersInfo", setValues)}/>])
    }
 
    // Объект с пассажирами
    const [cargo, setCargo] = useState([
            
    ]);

    function addCargoHandler (e) {
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
        setCargo([...cargo, <SectionInput key={idKey} id={idKey} closeHandler={closeCargoHandler} {...repObjStruct} onChange={(e) => onListChange(e, "cargoInfo", setValues)}/>])
    }


    // Инициализирует sections точки назначения и информации о пассажире
    const [firstCreated, setFirstCreated] = useState(true);
    if (firstCreated) { 
        setFirstCreated(false);

        addDistPointHandler(1); // TODO: Убрать аргумент e из функции
        addPassengerHandler(1); // TODO: Убрать аргумент e из функции
        addCargoHandler(1); // TODO: Убрать аргумент e из функции
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
    
    
    function addDistPassengerHandler (e) {
        console.log('passenger added');
    }



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
    
    // 
    const [distValues, setDistValues] = useState(false);




    const [modalOpened, setModalOpened] = useState(false);

    return (
        <Fragment>
            <form className={style.form}>
                <h3 className={style.title}>Составление заявки</h3>
                {
                    sectionsInputs.map((item, index) => {
                        if (item.component == "section") {
                            return <SectionInput key={`${index}`} id={index} {...item} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                        }

                        // Кнопки (например добавление пункта назначения) 
                        if (item.component == "input") {
                            return <InputButton key={`${index}`} id={index} {...item}/>
                        }

                        // Раздел для подразделов точек назначения
                        if (item.component == "distPointsSection") {
                            return <div className={`${isOnlyOneDist ? "close_btn_hidden" : ""}`} key={`${index}`}>
                                {distPoints}
                            </div> 
                        }

                        // Раздел для подразделов пассажиров
                        if (item.component == "passengersSection") {
                            return <div key={`${index}`}>
                                {passengers}
                            </div> 
                        }

                        // Раздел для подразделов грузов
                        if (item.component == "cargoSection") {
                            return <div key={`${index}`}>
                                {cargo}
                            </div> 
                        }
                    }) 
                }
            </form>
            {
                (modalOpened) ? 
                <div className={style.modal}>
                    <div className={style.modalContent}>
                         
                         <svg className="svg" fill="#ffffff" width="140px" height="140px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                             <title>success-standard-line</title>
                             <path className="clr-i-outline clr-i-outline-path-1" d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"></path><path className="clr-i-outline clr-i-outline-path-2" d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z"></path>
                             <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                         </svg>
                         
                         <br></br><br></br><br></br><br></br><br></br>
                     </div>
                     <div className={style.modalContent2}>
                         
                        <h1>Отлично!</h1>
                        
                        <h2>Заявка была успешно создана!</h2>
                        <br></br><br></br><br></br>
                        <button onClick={() => link.push('/requests')}>К заявкам</button>
                        <br></br><br></br> 
                    </div>
                    
                </div> : null
            }
        </Fragment>
    )
}
