import style from './pageBlock.module.scss'
import {useEffect, useState} from "react";
import {RoutePointContent} from "@/app/requests/new/pageBlock/routePointContent/routePointContent";
import PageBlockForPass from "@/app/requests/new/pageBlock/PageBlockForPass/PageBlockForPass";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import PageBlockForCargo from "@/app/requests/new/pageBlock/PageBlockForCargo/PageBlockForCargo";
import {onChangeDefault} from "@/components/utils/formUtils";

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

    //TODO: переписать тк сейчас баг с тем что создаётся много пассажиров
    const [routePointContent, setRoutePointContent] = useState([]);
    const [passengersContent, setPassengersContent] = useState([]);
    const [cargoContent, setCargoContent] = useState([]);
    useEffect(() => {
        let obj = Object.assign(props.values)
        obj["waypoints"] = routePointContent
        props.setValues(obj)
    }, [routePointContent])
    useEffect(() => {
        let obj = Object.assign(props.values)
        obj["passengers"] = passengersContent
        props.setValues(obj)
    }, [passengersContent])
    useEffect(() => {
        let obj = Object.assign(props.values)
        obj["cargo"] = cargoContent
        props.setValues(obj)
    }, [cargoContent])


    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <button key={index} onClick={(e) => switchHandler(e, index)} style={index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            {item.name}
                        </button>
                    ))
                }
                <button onClick={(e) => addPage(e, buttonArray)} style={{padding: "5px 15px", background: "#0078A8", color: "white"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <RoutePointContent key={index} text={`hello ${index}`} style={page !== index ? {display: "none"} : {display: "block"}} values={routePointContent} setValues={setRoutePointContent}/>
                ))
            }

            {
                buttonArray.map((item, index) => (
                    <div key={index} style={page !== index ? {display: "none"} : {display: "block"}}>
                        <TitleBlock text={"Пассажиры"} fontSize={"16px"}/>
                        <PageBlockForPass values={passengersContent} setValues={setPassengersContent}/>
                    </div>
                ))
            }

            {
                buttonArray.map((item, index) => (
                    <div key={index} style={page !== index ? {display: "none"} : {display: "block"}}>
                        <TitleBlock text={"Грузы"} fontSize={"16px"}/>
                        <PageBlockForCargo values={cargoContent} setValues={setCargoContent} />
                    </div>
                ))
            }
        </div>
    )
}