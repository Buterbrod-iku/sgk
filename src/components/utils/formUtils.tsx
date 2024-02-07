
// Заполняет объект значений полей при изменении (обычные инпуты)
export const onChangeDefault = (event, values, setFunc) => {
    // Обработка чекбокса
    if (event.target.type && event.target.type === 'checkbox') {
        let obj = values
        obj[event.target.name] = event.target.checked
        setFunc(obj)
        return;
    }

    if (event.target.type && event.target.type === 'section') {
        let obj = values
        obj[event.target.name] = event.target.value
        setFunc(obj)
        return;
    }

    // Обработка остальных стандартных инпутов
    let obj = values
    obj[event.target.name] = event.target.value
    setFunc(obj)
}

// Заполняет массив точек назначения / пассажиров в объекте значений полей при изменении (вложенные инпуты)
export const onListChange = (event, listName, setFunc) => {
    setFunc(prev => {
        return {...prev,
            [listName]: {...prev[listName],
                [event.target.getAttribute('data-section-id')]: {
                    ...prev[listName][event.target.getAttribute('data-section-id')],
                    [event.target.name]: event.target.value,
                },
            },
        }
    })
}

// Функция форматирования номера 
export function phoneFormatter(value) : string {
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
export function integerFormatter(value, prevValue) : string {
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