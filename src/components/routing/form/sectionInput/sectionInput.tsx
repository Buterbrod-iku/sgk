import style from './sectionInput.module.scss'
import InputForm from "@/components/routing/form/inputForm/inputForm";

const TextInput = (props) => {
    return(
        <p className={style.textPoint} style={props.styles}>{props.text} {props.need ? <span style={{color: "darkred"}}>*</span> : ""}</p>
    )
}

export default function SectionInput(props) {
    return (
        <div className={style.main} style={props.checkbox ? {flexDirection: "row", justifyContent: "left", alignItems: "center"} : {}}>
            {
               props.checkbox ? (<input type="checkbox" className={style.checkbox}/>) : ""
            }

            <TextInput need={props.need} text={props.text} styles={props.checkbox ? {margin: "0"} : {}}/>

            {
                props.input.map((item) => (
                    <InputForm placeholder={item} styles={props.input.length > 1 ? {marginTop: "10px"} : {}}/>
                ))
            }

            {
                props.dataTime ?
                    (<div className={style.position}>
                        {props.dataTimeArray.map((item) => (
                            <div>
                                <TextInput need={item.check} text={item.text}/>
                                <InputForm placeholder={item.placeholder}/>
                            </div>
                        ))}
                    </div>)
                : ""
            }

            {
                props.textarea ?
                    (<textarea placeholder={props.inputArea} className={style.input}></textarea>)
                    : ""
            }

            {
                props.close ? <p className={style.close} onClick={props.click}>+</p> : ""
            }
        </div>
    )
}