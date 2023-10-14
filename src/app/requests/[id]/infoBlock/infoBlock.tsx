import style from './infoBlock.module.scss'
import InputEdit from "@/app/requests/[id]/inputEdit/inputEdit";
import InputForm from "@/app/requests/new/inputForm/inputForm";
import {Chelsea_Market} from "next/dist/compiled/@next/font/dist/google";

const Waiting = (time) => {
    if(time < 60){
        return time
    } else {
        let hours = Math.floor(time / 60)
        return (hours < 10 ? '0' + hours : hours).toString() + ':' +  ((time - hours * 60) < 10 ? '0' + (time - hours * 60) : (time - hours * 60)).toString()
    }
}

const addZero = (dateTime, type) => {
    if(type === 'date'){
        return dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()
    } else if(type === 'month'){
        return dateTime.getUTCMonth() < 10 ? '0' + dateTime.getUTCMonth() : dateTime.getUTCMonth()
    } else {
        return '00'
    }

}

export default function InfoBlock(props) {
    function openClose(e){
        e.preventDefault();
        props.setBool(!props.bool);
    }
    const dateTime = new Date(props.dataTime * 1000);

    // редачим дату из unixTime
    let date = addZero(dateTime, 'date') + '.' + addZero(dateTime, 'month') + '.' + dateTime.getUTCFullYear();
    let dateInput = dateTime.getUTCFullYear() + '-' +  addZero(dateTime, 'month') + '-' + addZero(dateTime, 'date') ;
    let time = (dateTime.getUTCHours() < 10 ? '0' + dateTime.getUTCHours() : dateTime.getUTCHours()) + ":" + (dateTime.getUTCMinutes() < 10 ? '0' + dateTime.getUTCMinutes() : dateTime.getUTCMinutes());

    let typeInput

    if((props.name === "cargoWeight") || (props.name === 'passengersAmount')){
        typeInput = 'integer'
    } else if((props.name === "destinationPoint") || (props.name === "carStartPoint_dateTime")){
        typeInput = 'date'
    } else if(props.name === "destinationPoint_waitingTime"){
        typeInput = 'time'
    } else if(props.name === "passengersInfo_phoneNumber"){
        typeInput = 'tel'
    } else {
        typeInput = 'text'
    }

    console.log(typeInput)

    return (
        <div className={style.main} style={props.noBorder ? {border: "none"} : {}}>
            <p className={style.title}>{props.title}</p>
            {
                props.info ? (
                    <div>
                        <p className={style.info}>
                            {props.edit ? (
                                    <InputForm dataSectionID={props.dataSectionID} onChange={props.onChange} name={props.name} value={(props.waiting ? Waiting(props.info) : props.info)} type={typeInput}/>
                                )
                                : (props.waiting ? Waiting(props.info) : props.info)}
                        </p>
                    </div>)
                    : ""
            }

            {
                props.dataTime ? (
                    <div className={style.dataTime}>
                        {/*пофиксить чтоб при переходе на инпут значением выдавало дату*/}
                        <p className={style.info}>{props.edit ? (<InputForm dataSectionID={props.dataSectionID} name={props.name + "_date"} max={"2050-12-31"} onChange={props.onChange} value={dateInput} type={typeInput}/>) : date}</p>
                        {
                            props.edit ? '' : <span>|</span>
                        }
                        <p className={style.info} style={props.edit ? {margin: '-2px 8px'} : {}}>{props.edit ? (<InputForm dataSectionID={props.dataSectionID} name={props.name + "_time"} onChange={props.onChange} value={time} type='time'/>) : time}</p>
                        {
                            props.edit ? '' : <span>|</span>
                        }
                    </div>
                ) : ""
            }

            {
                props.close ? <button className={style.close} onClick={openClose} style={props.bool ? {transform: "rotate(-180deg)"} : {}}></button> : ''
            }
        </div>
    )
}