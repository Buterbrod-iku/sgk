import style from './pageBlock.module.scss'
import {useState} from "react";
import {RoutePointContent} from "@/app/requests/new/pageBlock/routePointContent/routePointContent";
import PageBlockForPass from "@/app/requests/new/pageBlock/PageBlockForPass/PageBlockForPass";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import PageBlockForCargo from "@/app/requests/new/pageBlock/PageBlockForCargo/PageBlockForCargo";

export default function PageBlock(props) {
    const [page, setPage] = useState(0);
    const [buttonArray, setButtonArray] = useState([
        {
            index: 1,
            name: "Пункт подачи"
        },
        {
            index: 2,
            name: "Пункт назначения № 1"
        },
        {
            index: 3,
            name: "Пункт назначения № 2"
        },
    ]);

    const switchHandler = (e, index) => {
        e.preventDefault()
        setPage(index)
    }

    const addPage = (e, array) => {
        e.preventDefault()
        let obj = {
            index: 1,
            name: `Пункт назначения ${array.length + 1}`
        }
        setButtonArray(oldArray => [...oldArray, obj])
    }


    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <button onClick={() => switchHandler(event, index)} style={index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            {item.name}
                        </button>
                    ))
                }
                <button onClick={() => addPage(event, buttonArray)} style={{padding: "5px 15px"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <RoutePointContent key={index} text={`hello ${index}`} style={page !== index ? {display: "none"} : {display: "block"}}/>
                ))
            }

            <TitleBlock text={"Пассажиры"} fontSize={"16px"}/>
            <PageBlockForPass />

            <TitleBlock text={"Грузы"} fontSize={"16px"}/>
            <PageBlockForCargo />

        </div>
    )
}