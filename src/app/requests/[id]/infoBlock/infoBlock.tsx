import style from './infoBlock.module.scss'

const Waiting = (time) => {
    if(time < 60){
        return time
    } else {
        let hours = Math.floor(time / 60)
        return (hours < 10 ? '0' + hours : hours).toString() + ':' +  ((time - hours * 60) < 10 ? '0' + (time - hours * 60) : (time - hours * 60)).toString()
    }
}

export default function InfoBlock(props) {

    function openClose(e){
        e.preventDefault();
        props.setBool(!props.bool);
    }

    const dateTime = new Date(props.dataTime * 1000);
    let date = (dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()) + '.' + (dateTime.getUTCMonth() < 10 ? '0' + dateTime.getUTCMonth() : dateTime.getUTCMonth()) + '.' + dateTime.getUTCFullYear();
    let time = (dateTime.getUTCHours() < 10 ? '0' + dateTime.getUTCHours() : dateTime.getUTCHours()) + ":" + dateTime.getUTCMinutes();

    return (
        <div className={style.main} style={props.noBorder ? {border: "none"} : {}}>
            <p className={style.title}>{props.title}</p>
            {
                props.info ? (<div><p className={style.info}>{props.waiting ? Waiting(props.info) : props.info}</p></div>) : ""
            }

            {
                props.dataTime ? (
                    <div className={style.dataTime}>
                        <p className={style.info}>{date}</p>
                        <span>|</span>
                        <p className={style.info}>{time}</p>
                        <span>|</span>
                    </div>
                ) : ""
            }

            {
                props.close ? <button className={style.close} onClick={openClose} style={props.bool ? {transform: "rotate(-180deg)"} : {}}></button> : ''
            }
        </div>
    )
}