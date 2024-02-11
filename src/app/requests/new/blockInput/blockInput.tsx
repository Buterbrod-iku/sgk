import style from './blockInput.module.scss'
import {Checkbox, DefaultInput, Select, TextArea} from "@/app/requests/new/blockInput/typeInput/typeInput";
import {useEffect, useState} from "react";

export const InputLabel = (props) => {
    return(
        <label htmlFor={props.forID} className={style.textPoint} style={props.style}>
            {props.text} {props.require ? <span style={{color: "#FF4949"}}>*</span> : ""}
        </label>
    )
}

export default function BlockInput(props) {
    const [input, setInput] = useState(<DefaultInput />);

    useEffect(() => {
        if (props.type === "textarea"){
            setInput(<TextArea placeholder={props.placeholder} onChange={props.onChange} name={props.name} dataSectionID={props.dataSectionID}/>)
        }
        else if (props.type === "checkbox"){
            setInput(<Checkbox onChange={props.onChange} name={props.name}/>)
        }
        else if (props.type === "select"){
            setInput(<Select selectArray={props.selectArray} placeholder={props.placeholder} onChange={props.onChange} name={props.name}/>)
        }
        else {
            setInput(<DefaultInput placeholder={props.placeholder} type={props.type} onChange={props.onChange} name={props.name}/>)
        }
    }, [props.selectArray])

    return (
        <div className={style.main} style={props.type === "checkbox" ? {gridArea: props.gridName, flexDirection: "row-reverse", justifyContent: "left", alignItems: "center"} : {gridArea: props.gridName}}>
            <InputLabel forID={props.id} text={props.text} require={props.require} style={props.type === "checkbox" ? {marginBottom: "0"} : {}}/>

            {
                input
            }
        </div>
    )
}