import style from './infoBlock.module.scss'
import InputEdit from "@/app/requests/[id]/inputEdit/inputEdit";
import InputForm from "@/app/requests/new/inputForm/inputForm";

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
        return '0'
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
    let time = (dateTime.getUTCHours() < 10 ? '0' + dateTime.getUTCHours() : dateTime.getUTCHours()) + ":" + dateTime.getUTCMinutes();

    return (
        <div className={style.main} style={props.noBorder ? {border: "none"} : {}}>
            <p className={style.title}>{props.title}</p>
            {
                props.info ? (
                    <div>
                        <p className={style.info}>
                            {props.edit ? (
                                    <InputForm value={(props.waiting ? Waiting(props.info) : props.info)} type={props.waiting ? 'time' : (props.phone ? 'tel' : 'text')}/>
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
                        <p className={style.info}>{props.edit ? (<InputForm value={dateInput} type='date'/>) : date}</p>
                        {
                            props.edit ? '' : <span>|</span>
                        }
                        <p className={style.info} style={props.edit ? {margin: '-2px 20px'} : {}}>{props.edit ? (<InputForm value={time} type='time'/>) : time}</p>
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