import style from './routePoint.module.scss'

export default function RoutePoint(props) {
    return (
        <div className={style.main}>
            <p className={style.point}>{props.point}</p>
        </div>
    )
}