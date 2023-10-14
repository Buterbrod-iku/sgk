
// Заполняет объект значений полей при изменении (обычные инпуты)
export const onChangeDefault = (event, values, setFunc) => {
    // Обработка чекбокса
    if (event.target.type && event.target.type === 'checkbox') {
        setFunc({...values, [event.target.name]: event.target.checked});
        return;
    } 

    // Обработка остальных стандартных инпутов
    setFunc({...values, [event.target.name]: event.target.value})
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
