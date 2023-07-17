import style from './buttonMenu.module.scss'

export default function ButtonMenu(props) {    
    return (
        <>
            <button className={style.button} onClick={props.onClick} style={props.color}>{props.text}</button>
        </>
    )
}