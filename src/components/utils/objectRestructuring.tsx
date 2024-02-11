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


export function ReverseObject(startObj) {
    let start = {
        "waypoints": [
            {
                "index": 0,
                "passengers": [
                    {
                        "index": 0,
                        "name": "11111111111111",
                        "contact": "+7 (222) 222-22-22",
                        "endIndex": "2"
                    },
                    {
                        "index": 1,
                        "name": "ннн ннн ннн",
                        "contact": "+7 (565) 656-56-56",
                        "endIndex": "2"
                    },
                    {
                        "index": 2,
                        "name": "",
                        "contact": ""
                    },
                    {
                        "index": 0,
                        "name": "2222222222",
                        "contact": "+7 (222) 222-22-22",
                        "endIndex": "2"
                    }
                ],
                "address": "Бийск, улица Антона Чехова, 1523",
                "date": "2024-02-15",
                "time": "21:18"
            },
            {
                "index": 1,
                "passengers": [
                    {
                        "index": 0,
                        "name": "11111111111111",
                        "contact": "+7 (222) 222-22-22",
                        "endIndex": "2"
                    },
                    {
                        "index": 1,
                        "name": "ннн ннн ннн",
                        "contact": "+7 (565) 656-56-56",
                        "endIndex": "2"
                    },
                    {
                        "index": 2,
                        "name": "",
                        "contact": ""
                    },
                    {
                        "index": 0,
                        "name": "2222222222",
                        "contact": "+7 (222) 222-22-22",
                        "endIndex": "2"
                    }
                ],
                "address": "Бийск, Каховская улица, 128"
            },
            {
                "index": 2,
                "passengers": [
                    {
                        "index": 0,
                        "name": "11111111111111",
                        "contact": "+7 (222) 222-22-22",
                        "endIndex": "2"
                    },
                    {
                        "index": 1,
                        "name": "ннн ннн ннн",
                        "contact": "+7 (565) 656-56-56",
                        "endIndex": "2"
                    },
                    {
                        "index": 2,
                        "name": "",
                        "contact": ""
                    },
                    {
                        "index": 0,
                        "name": "2222222222",
                        "contact": "+7 (222) 222-22-22",
                        "endIndex": "2"
                    }
                ],
                "address": "Рубцовск, улица Федоренко, 6"
            }
        ],
        "passengers": [
            {
                "index": 0,
                "name": "11111111111111",
                "contact": "+7 (222) 222-22-22",
                "endIndex": "2"
            },
            {
                "index": 1,
                "name": "ннн ннн ннн",
                "contact": "+7 (565) 656-56-56",
                "endIndex": "2"
            },
            {
                "index": 2,
                "name": "",
                "contact": ""
            },
            {
                "index": 0,
                "name": "2222222222",
                "contact": "+7 (222) 222-22-22",
                "endIndex": "2"
            }
        ],
        "cargo": [
            {
                "index": 0,
                "description": "велосипед",
                "weight": "12",
                "volume": "12",
                "endIndex": "1"
            },
            {
                "index": 1
            },
            {
                "index": 2
            }
        ],
        "department": "структура",
        "description": "коммент",
        "isSingle": false,
        "unit": "cargo"
    }

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
            start.cargo[i].index
            cargo.push(start.cargo[i])
        }
    }

    let result = {
        "clientId": "1",
        "isSingle": start.isSingle,
        "deadline": deadlineBool,
        "cargo": {
            "unit": start.unit,
            "numberOfPassengersInCar": 0,
            "amountOfCargoInCar": 0,
            "freights": cargo,
            "passengers": [
                "string"
            ],
            "department": start.department,
            "description": start.description
        },
    }

    return startObj;
}