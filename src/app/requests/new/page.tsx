"use client";

import style from './new.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {use, useEffect, useState, Fragment} from "react";
import InputButton from "./inputButton/inputButton";
import {ObjectRestructuring} from "@/components/utils/objectRestructuring";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";
import axios from 'axios';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import {useFetching} from "@/components/utils/hooks/useFetching";
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
    const [passengers, setPassengers] = useState([]);

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
                         

<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
	 width="140px" height="140px" viewBox="0 0 612.001 612"
	>
<g>
	<path d="M604.131,440.17h-19.12V333.237c0-12.512-3.776-24.787-10.78-35.173l-47.92-70.975
		c-11.725-17.311-31.238-27.698-52.169-27.698h-74.28c-8.734,0-15.737,7.082-15.737,15.738v225.043H262.475
		c11.567,9.992,19.514,23.92,21.796,39.658H412.53c4.563-31.238,31.475-55.396,63.972-55.396c32.498,0,59.33,24.158,63.895,55.396
		h63.735c4.328,0,7.869-3.541,7.869-7.869V448.04C612,443.713,608.46,440.17,604.131,440.17z M525.76,312.227h-98.044
		c-4.327,0-7.868-3.463-7.868-7.869v-54.372c0-4.328,3.541-7.869,7.868-7.869h59.724c2.597,0,4.957,1.259,6.452,3.305l38.32,54.451
		C535.831,305.067,532.133,312.227,525.76,312.227z M476.502,440.17c-27.068,0-48.943,21.953-48.943,49.021
		c0,26.99,21.875,48.943,48.943,48.943c26.989,0,48.943-21.953,48.943-48.943C525.445,462.125,503.491,440.17,476.502,440.17z
		 M476.502,513.665c-13.535,0-24.472-11.016-24.472-24.471c0-13.535,10.937-24.473,24.472-24.473
		c13.533,0,24.472,10.938,24.472,24.473C500.974,502.649,490.036,513.665,476.502,513.665z M68.434,440.17
		c-4.328,0-7.869,3.543-7.869,7.869v23.922c0,4.328,3.541,7.869,7.869,7.869h87.971c2.282-15.738,10.229-29.666,21.718-39.658
		H68.434V440.17z M220.298,440.17c-26.989,0-48.943,21.953-48.943,49.021c0,26.99,21.954,48.943,48.943,48.943
		c27.068,0,48.943-21.953,48.943-48.943C269.242,462.125,247.367,440.17,220.298,440.17z M220.298,513.665
		c-13.534,0-24.471-11.016-24.471-24.471c0-13.535,10.937-24.473,24.471-24.473c13.534,0,24.472,10.938,24.472,24.473
		C244.77,502.649,233.832,513.665,220.298,513.665z M338.014,150.605h-91.198c4.485,13.298,6.846,27.54,6.846,42.255
		c0,74.28-60.431,134.711-134.711,134.711c-13.535,0-26.675-2.045-39.029-5.744v86.949c0,4.328,3.541,7.869,7.869,7.869h265.96
		c4.329,0,7.869-3.541,7.869-7.869V174.211C361.619,161.149,351.075,150.605,338.014,150.605z M118.969,73.866
		C53.264,73.866,0,127.129,0,192.834s53.264,118.969,118.969,118.969s118.97-53.264,118.97-118.969S184.674,73.866,118.969,73.866z
		 M118.969,284.73c-50.752,0-91.896-41.143-91.896-91.896c0-50.753,41.144-91.896,91.896-91.896
		c50.753,0,91.896,41.144,91.896,91.896C210.865,243.587,169.722,284.73,118.969,284.73z M154.066,212.242
		c-1.014,0-2.052-0.131-3.082-0.407L112.641,201.5c-5.148-1.391-8.729-6.062-8.729-11.396v-59.015
		c0-6.516,5.287-11.803,11.803-11.803c6.516,0,11.803,5.287,11.803,11.803v49.971l29.614,7.983
		c6.294,1.698,10.02,8.177,8.322,14.469C164.033,208.776,159.269,212.242,154.066,212.242z"/>
</g>
</svg>
                         
                         <br></br><br></br><br></br><br></br><br></br>
                     </div>
                     <div className={style.modalContent2}>
                         
                        <h1></h1>
                        
                        <h2>Ваша заявка была успешно создана</h2>
                        <br></br><br></br><br></br>
                        <button onClick={() => link.push('/requests')}>К заявкам</button>
                        
                    </div>
                    
                </div> : null
            }
        </Fragment>
    )
}
