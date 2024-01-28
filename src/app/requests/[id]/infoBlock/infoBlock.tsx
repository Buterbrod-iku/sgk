import style from './infoBlock.module.scss'
import InputForm from "@/app/requests/new/inputForm/inputForm";
import {phoneFormatter} from "@/components/utils/formUtils";
import {Waiting} from "@/components/utils/refactorUtil/WaitingToString";
import {addZero} from "@/components/utils/refactorUtil/getDataTime";

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

    // треш надо удалять
    let typeInput
    if((props.name === "cargoWeight") || (props.name === 'passengersAmount')){
        typeInput = 'integer'
    } else if((props.name === "destinationPoint") || (props.name === "carStartPoint_dateTime")){
        typeInput = 'date'
    } else if(props.name === "destinationPoint_waitingTime"){
        typeInput = 'time'
    } else if(props.name === "passengersInfo_phoneNumber"){
        typeInput = 'tel';
    } else {
        typeInput = 'text'
    }
    
    return (
        <div className={style.main} style={props.noBorder ? {border: "none", padding: "7px 0"} : {}}>
            <p className={style.title}>{props.title}</p>
            {
                props.info ? (
                    <div>
                        <p className={style.info}>
                            {props.edit ? (
                                    <InputForm dataSectionID={props.dataSectionID} onChange={props.onChange} name={props.name} value={(props.waiting ? Waiting(props.info) : props.info)} type={typeInput}/>
                                )
                                // TODO: Избавиться от этого ужаса
                                : (props.name === "passengersInfo_phoneNumber") ?
                                (phoneFormatter(props.info)) :
                                (props.waiting ? Waiting(props.info) : props.info)}
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
                            props.edit ? '' : <p style={{marginLeft: "10px"}}></p>
                        }
                        <p className={style.info} style={props.edit ? {margin: '-2px 8px'} : {}}>{props.edit ? (<InputForm dataSectionID={props.dataSectionID} name={props.name + "_time"} onChange={props.onChange} value={time} type='time'/>) : time}</p>
                        {
                            props.edit ? '' : ""
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