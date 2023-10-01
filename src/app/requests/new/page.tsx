"use client";

import style from './new.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {use, useEffect, useState} from "react";
import InputButton from "./inputButton/inputButton";

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
            component: "section",
            sectionLabel: "Груз и пассажиры",
            require: true,
            inputs: [
                {
                    name: "cargoWeight",
                    type: "integer",
                    placeholder: "Багаж кг/м3"
                },
                {
                    name: "passengersAmount",
                    type: "integer",
                    placeholder: "Количество пассажиров"
                }
            ]
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
        setDistPoints([...distPoints, <SectionInput key={idKey} id={idKey} closeHandler={closeDistHandler} {...repObjStruct} onChange={onInputInSectionChange}/>])
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
                }
            ]
        }
    
       let idKey = "passenger_" + (passengers.length + 1);
       setPassengers([...passengers, <SectionInput key={idKey} id={idKey} closeHandler={closePassengerHandler} {...repObjStruct} onChange={onInputPassengerInSectionChange}/>])
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
    
    
    function addDistPassengerHandler (e) {
        console.log('passenger added');
    }

    function submitHandler (e) {
        e.preventDefault();
        console.log('sending data...');
        console.log(values);
    }
    
    // Заполняет объект значений полей при изменении (обычные инпуты)
    const onInputChange = (e) => {
        // Обработка чекбокса
        if (e.target.type && e.target.type === 'checkbox') {
            setValues({...values, [e.target.name]: e.target.checked});
            return;
        } 

        // Обработка остальных стандартных инпутов
        setValues({...values, [e.target.name]: e.target.value})
    }

    // 
    const [distValues, setDistValues] = useState([
        
    ]);

    // Заполняет массив точек назначения / пассажиров в объекте значений полей при изменении (вложенные инпуты)
    const onInputInSectionChange = (e) => {


        // Обновляет объект destinationPoints, создавая или дополняя внутренний
        // объект с названием очередной секции (по атрибуту section-id)
        setValues(prev => {
            return {...prev,
                "destinationPoints": {...prev.destinationPoints,
                    [e.target.getAttribute('data-section-id')]: {
                        ...prev.destinationPoints[e.target.getAttribute('data-section-id')],
                        [e.target.name]: e.target.value,
                    },
                },
            }
        })
    }

    // Дублирует предыдущую функцию для пассажиров (TODO: объединить в одну функцию)
    const onInputPassengerInSectionChange = (e) => {


        // Обновляет объект passengersInfo, создавая или дополняя внутренний
        // объект с названием очередной секции (по атрибуту section-id)
        setValues(prev => {
            return {...prev,
                "passengersInfo": {...prev.passengersInfo,
                    [e.target.getAttribute('data-section-id')]: {
                        ...prev.passengersInfo[e.target.getAttribute('data-section-id')],
                        [e.target.name]: e.target.value,
                    },
                },
            }
        })
    }

    





    // console.clear();
    console.log(values);


    return (
        <form className={style.form}>
            <h3 className={style.title}>Составление заявки</h3>
            {
                sectionsInputs.map((item, index) => {
                    if (item.component == "section") {
                        return <SectionInput key={`${index}`} id={index} {...item} onChange={onInputChange}/>
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
                })
            }
        </form>
    )
}
