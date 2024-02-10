import style from './pageBlock.module.scss'
import {useEffect, useState} from "react";
import {RoutePointContent} from "@/app/requests/new/pageBlock/routePointContent/routePointContent";
import PageBlockForPass from "@/app/requests/new/pageBlock/PageBlockForPass/PageBlockForPass";
import TitleBlock from "@/app/requests/new/titleBlock/titleBlock";
import PageBlockForCargo from "@/app/requests/new/pageBlock/PageBlockForCargo/PageBlockForCargo";
import {onChangeDefault} from "@/components/utils/formUtils";

export default function PageBlock(props) {
    const [page, setPage] = useState(0);
    const [indexCount, setIndexCount] = useState(2);
    const [buttonArray, setButtonArray] = useState([
        {
            index: 0,
            name: "Пункт подачи"
        },
        {
            index: 1,
            name: "Пункт назначения № "
        },
    ]);


    const switchHandler = (e, index) => {
        e.preventDefault()
        setPage(index)
    }

    const addPage = (e, indexCount) => {
        setIndexCount(prev => prev + 1)
        e.preventDefault()
        let obj = {
            index: indexCount,
            name: `Пункт назначения № `
        }
        setButtonArray(oldArray => [...oldArray, obj])
        setPage(indexCount)
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

    const search = (array, page, deleted) => {
        if(array.length - 1 === 0){
            setPage(0)
        }

        console.log(array)
        console.log(page)
        console.log(deleted)
        if(deleted === page){
            for (let i = 0; i < array.length; i++){
                if(array[i].index === deleted){
                    console.log("111111111111111111111")
                    setPage(array[i - 1].index)
                }
            }
        } else{
            for (let i = 0; i < array.length; i++){
                if(array[i].index === page){
                    setPage(page)
                    return
                }
            }
        }

    }

    const closeHandler = (e, index) => {
        e.preventDefault()
        setPage(prev => (prev > 0) ? search(buttonArray, prev, index) : 0)

        setButtonArray(
            prevEndPoint => {
                return prevEndPoint.filter(item => {
                    return item.index !== index
                });
            }
        )

        let delPoint = routePointContent.filter((number) => number.index !== index);
        setRoutePointContent(delPoint)
    }

    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <button key={item.index} onClick={(e) => switchHandler(e, item.index)} style={item.index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            <div className={style.pageButton}>
                                {
                                    item.index !== 0 ?
                                        item.name + index : item.name

                                }

                                {
                                    item.index !== 0 ? (
                                        <div className={style.close} onClick={(e) => {closeHandler(e, item.index)}}>+</div>
                                    ) : null
                                }
                            </div>
                        </button>
                    ))
                }
                <button onClick={(e) => addPage(e, indexCount)} style={{padding: "7px 15px", background: "#0078A8", color: "white"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <RoutePointContent key={item.index} index={item.index} text={`hello ${index}`} style={page !== item.index ? {display: "none"} : {display: "block"}} values={routePointContent} setValues={setRoutePointContent}/>
                ))
            }

            {
                buttonArray.map((item, index) => (
                    <div key={index} style={page !== item.index ? {display: "none"} : {display: "block"}}>
                        <TitleBlock text={"Пассажиры"} fontSize={"16px"}/>
                        <PageBlockForPass values={passengersContent} setValues={setPassengersContent}/>
                    </div>
                ))
            }

            {
                buttonArray.map((item, index) => (
                    <div key={index} style={page !== item.index ? {display: "none"} : {display: "block"}}>
                        <TitleBlock text={"Грузы"} fontSize={"16px"}/>
                        <PageBlockForCargo values={cargoContent} setValues={setCargoContent} />
                    </div>
                ))
            }
        </div>
    )
}