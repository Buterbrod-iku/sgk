import style from './inputEdit.module.scss'

export default function InputEdit(props) {
    return (
        <input className={style.input} defaultValue={props.value} type={props.type ? props.type : 'text'}/>
    )
}