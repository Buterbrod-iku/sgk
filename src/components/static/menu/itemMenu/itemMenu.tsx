import style from './itemMenu.module.scss'

type Item = {
    item: string;
}

export default function ItemMenu(props : Item) {
    return (
        <div className={style.main}>
            <div className={style.ico}></div>
            <p className={style.text}>{props.item}</p>
        </div>
    )
}
