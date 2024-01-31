import style from './history.module.scss';
import Table from "@/app/requests/table/table";

export default function Report() {
    return (
        <div className={style.main}>
            <div className={style.position}>
                <h3 className={style.title}>История заявок</h3>
            </div>

            <Table array={request} isLoading={false} history={true}/>
        </div>
    )
}

let request = [
    {
        "id": "65b9fe587ce6a63d60bebfe5",
        "orders": [
            {
                "id": "65b9e9187ce6a63d60bebfaf",
                "clientId": "1",
                "cargo": {
                    "unit": "good",
                    "count": 2,
                    "description": "велосипед",
                    "price": 100
                },
                "deadline": {
                    "noDeadline": true,
                    "beginDate": 0,
                    "endDate": 0
                },
                "waypoints": {
                    "points": [
                        {
                            "latitude": "55.023403",
                            "longitude": "82.900044",
                            "address": "Новосибирск, Дмитровский мост",
                            "pointType": "i",
                            "_id": "65b9e9187ce6a63d60bebfb0"
                        },
                        {
                            "latitude": "53.354615",
                            "longitude": "83.770137",
                            "address": "Барнаул, Дом под шпилем",
                            "pointType": "o",
                            "_id": "65b9e9187ce6a63d60bebfb1"
                        }
                    ]
                },
                "done": false,
                "isSingle": false,
                "distance": 229965.7,
                "duration": 12289.9
            }
        ],
        "waypoints": {
            "points": [
                {
                    "latitude": "55.023403",
                    "longitude": "82.900044",
                    "address": "Новосибирск, Дмитровский мост",
                    "pointType": "i",
                    "_id": "65b9e9187ce6a63d60bebfb0"
                },
                {
                    "latitude": "53.354615",
                    "longitude": "83.770137",
                    "address": "Барнаул, Дом под шпилем",
                    "pointType": "o",
                    "_id": "65b9e9187ce6a63d60bebfb1"
                }
            ]
        },
        "distance": 229965.7,
        "clients": [
            "1"
        ],
        "vanger": "Баринов Виктор Петрович",
        "time": {
            "noDeadline": true,
            "beginDate": 0,
            "endDate": 0
        },
        "totalPrice": 100
    },
    {
        "id": "65b9fe3d7ce6a63d60bebfde",
        "orders": [
            {
                "id": "65b9fe027ce6a63d60bebfd0",
                "clientId": "2",
                "cargo": {
                    "unit": "good",
                    "count": 10,
                    "description": "ноутбук",
                    "price": 110
                },
                "deadline": {
                    "noDeadline": true,
                    "beginDate": 0,
                    "endDate": 0
                },
                "waypoints": {
                    "points": [
                        {
                            "latitude": "54.763048",
                            "longitude": "83.112711",
                            "address": "Бердск, вокзал",
                            "pointType": "i",
                            "_id": "65b9fe027ce6a63d60bebfd1"
                        },
                        {
                            "latitude": "53.53111",
                            "longitude": "83.84017",
                            "address": "Казачий, остановка",
                            "pointType": "o",
                            "_id": "65b9fe027ce6a63d60bebfd2"
                        }
                    ]
                },
                "done": false,
                "isSingle": false,
                "distance": 157034.6,
                "duration": 8010.2
            }
        ],
        "waypoints": {
            "points": [
                {
                    "latitude": "54.763048",
                    "longitude": "83.112711",
                    "address": "Бердск, вокзал",
                    "pointType": "i",
                    "_id": "65b9fe027ce6a63d60bebfd1"
                },
                {
                    "latitude": "53.53111",
                    "longitude": "83.84017",
                    "address": "Казачий, остановка",
                    "pointType": "o",
                    "_id": "65b9fe027ce6a63d60bebfd2"
                }
            ]
        },
        "distance": 157034.6,
        "clients": [
            "2"
        ],
        "vanger": "Баринов Виктор Петрович",
        "time": {
            "noDeadline": true,
            "beginDate": 0,
            "endDate": 0
        },
        "totalPrice": 110
    }
]
