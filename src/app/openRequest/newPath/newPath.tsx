import style from './newPath.module.scss'

export default function NewPath(props) {
    return (
        <div className={style.main}>
            <div className={style.position}>
                <p className={style.title}>{props.title}</p>
                <button className={style.check}>Посмотреть</button>
            </div>
            <button className={style.accept}>Принять</button>
        </div>
    )
}