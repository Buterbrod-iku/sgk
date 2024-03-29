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

    const reversToSelect = (array) => {
        let select = []

        for (let i = 0; i < array?.length; i++){
            let obj = {}
            obj["text"] = array[i].address
            obj["value"] = array[i].index
            select.push(obj)
        }

        return select
    }



    const switchHandler = (e, index) => {
        e.preventDefault()
        setPage(index)
        setSelectArray(reversToSelect(routePointContent))
    }

    const addPage = (e) => {
        e.preventDefault()
        let obj = {
            index: indexCount,
            name: `Пункт назначения № `
        }

        setIndexCount(prev => {
            setButtonArray(oldArray => [...oldArray, obj])
            setPage(indexCount)
            return prev + 1
        })
    }

    //TODO: переписать тк сейчас баг с тем что создаётся много пассажиров
    const [routePointContent, setRoutePointContent] = useState([]);
    const [passengersContent, setPassengersContent] = useState([]);
    const [cargoContent, setCargoContent] = useState([]);
    const [selectArray, setSelectArray] = useState([
        {
            text: "hello",
            value: "1"
        }
    ])
    useEffect(() => {
        let obj = Object.assign(props.values)
        obj["waypoints"] = routePointContent
        props.setValues(obj)

        setSelectArray(reversToSelect(routePointContent))
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
            return 0;
        }

        if(deleted === page){
            for (let i = array.length - 1; i >= 0; i--){
                if(array[i].index === deleted){
                    return array[i - 1].index
                }
            }
        } else{
            for (let i = 0; i < array.length; i++){
                if(array[i].index === page){
                    return page
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
        let delPass = passengersContent.filter((number) => number.index !== index);
        setPassengersContent(delPass)
        let delCargo = cargoContent.filter((number) => number.index !== index);
        setCargoContent(delCargo)
    }



    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <div className={style.pos} style={item.index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            <button key={item.index} onClick={(e) => switchHandler(e, item.index)}>
                                <div className={style.pageButton}>
                                    {
                                        item.index !== 0 ?
                                            item.name + index : item.name
                                    }
                                </div>
                            </button>
                            {
                                item.index !== 0 ? (
                                    <div className={style.close} onClick={(e) => {closeHandler(e, item.index)}}>+</div>
                                ) : null
                            }
                        </div>
                    ))
                }
                <button onClick={(e) => addPage(e)} style={{padding: "7px 15px", background: "#0078A8", color: "white"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <RoutePointContent key={item.index} index={item.index} text={`hello ${index}`} style={page !== item.index ? {display: "none"} : {display: "block"}} values={routePointContent} setValues={setRoutePointContent} setSelectArray={setSelectArray} passengersContent={passengersContent}/>
                ))
            }

            {
                buttonArray.map((item, index) => (
                    <div key={item.index} style={page !== item.index ? {display: "none"} : {display: "block"}}>
                        <TitleBlock text={"Пассажиры"} fontSize={"16px"}/>
                        <PageBlockForPass values={passengersContent} setValues={setPassengersContent} index={item.index} selectArray={selectArray}/>
                    </div>
                ))
            }

            {
                buttonArray.map((item, index) => (
                    <div key={item.index} style={page !== item.index ? {display: "none"} : {display: "block"}}>
                        <TitleBlock text={"Грузы"} fontSize={"16px"}/>
                        <PageBlockForCargo values={cargoContent} setValues={setCargoContent} index={item.index} selectArray={selectArray}/>
                    </div>
                ))
            }
        </div>
    )
}