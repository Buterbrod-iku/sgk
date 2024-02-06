import style from './checkbox.module.scss'
import {InputLabel} from "@/app/requests/new/blockInput/blockInput";

export function defaultInput(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <input type="" className={style.checkbox}/>
        </div>
    )
}

export function textArea(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <textarea type="text" className={style.checkbox}/>
        </div>
    )
}

export function Checkbox(props) {
    return (
        <div className={style.main} style={{gridArea: props.gridName}}>
            <input type="checkbox" className={style.checkbox}/>
        </div>
    )
}