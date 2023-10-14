import style from './carForm.module.scss';
import {onChangeDefault} from "@/app/requests/utils/formUtils";
import SectionInput from "@/app/requests/new/sectionInput/sectionInput";
import {useState} from "react";
import InputButton from "@/app/requests/new/inputButton/inputButton";

export default function CarForm(props) {
    const close = (e) => {
        e.preventDefault()
        props.setOpenForm(!props.openForm)
    }
    const [values, setValues] = useState({});

    async function submitHandler (e) {
        e.preventDefault();
        console.log('первая версия...');
        console.log(values);
    }

    const sectionsInputs = [
        {
            component: "section",
            sectionLabel: "Марка автомобиля",
            require: true,
            inputs: [
                {
                    name: "specialMarks",
                    type: "text",
                    placeholder: "Название"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Номер автомобиля",
            require: true,
            inputs: [
                {
                    name: "tsNumber",
                    type: "text",
                    placeholder: "а000аа"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Грузоподъемность и количество посадочных мест",
            require: true,
            inputs: [
                {
                    name: "loadCapacity",
                    type: "integer",
                    placeholder: "Грузоподъемность кг/м3"
                },
                {
                    name: "numberOfSeats",
                    type: "integer",
                    placeholder: "Количество посадочных мест"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Водитель",
            require: true,
            inputs: [
                {
                    name: "driver",
                    type: "text",
                    placeholder: "ФИО водителя"
                },
                {
                    name: "phoneDriver",
                    type: "tel",
                    placeholder: "Номер телефона"
                },
                {
                    name: "emailDriver",
                    type: "email",
                    placeholder: "E-mail водителя"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Цена за 1 километр",
            require: true,
            inputs: [
                {
                    name: "pricePerKm",
                    type: "integer",
                    placeholder: "Рубли"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Дополнительная информация",
            require: false,
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


    return (
        <div className={style.main}>
            <div className={style.block}>

                <button className={style.close} onClick={close} style={{zIndex: '99'}}>+</button>

                {
                    sectionsInputs.map((item, index) => {
                        if (item.component == "section") {
                            return <SectionInput key={`${index}`} id={index} {...item} onChange={(e) => onChangeDefault(e, values, setValues)}/>
                        }

                        // Кнопки (например добавление пункта назначения)
                        if (item.component == "input") {
                            return <InputButton key={`${index}`} id={index} color={{padding: "10px 0"}} {...item}/>
                        }
                    })
                }
            </div>
        </div>
    )
}