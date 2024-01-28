import style from './driversForm.module.scss';
import {onChangeDefault} from "@/components/utils/formUtils";
import SectionInput from "@/app/requests/new/sectionInput/sectionInput";
import {useState} from "react";
import InputButton from "@/app/requests/new/inputButton/inputButton";

export default function DriversForm(props) {
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
            sectionLabel: "ФИО водителя",
            require: true,
            inputs: [
                {
                    name: "specialMarks",
                    type: "text",
                    placeholder: "Иванов Иван Иванович"
                }
            ]
        },
        {
            // ввод графика
            component: "section",
            sectionLabel: "График работы",
            require: true,
            inputs: [
                {
                    name: "tsNumber",
                    type: "text",
                    placeholder: "2 через 2"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Категория транспортного средства",
            require: true,
            inputs: [
                {
                    name: "typeCapacity",
                    type: "text",
                    placeholder: "Грузовой, пассажирский, грузопассажирский"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "Номер телефона",
            require: true,
            inputs: [
                {
                    name: "phoneNumber",
                    type: "tel",
                    placeholder: "+7 (999) 999-99-99"
                }
            ]
        },
        {
            component: "section",
            sectionLabel: "E-mail водителя",
            require: true,
            inputs: [
                {
                    name: "loadCapacity",
                    type: "email",
                    placeholder: ""
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