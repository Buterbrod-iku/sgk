import style from './routePoint.module.scss'
import InputEdit from "@/app/requests/[id]/inputEdit/inputEdit";

export default function RoutePoint(props) {
    return (
        <div className={style.main}>
            <p className={style.point}>{props.edit ? (<InputEdit value={props.point} />) : props.point}</p>
        </div>
    )
}