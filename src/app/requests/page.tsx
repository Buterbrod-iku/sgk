'use client' // TODO: Изучить

import style from './request.module.scss'
import LineTable from "@/app/requests/lineTable/lineTable";
import {useEffect, useState} from "react";
import Link from "next/link";
import Pagination from "./pagination/pagination";
import axios from "axios";

// let array = [
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//     {
//         "route": {
//             "isSingle": true,
//         },
//         "orders": [
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696282080,
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Новосибирск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             },
//             {
//                 "date": {
//                     "loadingTime": 1696271100,
//                     "unloadingTime": 1696544940
//                 },
//                 "route": {
//                     "loadingAddress": {
//                         "address": "Барнаул",
//                     },
//                     "unloadingAddress": {
//                         "address": "Бийск",
//                     }
//                 },
//                 "order": {
//                     "typeOfTransportation": "all",
//                     "devisionName": "qweqweqweqwe",
//                 }
//             }
//         ]
//     },
//
// ]


const ReversDateTime = (dataTime) => {
    const dateTime = new Date(dataTime * 1000);

    return (dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()) + '.' + (dateTime.getUTCMonth() < 10 ? '0' + dateTime.getUTCMonth() : dateTime.getUTCMonth()) + '.' + dateTime.getUTCFullYear();
}

const ReversRoutePoint = (request) => {
    let result = request.orders[0].route.loadingAddress.address

    request.orders.map(item => (
        result += ' - ' + item.route.unloadingAddress.address
    ))

    return result
}

export default function Request() {
    // import data allRequest from server
    const [appState, setAppState] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/routes/complex/';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data;
            setAppState(allPersons);
        });
    }, [setAppState]);

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const perPage = 10

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    let current;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const prevPage = () => setCurrentPage(prev => prev <= 1 ? prev : prev - 1)
    const nextPage = () => setCurrentPage(prev => prev >= appState.length / perPage ? prev : prev + 1)
    const startPage = () => setCurrentPage(1)


    current = appState.slice(firstIndex, lastIndex)


    return (
        <div className={style.main}>
            <div className={style.position}>
                <h3 className={style.title}>Все заявки</h3>
                <Link href={"/requests/new"}><button className={style.button}>Создать заявку</button></Link>
            </div>
            <table className={style.table}>
                <thead>
                    <tr className={style.tr}>
                        <th>Дата</th>
                        <th>Структурное подразделение</th>
                        <th>Маршрут</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // index
                        current.map((item, index) => <LineTable key={index} requestID={item.route._id} date={ReversDateTime(item.orders[0].date.loadingTime)} name={item.orders[0].order.devisionName} path={ReversRoutePoint(item)} isSingle={item.route.isSingle}/>)
                    }
                </tbody>
            </table>
            {
                appState.length < perPage ? "" : <Pagination startPage={startPage} currentPage={currentPage} perPage={perPage} totalCount={appState.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage}/>
            }
        </div>
    )
}
