import style from './sectionInput.module.scss'
import InputForm from "../inputForm/inputForm";

const InputLabel = (props) => {
    return(
        <label htmlFor={props.forID} className={style.textPoint} style={props.styles}>
            {props.text} {props.require ? <span style={{color: "darkred"}}>*</span> : ""}
        </label>
    )
}

export default function SectionInput(props) {


    const isCheckbox = (props.customStruct == "checkbox");

    return (
        
        <div className={style.main} style={isCheckbox ? {flexDirection: "row", justifyContent: "left", alignItems: "center"} : {}}>
            
            {/* Чекбокс на всю секцию */}
            {
                (isCheckbox) ?
                    <input id={props.id} type="checkbox" name={props.inputs[0].name} className={style.checkbox} onChange={props.onChange}/>
                : ""
            }

            {/* Универсальный заголовок секции */}
            <InputLabel require={props.require} text={props.sectionLabel} styles={(isCheckbox) ? {margin: "0"} : {}} forID={props.id}/>

            {/* Создание полей без уникальных лейблов (стандартная структура) */}
            {
                (!props.customStruct) ?
                props.inputs.map((item, index) => (
                    (!item.textarea) ? (
                        <InputForm key={`${props.id}_${index}`} forID={`${props.id}_${index}`} name={item.name} type={item.type} placeholder={item.placeholder} styles={props.inputs.length > 1 ? {marginTop: "10px"} : {}} onChange={props.onChange}/>
                    ) 
                    : <textarea key={`${props.id}_${index}`} placeholder={props.inputArea} className={style.input} onChange={props.onChange}></textarea>
                ))
                : ""
            }

            {/* Создание полей для структуры, содержащей дату и время с подписями лейблов */}
            {
                (props.customStruct == "dateTime") ? <>
                <InputForm forID={`${props.id}`} name={props.inputs[0].name} type={props.inputs[0].type} placeholder={props.inputs[0].placeholder} onChange={props.onChange}/>
                <div className={style.position}>
                    {props.inputs.map((item, index) => (
                        (index != 0) ?
                        <div key={`${props.id}_${index}`}>
                            <InputLabel require={item.require} text={item.inputLabel} forID={`${props.id}_${index}`} />
                            <InputForm forID={`${props.id}_${index}`} type={item.type} placeholder={item.placeholder} name={item.name} onChange={props.onChange}/>
                        </div> 
                        : ""
                    ))}
                </div>
                </>
                : ""
            }

            {/* Кнопка удаления элемента */}
            {
                props.closable ? <p className={style.close} onClick={(event) => props.closeHandler(event, props.id)}>+</p> : ""
            }

        </div>
    )

}