import style from './infoBlock.module.scss'
import Image from "next/image";
import arrow from '../../../../assets/images/arrow-down-svgrepo-com.svg';

export default function InfoBlock(props) {

    function openClose(e){
        e.preventDefault();
        props.setBool(!props.bool);
    }

    return (
        <div className={style.main} style={props.noBorder ? {border: "none"} : {}}>
            <p className={style.title}>{props.title}</p>
            {
                props.info ? (<div><p className={style.info}>{props.info}</p></div>) : ""
            }

            {
                props.dataTime ? (
                    <div className={style.dataTime}>
                        <p className={style.info}>{props.dataTime.data}</p>
                        <span>|</span>
                        <p className={style.info}>{props.dataTime.time}</p>
                        <span>|</span>
                    </div>
                ) : ""
            }

            {
                props.close ? <button className={style.close} onClick={openClose}></button> : ''
            }
        </div>
    )
}