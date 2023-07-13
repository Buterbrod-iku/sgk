"use client";

import style from './form.module.scss';
import SectionInput from "./sectionInput/sectionInput";
import {useState} from "react";
import ButtonMenu from "./buttonMenu/buttonMenu";

export default function Form() {
    const [people, setPeople] = useState([]);
    const [endPoint, setEndPoint] = useState([]);
    const [keys, setKeys] = useState(0);

    const onAddBtnClick = (e) => {
        e.preventDefault();
        setKeys(prevKeys => prevKeys + 1)
        setPeople([...people, {block: <SectionInput key={keys} text="Данные пассажира" id={keys} need={true} inputArray={inputPassenger} clickPeople={handleRemoveItem} close={true}/>, id: keys}]);
    };
    const handleRemoveItem = (event, id) => {
        setPeople(prevPeople => {
            return prevPeople.filter(item => item.id !== id);
        });
    };
    const onAddPoint = (e) => {
        e.preventDefault();
        setKeys(prevKeys => prevKeys + 1)
        setEndPoint(endPoint.concat({block: <SectionInput key={keys} text="Пункт назначения" dataTimeArray={dataTimeEnd} dataTime={true} need={true} clickEndPoint={handleRemoveEndPoint}  input={["Адрес"]} id={keys} close={true}/>, id: keys}));
    };
    const handleRemoveEndPoint = (event, id) => {
        setEndPoint(prevEndPoint => {
            return prevEndPoint.filter(item => item.id !== id);
        });
    };


    // Обработка сбора, проверки и отправки заявки на сервер
    const sendRequestHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target.parrentElement);
        console.log(data);

        
    }

    return (
        <form className={style.form}>
            <h3 className={style.title}>Составление заявки</h3>
            <SectionInput text="Структурное подразделение" need={true} input={["Название"]} />
            <SectionInput text="Приватная поездка" need={true} input={[]} checkbox={true}/>
            <SectionInput text="Место подачи авто" dataTimeArray={dataTimeStart} dataTime={true} need={true} input={["Адрес"]} />
            <SectionInput text="Пункт назначения" dataTimeArray={dataTimeEnd} dataTime={true} need={true} input={["Адрес"]}/>
            {
                endPoint.map(item => item.block)
            }
            <ButtonMenu text="+ Добавить пункт назначения" onClick={onAddPoint} color={{backgroundColor: "rgb(0, 120, 168)"}}/>
            <SectionInput text="Груз и пассажиры" need={true} inputArray={inputCargo} />
            <SectionInput text="Данные пассажира" need={true} inputArray={inputPassenger} />
            {
                people.map(item => item.block)
            }
            <ButtonMenu name="" text="+ Добавить пассажира" onClick={onAddBtnClick} color={{backgroundColor: "rgb(0, 120, 168)"}}/>
            <SectionInput text="Дополнительная информация" need={true} input={[]} inputArea="Комментарий" textarea={true}/>

            <ButtonMenu onClick={sendRequestHandler} text="Создать" color={{backgroundColor: "rgb(0, 168, 77)"}}/>
        </form>
    )
}

// расширяем на валидацию инпутов для времени и даты
let dataTimeStart = [
    {
        text: "Дата подачи",
        check: true,
        placeholder: "дд/мм/гггг",
        type: "date"
    },
    {
        text: "Время подачи",
        check: true,
        placeholder: "00:00",
        type: "time"
    },
    {
        text: "Время ожидания",
        check: true,
        placeholder: "00:00",
        type: "time"
    }
]

let dataTimeEnd = [
    {
        text: "Дата прибытия",
        check: false,
        placeholder: "дд/мм/гггг",
        type: "date"
    },
    {
        text: "Время прибытия",
        check: false,
        placeholder: "00:00",
        type: "time"
    },
    {
        text: "Время ожидания",
        check: false,
        placeholder: "00:00",
        type: "time"
    }
]

let inputCargo = [
    {
        text: "Багаж кг/м3",
        type: "integer"
    },
    {
        text: "Количество пассажиров" 
    }  
]
let inputPassenger = [
    {
        text: "ФИО сотрудника" 
    },
    {
        text: "Номер телефона",
        type: "tel"
    }
]

