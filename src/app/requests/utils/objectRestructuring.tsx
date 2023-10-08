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
function ConvertToUnixTime(date: string, time: string = "") {
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

export const ObjectRestructuring = (firstObject) => {
    // let firstObject = {
    //     "destinationPoints": {
    //         "dist_1": {
    //             "destinationPoint_address": "г. Барнаул ул. шукшы 2",
    //             "destinationPoint_date": "2023-12-15",
    //             "destinationPoint_arriveTime": "11:34",
    //             "destinationPoint_waitingTime": "06:00"
    //         },
    //         "dist_2": {
    //             "destinationPoint_address": "г. Барнаул ул. шукшы 3",
    //             "destinationPoint_date": "2023-12-20",
    //             "destinationPoint_arriveTime": "12:13",
    //             "destinationPoint_waitingTime": "02:15"
    //         }
    //     },
    //     "passengersInfo": {
    //         "passenger_1": {
    //             "passengersInfo_fullName": "Кук ку кукс",
    //             "passengersInfo_phoneNumber": "+7 (123) 456-78-90"
    //         },
    //         "passenger_2": {
    //             "passengersInfo_fullName": "Кукс2 ку2 кс2",
    //             "passengersInfo_phoneNumber": "+7 (132) 131-45-14"
    //         },
    //         "passenger_3": {
    //             "passengersInfo_fullName": "ка3 аап3 аа3",
    //             "passengersInfo_phoneNumber": "+7 (546) 456-45-66"
    //         }
    //     },
    //     "isSingle": true,
    //     "devisionName": "Подр 1",
    //     "carStartPoint_address": "г. Барнаул ул. шукшы",
    //     "carStartPoint_date": "2023-12-13",
    //     "carStartPoint_arriveTime": "09:11",
    //     "carStartPoint_waitingTime": "00:05",
    //     "cargoWeight": "5",
    //     "passengersAmount": "3",
    //     "comment": "ничего необычного"
    // };

    let patternObject = {};
    let ordersArray = [];
    let passengers = [];

    patternObject["route"] = {
        "route": {},
        "car": {
            "tsNumber": "a123bc",
            "specialMarks": "Lada Vesta",
            "driver": "Ivanov Ivan Ivanovich",
            "loadCapacity": 510,
            "numberOfSeats": 4
        },
        "date": ConvertToUnixTime(firstObject.carStartPoint_date), // unix
        "isSingle": firstObject.isSingle,
        "cargoInRoute": firstObject.cargoWeight,
        "passengersInRoute": firstObject.passengersAmount,
        "comment": firstObject.comment
    };

    for (let passenger in firstObject.passengersInfo){
        passengers.push({
            "fullName": firstObject.passengersInfo[passenger].passengersInfo_fullName,
            "phoneNumber": ReformatPhoneNumber(firstObject.passengersInfo[passenger].passengersInfo_phoneNumber)
        });
    }


    for (let item in firstObject.destinationPoints){
        console.log(firstObject.destinationPoints);
        let addOrdersObject = {
            "date": {
                "loadingTime": ConvertToUnixTime(firstObject.carStartPoint_date, firstObject.carStartPoint_arriveTime), // start
                "unloadingTime" : ConvertToUnixTime(firstObject.destinationPoints[item].destinationPoint_date, firstObject.destinationPoints[item].destinationPoint_arriveTime), // unix; end
                "loadingWaiting": TransformationWaitingTime(firstObject.carStartPoint_waitingTime), // 60 - 1ч
                "unloadingWaiting": TransformationWaitingTime(firstObject.destinationPoints[item].destinationPoint_waitingTime)// 60 - 1ч
            },
            "route": {
                "loadingAddress": {
                    "address": firstObject.carStartPoint_address,
                    "latitude": firstObject.carStartPoint_coords.lat, // geocoder!! || word
                    "longitude": firstObject.carStartPoint_coords.long, // geocoder!! || word
                    "word": "" // ---
                },
                "unloadingAddress": {
                    "address": firstObject.destinationPoints[item].destinationPoint_address,
                    "latitude": firstObject.destinationPoints[item].Coords.lat,
                    "longitude": firstObject.destinationPoints[item].Coords.long, // либо ворд либо это
                    "word": ""
                },
            },
            "order": {
                "typeOfTransportation": TypeOfTransportation(firstObject.cargoWeight, firstObject.passengersAmount), // либо пассажрыгруз
                "devisionName": firstObject.devisionName,
                "client": "Сотрудник Петров",
                "passengers": passengers
            }
        };

        ordersArray.push(addOrdersObject);
    }

    patternObject['orders'] = ordersArray;

    return patternObject;
}