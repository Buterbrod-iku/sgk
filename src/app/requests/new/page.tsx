"use client";

import style from './new.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {use, useEffect, useState} from "react";
import InputButton from "./inputButton/inputButton";

export default function New() {
    // const [people, setPeople] = useState([]);
    // const [endPoint, setEndPoint] = useState([]);
    // const [keys, setKeys] = useState(0);

    const [values, setValues] = useState({
        // devisionName: "",
        // isPrivate: false,
        // carStartPoint: {
        //     address: "",
        //     startDateTime: 0,
        //     waiting: 0
        // },
        destinationPoints: {
            // {
            //     id: 0,
            //     address: "",
            //     startDateTime: 0,
            //     waiting: 0
            // },
        },
        // cargoWeight: 0,
        // passengersAmount: 0,
        passengersInfo: [
            // {
            //     id: 0,
            //     fullname: "",
            //     phoneNumber: ""
            // },
        ],
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
                    name: "isPrivate",
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
                    // name: "passengersInfo_fullName_1",
                    type: "text",
                    placeholder: "ФИО сотрудника"
                },
                {
                    // name: "passengersInfo_phoneNumber_1",
                    type: "tel",
                    placeholder: "Номер телефона"
                }
            ]
        }
    
       let idKey = "passenger_" + (passengers.length + 1);
       setPassengers([...passengers, <SectionInput key={idKey} id={idKey} closeHandler={closePassengerHandler} {...repObjStruct} onChange={onInputInSectionChange}/>])
    }
 
    function closePassengerHandler(e, id) {
        console.log("closed " + id);
        setPassengers(prevEndPoint => {
            return prevEndPoint.filter(item => {
                return item.key !== id
            });
        });
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

    

    // const onAddBtnClick = (e) => {
    //     e.preventDefault();
    //     setKeys(prevKeys => prevKeys + 1)
    //     setPeople([...people, {block: <SectionInput key={keys} text="Данные пассажира" id={keys} need={true} inputArray={inputPassenger} clickPeople={handleRemoveItem} close={true}/>, id: keys}]);
    // };
    // const handleRemoveItem = (event, id) => {
    //     setPeople(prevPeople => {
    //         return prevPeople.filter(item => item.id !== id);
    //     });
    // };
    // const onAddPoint = (e) => {
    //     e.preventDefault();
    //     setKeys(prevKeys => prevKeys + 1)
    //     setEndPoint(endPoint.concat({block: <SectionInput key={keys} text="Пункт назначения" dataTimeArray={dataTimeEnd} dataTime={true} need={true} clickEndPoint={handleRemoveEndPoint}  input={["Адрес"]} id={keys} close={true}/>, id: keys}));
    // };
    // const handleRemoveEndPoint = (event, id) => {
    //     setEndPoint(prevEndPoint => {
    //         return prevEndPoint.filter(item => item.id !== id);
    //     });
    // };

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


        // <form className={style.form}>
        //     <h3 className={style.title}>Составление заявки</h3>
        //     <SectionInput text="Структурное подразделение" need={true} input={["Название"]} />
        //     <SectionInput text="Приватная поездка" need={true} input={[]} checkbox={true}/>
        //     <SectionInput text="Место подачи авто" dataTimeArray={dataTimeStart} dataTime={true} need={true} input={["Адрес"]} />
        //     <SectionInput text="Пункт назначения" dataTimeArray={dataTimeEnd} dataTime={true} need={true} input={["Адрес"]}/>
        //     {
        //         endPoint.map(item => item.block)
        //     }
        //     <ButtonMenu text="+ Добавить пункт назначения" onClick={onAddPoint} color={{backgroundColor: "rgb(0, 120, 168)"}}/>
        //     <SectionInput text="Груз и пассажиры" need={true} inputArray={inputCargo} />
        //     <SectionInput text="Данные пассажира" need={true} inputArray={inputPassenger} />
        //     {
        //         people.map(item => item.block)
        //     }
        //     <ButtonMenu name="" text="+ Добавить пассажира" onClick={onAddBtnClick} color={{backgroundColor: "rgb(0, 120, 168)"}}/>
        //     <SectionInput text="Дополнительная информация" need={true} input={[]} inputArea="Комментарий" textarea={true}/>

        //     <ButtonMenu onClick={sendRequestHandler} text="Создать" color={{backgroundColor: "rgb(0, 168, 77)"}}/>
        // </form>
    )
}

// расширяем на валидацию инпутов для времени и даты
// let dataTimeStart = [
//     {
//         text: "Дата подачи",
//         check: true,
//         placeholder: "дд/мм/гггг",
//         type: "date"
//     },
//     {
//         text: "Время подачи",
//         check: true,
//         placeholder: "00:00",
//         type: "time"
//     },
//     {
//         text: "Время ожидания",
//         check: true,
//         placeholder: "00:00",
//         type: "time"
//     }
// ]

// let dataTimeEnd = [
//     {
//         text: "Дата прибытия",
//         check: false,
//         placeholder: "дд/мм/гггг",
//         type: "date"
//     },
//     {
//         text: "Время прибытия",
//         check: false,
//         placeholder: "00:00",
//         type: "time"
//     },
//     {
//         text: "Время ожидания",
//         check: false,
//         placeholder: "00:00",
//         type: "time"
//     }
// ]

// let inputCargo = [
//     {
//         text: "Багаж кг/м3",
//         type: "integer"
//     },
//     {
//         text: "Количество пассажиров",
//         type: "integer"
//     }  
// ]
// let inputPassenger = [
//     {
//         text: "ФИО сотрудника" 
//     },
//     {
//         text: "Номер телефона",
//         type: "tel"
//     }
// ]

