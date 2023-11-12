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
            "date": 1696204800,
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
                    "loadingTime": 1696271100,
                    "unloadingTime": 1696282080,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 65
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                    "unloadingAddress": {
                        "address": "Тальменка",
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
                    "loadingTime": 1696271100,
                    "unloadingTime": 1696544940,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 150
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул",
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
                    "unloadingTime": 1696544940,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 150
                },
                "route": {
                    "loadingAddress": {
                        "address": "Барнаул",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Бийск",
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
                    "loadingTime": 1696271100,
                    "unloadingTime": 1696282080,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 65
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                    "unloadingAddress": {
                        "address": "Тальменка",
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
                    "unloadingTime": 1696282080,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 65
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                    },
                    "unloadingAddress": {
                        "address": "Новоалтайск",
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
                    "unloadingTime": 1696544940,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 150
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новоалтайск",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул",
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
                    "unloadingTime": 1696544940,
                    "loadingWaiting": 20,
                    "unloadingWaiting": 150
                },
                "route": {
                    "loadingAddress": {
                        "address": "Барнаул",
                        "latitude": "83.354673",
                        "longitude": "54.37832",
                        "word": "koords"
                    },
                    "unloadingAddress": {
                        "address": "Бийск",
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
        ]
    }
}