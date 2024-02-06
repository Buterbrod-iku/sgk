import style from './blockInput.module.scss'

export const InputLabel = (props) => {
    return(
        <label htmlFor={props.forID} className={style.textPoint} style={props.style}>
            {props.text} {props.require ? <span style={{color: "#FF4949"}}>*</span> : ""}
        </label>
    )
}

export default function BlockInput(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <InputLabel forID={props.id} text={props.text} require={props.require}/>
            <input className={style.input} value={props.value} type={props.type} placeholder={props.placeholder}/>
        </div>
    )
}