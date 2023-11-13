import {useFetching} from "@/app/hooks/useFetching";
import PostService from "@/app/API/postService";
import {ReversRoutePoint} from "@/app/requests/[id]/page";
import {useEffect} from "react";
import axios from "axios/index";

const pathAdaptive = (location) => {
    let path = []

    let arrayPath = location.split('/')

    switch (arrayPath[1]){
        case 'requests':
            path.push('Заявки')
            let id = ""

            if(arrayPath[2] === "new"){
                path.push('Создание заявки')
            }
            else if(arrayPath[2]?.length >= 6){
                // здесь будут города (Барнаул - Бийск)
            }
            break
        case 'staff':
            path.push('Автопарк')
            break
        case 'report':
            path.push('Отчёты')
            break
        case 'history':
            path.push("История")
            break
        case 'contactWithTC':
            path.push('Связь с ТК')
            break
        case 'signIn':
            path.push('Авторизация')
            break
        case 'drivers':
            path.push('Автопарк')
            path.push('Водители')

            if(arrayPath[2]?.length >= 6){
                // здесь будет фамилия водителя (Иванов) (по айди)
            }
            break
        case 'openDrivers':
            path.push('Автопарк')
            path.push('Водители')

            if(arrayPath[2]?.length >= 6){
                // здесь будет фамилия водителя (Иванов) (по айди)
            }
            break
        case 'fleet':
            path.push('Автопарк')
            path.push('Машины')

            if(arrayPath[2]?.length >= 6){
                // здесь будет марка автомобиля
            }
            break
        case 'openCar':
            path.push('Автопарк')
            path.push('Машины')

            if(arrayPath[2]?.length >= 6){
                // здесь будет фамилия водителя (Иванов) (по айди)
            }
            break
    }

    return path
}

export default pathAdaptive