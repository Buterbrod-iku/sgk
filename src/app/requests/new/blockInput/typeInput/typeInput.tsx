import style from './typeInput.module.scss'
import {useEffect, useState} from "react";
import {integerFormatter, phoneFormatter} from "@/components/utils/formUtils";

export function TextArea(props) {
    return (
        <>
            <textarea placeholder={props.placeholder} className={style.textarea} onChange={props.onChange} name={props.name}/>
        </>
    )
}

export function Checkbox(props) {
    return (
        <>
            <input type="checkbox" className={style.checkbox} onChange={props.onChange} name={props.name}/>
        </>
    )
}

export function Select(props) {
    return (
        <>
            <select className={style.select} onChange={props.onChange} name={props.name}>
                <option disabled selected hidden>{props.placeholder}</option>

                {
                    props.selectArray.map((item) =>
                            <option key={item} value={item}>{item}</option>
                       )
                }
            </select>
        </>
    )
}

export function DefaultInput(props) {
    // Вспомогательный стейт для обработки телефонного номера / чисел
    const [inputValue, setInputValue] = useState("");
    const [event, setEvent] = useState("");


    const [firstCreated, setFirstCreated] = useState(true); // необходимо, чтобы однократно задать стандартное значение инпуту в том случае, если есть props.value

    const additionalProps = {
        // style: { backgroundColor: 'black'}
    };

    // При необходимости добавление атрибутов обработки форматирования к элементам
    if (["tel","integer"].includes(props.type)) {
        additionalProps['onChange'] = function(e) {
            setEvent(e);

            if (props.type == "tel") {
                setInputValue(phoneFormatter(e.target.value));
            } else if (props.type == "integer") {
                setInputValue(integerFormatter(e.target.value, inputValue));
            }
        }

        if (firstCreated) { // задание стандартного значения инпуту при первой запуске
            if (props.type == "tel") {
                setInputValue(phoneFormatter(props.value));
            }
            if (props.type == "integer") {
                console.log(props.value, inputValue);
                setInputValue(integerFormatter(String(props.value), inputValue));
            }
            setFirstCreated(false);
        } else {
            additionalProps['value'] = inputValue;
        }
    } else {
        additionalProps['onChange'] = props.onChange;
        additionalProps['defaultValue'] = props.value;
    }

    // Добавляет ограничение для поля date
    if (props.type == "date" && props.max) additionalProps['max'] = props.max;

    // Данный useEffect необходим для активация внешнего onChange только после форматирования текста в поле
    // Очень нужно для того, чтобы присылать в формирующий форму values актуальную информацию
    useEffect(() => {
        if (event && props.onChange) { // должно позволить накидывать onChange извне и запускать после форматирования
            props.onChange(event);
        }
    }, [inputValue, event]);

    return (
        <>
            <input {...additionalProps} data-section-id={`${props.dataSectionID}`} name={props.name} id={props.forID} type={props.type ? props.type : "text"} className={style.defaultInput} placeholder={props.placeholder}/>
        </>
    )
}