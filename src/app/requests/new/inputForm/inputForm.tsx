import { useState, useEffect } from 'react';
import style from './inputForm.module.scss'

export default function InputForm(props) {
    // Вспомогательный стейт для обработки телефонного номера / чисел
    const [inputValue, setInputValue] = useState("");
    const [event, setEvent] = useState("");

    const additionalProps = {
        // style: { backgroundColor: 'black'}
    };

    // При необходимости добавление атрибутов обработки форматирования к элементам
    if (["tel","integer"].includes(props.type)) {
        additionalProps['onChange'] = function(e) {
            setEvent(e);

            if (props.type == "tel") {
                setInputValue(phoneFormatter(e.target.value, inputValue));
            } else if (props.type == "integer") {
                setInputValue(integerFormatter(e.target.value, inputValue));
            }
        }
        additionalProps['value'] = inputValue;
    } else {
        additionalProps['onChange'] = props.onChange;
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
            <input value={props.value} {...additionalProps} data-section-id={`${props.dataSectionID}`} name={props.name} id={props.forID} type={props.type ? props.type : "text"} className={style.input} placeholder={props.placeholder} style={props.styles}/>
        </>
    )
}

// Функция форматирования номера 
function phoneFormatter(value, prevValue) : string {
    if (!value) return value;
    
    if (value.length == 1) {
        if (value == '+') {
            return "+";
        } else if (value == '7')  {
            return "+7";
        } else if ((value >= 0 && value < 7) || (value > 7 && value <= 9)){
            return "+7" + value;
        }
    }
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneLength = phoneNumber.length;

    if (phoneLength < 2) return `+${phoneNumber}`;
    if (phoneLength < 5) return `+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1)}`;
    if (phoneLength < 8) return `+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1,4)}) ${phoneNumber.slice(4,7)}`;
    if (phoneLength < 10) return `+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1,4)}) ${phoneNumber.slice(4,7)}-${phoneNumber.slice(7,9)}`;
    return `+${phoneNumber.slice(0,1)} (${phoneNumber.slice(1,4)}) ${phoneNumber.slice(4,7)}-${phoneNumber.slice(7,9)}-${phoneNumber.slice(9,11)}`;
}

// Функция форматирования вещественных чисел
function integerFormatter(value, prevValue) : string {
    if (!value) return value;
    
    if (['.', ','].includes(value[0])) {
        return prevValue;
    }

    const newValue = value.replace(/[^\d,.]/g, '');
    
    // Проверка на попытку ввода второй точки или запятой
    let pointsCounter = 0;
    for (var i = 0; i < newValue.length; i++) {
        if (['.', ','].includes(newValue[i])) {
            pointsCounter++;
        };
    } 
    if (pointsCounter > 1) return prevValue; 

    return newValue;
}