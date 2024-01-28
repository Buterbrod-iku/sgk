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
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1699162938
                },
                "order": {
                    "devisionName": "Подразделение А"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Кемерово"
                    },
                    "unloadingAddress": {
                        "address": "Бийск"
                    }
                }
            },
        ]
    },
    {
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1699422138
                },
                "order": {
                    "devisionName": "Подразделение А"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул"
                    }
                }
            },
        ]
    },
    {
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1696271100
                },
                "order": {
                    "devisionName": "Подразделение Б"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Рубцовск"
                    },
                    "unloadingAddress": {
                        "address": "Новоалтайск"
                    }
                }
            },
        ]
    },
    {
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1698554538
                },
                "order": {
                    "devisionName": "Подразделение В"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка"
                    },
                    "unloadingAddress": {
                        "address": "Новоалтайск"
                    }
                }
            },
            {
                "date": {
                    "loadingTime": 1698837798
                },
                "order": {
                    "devisionName": "Подразделение А"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Тальменка"
                    },
                    "unloadingAddress": {
                        "address": "Барнаул"
                    }
                }
            },
        ]
    },
    {
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1698981798
                },
                "order": {
                    "devisionName": "Подразделение А"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Новосибирск"
                    },
                    "unloadingAddress": {
                        "address": "Новосибирск"
                    }
                }
            },
        ]
    },
    {
        route: {
            "_id": "qasd4jcyd74hwbnc482",
            "isSingle": false
        },
        orders: [
            {
                "date": {
                    "loadingTime": 1698837798
                },
                "order": {
                    "devisionName": "Подразделение Г"
                },
                "route": {
                    "loadingAddress": {
                        "address": "Барнаул"
                    },
                    "unloadingAddress": {
                        "address": "Кемерово"
                    }
                }
            },
        ]
    },
]
