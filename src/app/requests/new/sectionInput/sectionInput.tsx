import style from './sectionInput.module.scss'
import InputForm from "../inputForm/inputForm";

const InputLabel = (props) => {
    return(
        <label htmlFor={props.forID} className={style.textPoint} style={props.styles}>{props.text} {props.need ? <span style={{color: "darkred"}}>*</span> : ""}</label>
    )
}

export default function SectionInput(props) {
    const id = props.id;
    const inputForID = Math.random(); // TODO: Заменить на нормальное имя

    return (
        <div className={style.main} style={props.checkbox ? {flexDirection: "row", justifyContent: "left", alignItems: "center"} : {}}>
            {
                props.checkbox ? (
                    <input id={`${inputForID}`} type="checkbox" className={style.checkbox}/>
                ) : ""
            }

            <InputLabel need={props.need} required={props} text={props.text} styles={props.checkbox ? {margin: "0"} : {}} forID={inputForID}/>

            {/* Подгрузка полей в зависимости от сложности структуры входных данных */}
            {
                props.inputArray ?
                props.inputArray.map((item) => (
                    <InputForm forID={inputForID} typeInput={item.type} placeholder={item.text} styles={props.inputArray.length > 1 ? {marginTop: "10px"} : {}}/>
                ))
                : "" 
            }
            {
                props.input ?
                props.input.map((item) => (
                    <InputForm forID={inputForID} placeholder={item} styles={props.input.length > 1 ? {marginTop: "10px"} : {}}/>
                )) 
                : ""
            }

            {
                props.dataTime ?
                    (<div className={style.position}>
                        {props.dataTimeArray.map((item) => (
                            <div>
                                <InputLabel need={item.check} text={item.text} forID={inputForID}/>
                                <InputForm forID={inputForID} typeInput={item.type} placeholder={item.placeholder}/>
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
                props.close ? <p className={style.close} onClick={(event) => props.dataTime ? props.clickEndPoint(event, id) : props.clickPeople(event, id)}>+</p> : ""
            }

        </div>
    )
}