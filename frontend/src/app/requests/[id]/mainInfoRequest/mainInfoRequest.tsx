'use client'

import style from "./mainInfoRequest.module.scss";
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState, Fragment} from "react";
import {onChangeDefault, onListChange} from "@/components/utils/formUtils";
import PostVanger from "@/app/API/postVanger";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import Loading from "@/app/requests/loading/loading";

export default function MainInfoRequest({allInfo, ...props}) {
    const [fullPassenger, setFullPassenger] = useState(false);
    const [fullPoint, setFullPoint] = useState(false);
    const [fullCargo, setFullCargo] = useState(false);
    
    
    useEffect(() =>{
        if(props.edit){
            setFullPassenger(true);
            setFullPoint(true);
            setFullCargo(true);
        } else {
            setFullPassenger(false);
            setFullPoint(false);
            setFullCargo(false);
        }
    }, [props.edit])

    const [vanger, setVanger] = useState({});

    const [fetchVanger, isLoadingVanger, errorVanger] = useFetching(async (id) => {
        const response = await PostVanger.getById(allInfo.vanger)

        setVanger(response)
    })

    let routeEff = window.location.pathname

    useEffect(() => {
        if(allInfo.vanger !== "0"){
            fetchVanger()
        }
    }, [props.openInfo])

    const [typeVanger, setTypeVanger] = useState("");
    // Вывод измененных значений
    useEffect(() =>{
        switch (vanger?.car?.title) {
            case "all":
                setTypeVanger("Грузо-пассажирский")
                break;
            case "human":
                setTypeVanger("Пассажирский")
                break;
            case "cargo":
                setTypeVanger("Грузовой")
                break;
            default:
                setTypeVanger("")
                break;
        }
        console.log("hello")
    }, [props.openInfo, []])

    // Short onChangeDefault()
    const oCD = (e) => {
        onChangeDefault(e, props.values, props.setValFunc);
    }

    return (
        <>
            {
            props.route ?
                    (
                        <>
            <div className={style.infoBlock} style={props.openInfo ? {display: "block"} : {display: "none"}}>
                        <InfoBlock title="Структурное подразделение" name="devisionName" onChange={(e) => oCD(e)} info={"СГК"} edit={props.edit}/>
                <InfoBlock title="Адрес подачи авто" name="carStartPoint_address" onChange={(e) => oCD(e)} info={allInfo.waypoints?.points[0].address} edit={props.edit}/>
                {/*превести из unix time*/}
                <InfoBlock title="Подача авто" name="carStartPoint_dateTime" onChange={(e) => oCD(e)} dataTime={allInfo.time?.beginDate} edit={props.edit}/>

                <InfoBlock title="Остановки" close={true} bool={fullPoint} setBool={setFullPoint} edit={props.edit}/>

                {
                    allInfo.waypoints?.points.map((order, index) => (
                        <div key={index} style={fullPoint ? {display: "block"} : {display: "none"}}>
                            <div className={style.openInfo} data-section-id={"destination_" + index}>
                                <InfoBlock title="Адрес назначения авто" name="destinationPoint_address" dataSectionID={"dest_" + index} info={order.address} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                {/*TODO: Тут надо не забыть поменять время*/}
                                <InfoBlock title="Прибытие авто" name="destinationPoint" dataSectionID={"dest_" + index} dataTime={allInfo.waypoints.times[index]} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                {/*<InfoBlock title="Время ожидания" name="destinationPoint_waitingTime" dataSectionID={"dest_" + index} waiting={true} info={1} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>*/}
                            </div>
                        
                        </div>))
                }

                <InfoBlock title="Пассажиры" close={true} bool={fullPassenger} setBool={setFullPassenger} edit={props.edit}/>

                {
                    allInfo.orders?.map((orders, index) => (
                        orders.cargo.passengers.map((passenger, i) => (
                            <div key={index} className={style.openInfo} style={fullPassenger ? {display: "block"} : {display: "none"}}>
                                <InfoBlock title="ФИО сотрудника" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={passenger.name} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Телефон для оповещения" name="passengersInfo_phoneNumber" dataSectionID={"passenger_" + index} phone={true} info={passenger.contact} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Откуда едет" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={orders.waypoints.points[passenger.startIndex].address} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Куда едет" name="jkfjkdj" dataSectionID={"passenger_" + index} info={orders.waypoints.points[passenger.endIndex].address} noBorder={true} edit={props.edit}/>
                            </div>))
                    ))
                }

                <InfoBlock title="Грузы" close={true} bool={fullCargo} setBool={setFullCargo} edit={props.edit}/>

                {
                    allInfo.orders?.map((orders, index) => (
                        orders.cargo.freights.map((cargo, i) => (
                            <div key={index} className={style.openInfo} data-section-id={"cargo_" + index}  style={fullCargo ? {display: "block"} : {display: "none"}}>
                                <InfoBlock title="Характер груза" name="cargo_volumeCargo" dataSectionID={"cargo_" + index} phone={true} info={cargo.description} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Вес груза" name="cargo_weightCargo" dataSectionID={"cargo_" + index} info={cargo.weight + " кг"} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Объём груза" name="cargo_volumeCargo" dataSectionID={"cargo_" + index} phone={true} info={cargo.volume + " л"} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Откуда едет" name="passengersInfo_fullName" dataSectionID={"passenger_" + index} info={orders.waypoints.points[cargo.startIndex].address} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                                <InfoBlock title="Куда едет" name="jkfjkdj" dataSectionID={"passenger_" + index} info={orders.waypoints.points[cargo.endIndex]?.address} noBorder={true} edit={props.edit}/>
                            </div>))
                    ))
                }

            </div>

            <div className={style.infoBlock} style={props.openInfo ? {display: "none"} : {display: "block"}}>
                {
                    isLoadingVanger ?
                        <Loading />
                        :
                        (
                            <>
                                <InfoBlock title="Тип перевозки" onChange={(e) => oCD(e)} name="cargoWeight" info={typeVanger}/>
                                <InfoBlock title="Номер автомобиля" onChange={(e) => oCD(e)} name="cargoWeight" info={vanger?.car?.numberOfTransport}/>
                                <InfoBlock title="Грузоподъемность" onChange={(e) => oCD(e)} name="asd" info={String(vanger?.car?.maxAmountOfCargoInCar)}/>
                                <InfoBlock title="Количество посадочных мест" onChange={(e) => oCD(e)} name="cargoWeight" info={vanger?.car?.maxNumberOfPassengersInCar}/>

                                <InfoBlock title="ФИО водителя" onChange={(e) => oCD(e)} name="cargoWeight" info={vanger?.driver?.name} edit={props.edit}/>
                                <InfoBlock title="Номер телефона" onChange={(e) => oCD(e)} name="cargoWeight" info={vanger?.driver?.phoneNumber} edit={props.edit}/>
                                <InfoBlock title="Почта водителя" onChange={(e) => oCD(e)} name="cargoWeight" info={vanger?.driver?.mail} edit={props.edit}/>
                                {/* {(allInfo.orders[0] == undefined) ?  :} */}
                                <InfoBlock title="Категория" onChange={(e) => oCD(e)} name="comment" info={vanger?.driver?.category} edit={props.edit}/>
                            </>
                        )
                }
            </div>
               </>
                )

            :

                    (
                        <>
            <div className={style.infoBlock} style={props.openInfo ? {display: "block"} : {display: "none"}}>
                <InfoBlock title="Структурное подразделение" name="devisionName" onChange={(e) => oCD(e)} info={allInfo.cargo?.department} edit={props.edit}/>
                <InfoBlock title="Адрес подачи авто" name="carStartPoint_address" onChange={(e) => oCD(e)} info={allInfo.waypoints?.points[0].address} edit={props.edit}/>
                {/*превести из unix time*/}
                <InfoBlock title="Подача авто" name="carStartPoint_dateTime" onChange={(e) => oCD(e)} dataTime={allInfo.deadline?.beginDate} edit={props.edit}/>

                <InfoBlock title="Остановки" close={true} bool={fullPoint} setBool={setFullPoint} edit={props.edit}/>

                {
                    allInfo.waypoints?.points.map((order, index) => (
                        <div key={index} style={fullPoint ? {display: "block"} : {display: "none"}}>
                            <div className={style.openInfo} data-section-id={"destination_" + index}>
                                <InfoBlock title="Адрес назначения авто" name="destinationPoint_address" dataSectionID={"dest_" + index} info={order.address} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>
                                {/*TODO: Тут надо не забыть поменять время*/}
                                {/*<InfoBlock title="Прибытие авто" name="destinationPoint" dataSectionID={"dest_" + index} dataTime={1} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>*/}
                                {/*<InfoBlock title="Время ожидания" name="destinationPoint_waitingTime" dataSectionID={"dest_" + index} waiting={true} info={1} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "destinationPoints", props.setValFunc)}/>*/}
                            </div>
                            {/* {
                                index === allInfo.orders.length ? '' : <hr className={style.hr}/>
                            } */}
                        </div>))
                }
                
                {
                    allInfo.cargo?.passengers.length !== 0 ?
                        <InfoBlock title="Пассажиры" close={true} bool={fullPassenger} setBool={setFullPassenger} edit={props.edit}/>
                        : null
                }

                

                {
                    allInfo?.cargo?.passengers?.map((passenger, i) => (
                        <div key={i} className={style.openInfo} style={fullPassenger ? {display: "block"} : {display: "none"}}>
                            <InfoBlock title="ФИО сотрудника" name="passengersInfo_fullName" dataSectionID={"passenger_" + i} info={passenger.name} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                            <InfoBlock title="Телефон для оповещения" name="passengersInfo_phoneNumber" dataSectionID={"passenger_" + i} phone={true} info={passenger.phoneNumber} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                        </div>))
                }
            

                <InfoBlock title="Грузы" close={true} bool={fullCargo} setBool={setFullCargo} edit={props.edit}/>

                {
                    allInfo.cargo?.freights.map((cargo, i) => (
                        <div key={i} className={style.openInfo} data-section-id={"cargo_" + i}  style={fullCargo ? {display: "block"} : {display: "none"}}>
                            <InfoBlock title="Характер груза" name="cargo_volumeCargo" dataSectionID={"cargo_" + i} phone={true} info={cargo.description} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                            <InfoBlock title="Вес груза" name="cargo_weightCargo" dataSectionID={"cargo_" + i} info={cargo.weight + " кг"} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                            <InfoBlock title="Объём груза" name="cargo_volumeCargo" dataSectionID={"cargo_" + i} phone={true} info={cargo.volume + " л"} noBorder={true} edit={props.edit} onChange={(e) => onListChange(e, "passengersInfo", props.setValFunc)}/>
                        </div>))
                }



            </div>
                            </> 
            )}
        </>
    )
}