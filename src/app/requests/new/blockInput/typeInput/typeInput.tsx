import style from './checkbox.module.scss'
import {InputLabel} from "@/app/requests/new/blockInput/blockInput";

export function defaultInput(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <input type="checkbox" className={style.checkbox}/>
            <InputLabel text={props.text} style={{marginBottom: "0"}}/>
        </div>
    )
}

export function textArea(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <input type="checkbox" className={style.checkbox}/>
            <InputLabel text={props.text} style={{marginBottom: "0"}}/>
        </div>
    )
}

export function Checkbox(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <input type="checkbox" className={style.checkbox}/>
            <InputLabel text={props.text} style={{marginBottom: "0"}}/>
        </div>
    )
}