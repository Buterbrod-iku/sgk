"use client";

import style from './form.module.scss'
import SectionInput from "./sectionInput/sectionInput";
import {useState} from "react";
import ButtonMenu from "./buttonMenu/buttonMenu";
import it from "node:test";

export default function Form() {
    const [people, setPeople] = useState([]);
    const [endPoint, setEndPoint] = useState([]);

    const onAddBtnClick = (e) => {
        e.preventDefault();
        setPeople(people.concat({block: <SectionInput text="Данные пассажира" key={performance.now()} need={true} input={inputPassenger} click={handleRemoveItem} close={true}/>, id: performance.now()}));
    };
    const handleRemoveItem = (id) => {
        setPeople(people.filter(item => item.id !== item.block.key));
    };

    const onAddPoint = (e) => {
        e.preventDefault();
        setEndPoint(endPoint.concat({block: <SectionInput text="Пункт назначения" dataTimeArray={dataTimeEnd} dataTime={true} need={true} input={["Адрес"]} key={performance.now()}  click={handleRemoveEndPoint} close={true}/>, id: performance.now()}));
    };
    const handleRemoveEndPoint = () => {
        setEndPoint(endPoint.filter(item => item.id !== item.block.key));
    };


    return (
        <form className={style.form}>
            <h3 className={style.title}>Составление заявки</h3>
            <SectionInput text="Структурное подразделение" need={true} input={["Название"]} />
            <SectionInput text="Приватная поездка" need={true} input={[]} checkbox={true}/>
            <SectionInput text="Подача авто" dataTimeArray={dataTimeStart} dataTime={true} need={true} input={["Адрес"]} />
            <SectionInput text="Пункт назначения" dataTimeArray={dataTimeEnd} dataTime={true} need={true} input={["Адрес"]}/>
            {
                endPoint.map(item => item.block)
            }
            <ButtonMenu text="+ Добавить пункт назначения" onClick={onAddPoint} color={{backgroundColor: "rgb(0, 120, 168)"}}/>
            <SectionInput text="Груз и пассажиры" need={true} input={inputCargo} />
            <SectionInput text="Данные пассажира" need={true} input={inputPassenger} />
            {
                people.map(item => item.block)
            }
            <ButtonMenu text="+ Добавить пассажира" onClick={onAddBtnClick} color={{backgroundColor: "rgb(0, 120, 168)"}}/>
            <SectionInput text="Дополнительная информация" need={true} input={[]} inputArea="Комментарий" textarea={true}/>

            <ButtonMenu text="Создать" onClick={onAddBtnClick} color={{backgroundColor: "rgb(0, 168, 77)"}}/>
        </form>
    )
}

// расширяем на валидацию инпутов для времени и даты
let dataTimeStart = [
    {
        text: "Дата подачи",
        check: true,
        placeholder: "дд/мм/гггг"
    },
    {
        text: "Время подачи",
        check: true,
        placeholder: "00:00"
    },
    {
        text: "Время ожидания",
        check: true,
        placeholder: "00:00"
    }
]

let dataTimeEnd = [
    {
        text: "Дата прибытия",
        check: false,
        placeholder: "дд/мм/гггг"
    },
    {
        text: "Время прибытия",
        check: false,
        placeholder: "00:00"
    },
    {
        text: "Время ожидания",
        check: false,
        placeholder: "00:00"
    }
]

let inputCargo = ["Бараж кг/м3", "Количество пассажиров"]
let inputPassenger = ["ФИО сотрудника", "Номер телефона"]

