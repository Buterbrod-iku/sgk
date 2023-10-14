export const Change = (object) => {
    let a = {
        "route": {
            "date": 1697328000,
            "cargoInRoute": 2,
            "passengersInRoute": 1,
            "comment": "qwqeqweqweqweqweqweqwe",
        },
        "orders": [
            {
                "date": {
                    "loadingTime": 1697368800,
                    "unloadingTime": 1697415000,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 30,
                },
                "route": {
                    "loadingAddress": {
                        "address": "г. Барнаул, Телефонная улица, 46",
                        "latitude": "53.354514",
                        "longitude": "83.731563",
                    },
                    "unloadingAddress": {
                        "address": "Тальменка, переулок Щетинкина, 3",
                        "latitude": "53.812417",
                        "longitude": "83.577529",
                    }
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "Структура 3",
                    "client": "Сотрудник Петров",
                    "passengers": [
                        {
                            "fullName": "qweqwe qweqw qwe",
                            "phoneNumber": "+72222222222",
                            "_id": "652a6ebb7c98ce042a9f7e35"
                        }
                    ]
                },
            }
        ]
    }

    for (let key in a){

    }
}