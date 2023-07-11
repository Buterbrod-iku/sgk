import style from './inputForm.module.scss'

export default function InputForm(props) {
    return (
        <>
            <input type="text" className={style.input} placeholder={props.placeholder} style={props.styles}/>
        </>
    )
}