import style from './infoBlock.module.scss'

export default function InfoBlock(props) {
    return (
        <div className={style.main} style={props.dataTime ? {flexDirection: "column", height: "auto", paddingBottom: "10px", alignItems: "start"} : {}}>
            <p className={style.title} style={props.dataTime ? {marginTop: "10px"} : {}}>{props.title}</p>
            {
                props.info ? (<div><p className={style.info}>{props.info}</p></div>) : ""
            }

            {
                props.dataTime ? (
                    <div className={style.dataTime} style={{marginTop: "10px"}}>
                        <p className={style.info}>Дата {props.dataTime.data}</p>
                        <p className={style.info}>Время {props.dataTime.time}</p>
                    </div>
                ) : ""
            }
        </div>
    )
}