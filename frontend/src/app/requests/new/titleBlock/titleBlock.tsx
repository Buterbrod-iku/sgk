import style from './titleBlock.module.scss'

export default function TitleBlock(props) {
    return (
        <div className={style.main}>
            <p className={style.text} style={{fontSize: props.fontSize}}>{props.text}</p>
        </div>
    )
}