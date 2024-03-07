import style from './inputButton.module.scss'

export default function InputButton(props) {    
    return (
        <>
            <input className={style.button} onClick={props.onClick} style={props.color} value={props.value} type={props.type}/>
        </>
    )
}