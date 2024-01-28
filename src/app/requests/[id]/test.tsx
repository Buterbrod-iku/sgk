export const testRequest = () => {
    return {
        "route": {
            "car": {
                "tsNumber": "В123УС",
                "specialMarks": "Lada Vesta",
                "driver": "Ivanov Ivan Ivanovich",
                "phone": "+7 (909) 900-20-20",
                "email": "ivanov74@mail.ru",
                "type": "Пассажирская",
                "loadCapacity": 510,
                "numberOfSeats": 4
            },
            "date": 1700046660,
            "isPrivate": true,
            "isSingle": false,
            "cargoInRoute": "100",
            "passengersInRoute": "3",
            "comment": "что-то написано"
        },
        "orders": [
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1700046660,
                    "unloadingTime": 1700058600,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 30
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск, улица Сибиряков-Гвардейцев, 34",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                    "unloadingAddress": {
                        "address": "Тальменка, Озёрная улица, 7А",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "Подразделение А 123123",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "nameCargo": "Стекло",
                            "weightCargo": 43,
                            "volumeCargo": 11
                        },
                        {
                            "nameCargo": "Папка с документами",
                            "weightCargo": 15,
                            "volumeCargo": 44
                        },
                        {
                            "nameCargo": "Экипировка",
                            "weightCargo": 42,
                            "volumeCargo": 76
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Степанов Максим Арсентьевич",
                            "phoneNumber": "+7 (923) 542-55-23"
                        },
                        {
                            "fullName": "Кузнецов Матвей Мирославович",
                            "phoneNumber": "+7 (845) 123-44-00"
                        },
                        {
                            "fullName": "Соловьев Ярослав Платонович",
                            "phoneNumber": "+7 (894) 765-87-33"
                        },
                    ]
                }
            },
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1700055000,
                    "unloadingTime": 1700069400,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 20
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка, Озёрная улица, 7А",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул, Телефонная улица, 46",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "distance": "5234"
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "qweqweqweqwe",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "weightCargo": 23,
                            "volumeCargo": 11
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165"
                        },
                    ]
                }
            },
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1696271100,
                    "unloadingTime": 1700074800,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 20
                },
                "route": {
                    "loadingAddress": {
                        "address": "Барнаул, Телефонная улица, 46",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Бийск, Каховская улица, 128",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "distance": "5234"
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "qweqweqweqwe 312312",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "weightCargo": 23,
                            "volumeCargo": 11
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165"
                        },
                        {
                            "fullName": "Антон",
                            "phoneNumber": "+72222222222"
                        }
                    ]
                }
            },
        ]
    }
}

export const testRequestMerged = () => {
    return {
        "route": {
            "car": {
                "tsNumber": "В123УС",
                "specialMarks": "Lada Vesta",
                "driver": "Ivanov Ivan Ivanovich",
                "phone": "+7 (909) 900-20-20",
                "email": "ivanov74@mail.ru",
                "type": "Пассажирская",
                "loadCapacity": 510,
                "numberOfSeats": 4
            },
            "date": 1696204800,
            "isPrivate": true,
            "isSingle": false,
            "isSingleNEW": true,
            "cargoInRoute": "100",
            "passengersInRoute": "3",
            "comment": "что-то написано"
        },
        "orders": [
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1700046660,
                    "unloadingTime": 1700058600,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 20
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск, улица Сибиряков-Гвардейцев, 34",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                    "unloadingAddress": {
                        "address": "Тальменка, Озёрная улица, 7А",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "Подразделение А 123",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "nameCargo": "Стекло",
                            "weightCargo": 43,
                            "volumeCargo": 11
                        },
                        {
                            "nameCargo": "Папка с документами",
                            "weightCargo": 15,
                            "volumeCargo": 44
                        },
                        {
                            "nameCargo": "Экипировка",
                            "weightCargo": 42,
                            "volumeCargo": 76
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Степанов Максим Арсентьевич",
                            "phoneNumber": "+7 (923) 542-55-23"
                        },
                        {
                            "fullName": "Кузнецов Матвей Мирославович",
                            "phoneNumber": "+7 (845) 123-44-00"
                        },
                        {
                            "fullName": "Соловьев Ярослав Платонович",
                            "phoneNumber": "+7 (894) 765-87-33"
                        },
                        {
                            "fullName": "Некрасов Лев Матвеевич",
                            "phoneNumber": "+7 (345) 655-44-33"
                        },
                        {
                            "fullName": "Комаров Вячеслав Фёдорович",
                            "phoneNumber": "+7 (346) 477-31-56"
                        }
                    ]
                }
            },
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1696271100,
                    "unloadingTime": 1700061000,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 30
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка, Озёрная улица, 7А",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                    "unloadingAddress": {
                        "address": "Тальменка, улица Кирова, 82",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "Структура структура",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "nameCargo": "Стекло",
                            "weightCargo": 43,
                            "volumeCargo": 11
                        },
                        {
                            "nameCargo": "Папка с документами",
                            "weightCargo": 15,
                            "volumeCargo": 44
                        },
                        {
                            "nameCargo": "Экипировка",
                            "weightCargo": 42,
                            "volumeCargo": 76
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165"
                        },
                        {
                            "fullName": "Антон",
                            "phoneNumber": "+72222222222"
                        }
                    ]
                }
            },
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1696271100,
                    "unloadingTime": 1700069400,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 30
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка, улица Кирова, 82",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Новоалтайск, Добрынинская улица, 70",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "distance": "5234"
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "qweqweqweqwe",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "weightCargo": 23,
                            "volumeCargo": 11
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165"
                        },
                    ]
                }
            },
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1696271100,
                    "unloadingTime": 1700073600,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 20
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новоалтайск, Добрынинская улица, 70",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул, Телефонная улица, 46",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "distance": "5234"
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "qweqweqweqwe",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "weightCargo": 23,
                            "volumeCargo": 11
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165"
                        },
                        {
                            "fullName": "Антон",
                            "phoneNumber": "+72222222222"
                        }
                    ]
                }
            },
            {
                "date": {
                    "createdAt": 1695263542,
                    "loadingTime": 1696271100,
                    "unloadingTime": 1700104800,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 30
                },
                "route": {
                    "loadingAddress": {
                        "address": "Барнаул, Телефонная улица, 46",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Бийск, Каховская улица, 128",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "distance": "5234"
                },
                "order": {
                    "typeOfTransportation": "all",
                    "devisionName": "qweqweqweqwe фывфывфывфы",
                    "client": "Сотрудник Петров",
                    "cargo": [
                        {
                            "weightCargo": 23,
                            "volumeCargo": 11
                        }
                    ],
                    "passengers": [
                        {
                            "fullName": "Мелков Илья",
                            "phoneNumber": "+79095079956"
                        },
                        {
                            "fullName": "Никита",
                            "phoneNumber": "+72322322165"
                        },
                    ]
                }
            },
        ]
    }
}

export const NewStructure = () => {
    return {
        "id": "65b2a1f8064bc7fb7e32d512",
        "clientId": "5",
        "cargo": {
            "unit": "good",
            "count": 58,
            "passengers": [
                {
                    "fullName": "Мелков Илья",
                    "phoneNumber": "+79095079956",
                    "start": "//address",
                    "end": "//address",
                },
                {
                    "fullName": "Никита",
                    "phoneNumber": "+72322322165",
                    "start": "//address",
                    "end": "//address",
                },
                {
                    "fullName": "Антон",
                    "phoneNumber": "+72222222222",
                    "start": "//address",
                    "end": "//address",
                }
            ],
            "cargoArray": [
                {
                    "type": "Мелков Илья",
                    "phoneNumber": "+79095079956",
                    "start": "//address",
                    "end": "//address",
                }
            ]
        },
        "deadline": {
            "noDeadline": false,
            "beginDate": 1700046660,
            "endDate": 1700058600
        },
        "waypoints": {
            "devisionName": "qweqweqweqwe",
            "points": [
                {
                    "address": "Барнаул",
                    "latitude": "55.6715707",
                    "longitude": "84.388557",
                    "_id": "65b2a1f8064bc7fb7e32d513"
                },
                {
                    "address": "Новосибирск",
                    "latitude": "53.3475493",
                    "longitude": "83.7788448",
                    "_id": "65b2a1f8064bc7fb7e32d514"
                }
            ]
        },
        "distance": 360495.9,
        "duration": 19195.7
    };
}