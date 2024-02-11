import {XMLParser} from "fast-xml-parser";
import getCoordsByAddress from "@/app/API/geocoder";

const TransformationWaitingTime = (waiting: string) => {
    if (!(/^\d{2}:\d{2}$/.test(waiting))) return -1;

    let splitArray = waiting.split(":");
    return (Number(splitArray[0]) * 60) + Number(splitArray[1])
}

const TypeOfTransportation = (cargoWeight: string, passengersAmount: string) => {
    if((Number(cargoWeight) > 0) && (Number(passengersAmount) > 0)){
        return "all";
    }
    else if((Number(cargoWeight) === 0) && (Number(passengersAmount) === 0)){
        return "empty";
    }
    else if((Number(cargoWeight) === 0) && (Number(passengersAmount) > 0)){
        return "passengers";
    }
    else if((Number(cargoWeight) > 0) && (Number(passengersAmount) === 0)){
        return "cargo";
    }
    else{
        return "error";
    }
}

// Функция преобразования строк <дата> / <дата> <временя> формата <yyyy-mm-dd> <hh:mm> в Unix Timestamp (в секундах)
// Если <time> существует, но не имеет формат hh:mm, то функция вернёт значение -1
export function ConvertToUnixTime(date: string, time: string = "") {
    let unixTime:number = Math.floor(new Date(date).getTime() / 1000);
    if (time != "") {
        // Проверка формата hh:mm
        if (!(/^\d{2}:\d{2}$/.test(time))) return -1;

        let hh = parseInt(time.split(':')[0]);
        let mm = parseInt(time.split(':')[1]);
        unixTime += mm * 60 + hh * 60 * 60;
    }

    return unixTime;
}

function ReformatPhoneNumber(formattedPhone: string) {
    if (!(/^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedPhone))) return -1;

    return formattedPhone.slice(0,2) + formattedPhone.slice(4,7) + formattedPhone.slice(9,12) + formattedPhone.slice(13,15) + formattedPhone.slice(16,18);
}


export async function ReverseObject(start) {
    let end = {
        "clientId": "1",
        "cargo": {
            "unit": "human",
            "numberOfPassengersInCar": 0,
            "amountOfCargoInCar": 0,
            "passengers": [
                "string"
            ],
            "department": "string",
            "description": "string"
        },
        "deadline": {
            "noDeadline": false,
            "beginDate": 0,
            "endDate": 0
        },
        "waypoints": {
            "points": [
                {
                    "address": "string",
                    "latitude": 0,
                    "longitude": 0,
                    "pointType": "n"
                }
            ],
            "times": [
                0
            ]
        },
        "isSingle": true
    }


    let deadlineBool = {
        "noDeadline": false,
        "beginDate": 0,
        "endDate": 0
    }

    if(start.waypoints[0]?.check){
        deadlineBool["noDeadline"] = true
        deadlineBool["beginDate"] = 0
        deadlineBool["endDate"] = 0
    } else {
        let startDate = ConvertToUnixTime(start.waypoints[0]?.date, start.waypoints[0]?.time)
        deadlineBool["noDeadline"] = false
        deadlineBool["beginDate"] = startDate
        deadlineBool["endDate"] = startDate + 86400
    }

    let cargo = []

    for (let i = 0; i < start.cargo.length; i++){
        if(Object.hasOwn(start.cargo[i], 'description')){
            let obj = {
                "startIndex": start.cargo[i].index,
                "description": start.cargo[i].description,
                "weight": start.cargo[i].weight,
                "volume": start.cargo[i].volume,
                "endIndex": Number(start.cargo[i].endIndex)
            }
            cargo.push(obj)
        }
    }

    let pass = []

    for (let i = 0; i < start.passengers.length; i++){
        if(Object.hasOwn(start.passengers[i], 'name') && !isNaN(start.passengers[i].endIndex)){
            let obj = {
                "startIndex": start.passengers[i].index,
                "name": start.passengers[i].name,
                "contact": start.passengers[i].contact,
                "endIndex": Number(start.passengers[i].endIndex)
            }
            pass.push(obj)
        }
    }

    const parser = new XMLParser();

    let points = []

    for (let i = 0; i < start.waypoints.length; i++){
        let lon
        if(Object.hasOwn(start.waypoints[i], 'address')){
            lon = await getCoordsByAddress(start.waypoints[i].address, parser)
            let obj = {
                "address": start.waypoints[i].address,
                "latitude": lon.lats,
                "longitude": lon.long,
                "city": lon.city,
                "pointType": "n"
            }
            points.push(obj)
        }
    }

    for (let i = 0; i < points.length; i++){
        let load = 0
        let unload = 0
        for (let j = 0; j < pass.length; j++){
            if(pass[j].startIndex === i){
                load++
            }

            if(pass[j].endIndex === i){
                unload++
            }
        }

        for (let k = 0; k < cargo.length; k++){
            if(cargo[k].startIndex === i){
                load++
            }

            if(cargo[k].endIndex === i){
                unload++
            }
        }

        if(load > 0 && unload > 0){
            points[i].pointType = "b"
        }
        else if(load > 0 && unload === 0){
            points[i].pointType = "i"
        }
        else if(load === 0 && unload > 0){
            points[i].pointType = "0"
        }
        else {
            points[i].pointType = "n"
        }
    }


    let result = {
        "clientId": "1",
        "isSingle": start.isSingle,
        "deadline": deadlineBool,
        "cargo": {
            "unit": start.unit,
            "numberOfPassengersInCar": pass.length,
            "amountOfCargoInCar": cargo.length,
            "freights": cargo,
            "passengers": pass,
            "department": start.department,
            "description": start.description
        },
        "waypoints": {
            "points": points
        }
    }

    return result;
}