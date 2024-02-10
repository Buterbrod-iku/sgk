import style from './PageBlockForCargo.module.scss'
import {useState} from "react";
import {CargoContent} from "@/app/requests/new/pageBlock/PageBlockForCargo/CargoContent/CargoContent";

export default function PageBlockForCargo(props) {
    const [page, setPage] = useState(0);
    const [buttonArray, setButtonArray] = useState([
        {
            index: 1,
            name: "Груз № 1"
        },
    ]);

    const switchHandler = (e, index) => {
        e.preventDefault()
        setPage(index)
    }

    const addPage = (e, array) => {
        e.preventDefault()
        let obj = {
            index: 1,
            name: `Груз № ${array.length + 1}`
        }
        setButtonArray(oldArray => [...oldArray, obj])
    }


    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <button key={index} onClick={(e) => switchHandler(e, index)} style={index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            <div className={style.pageButton}>
                                {item.name}

                                <div className={style.close}>+</div>
                            </div>
                        </button>
                    ))
                }
                <button onClick={(e) => addPage(e, buttonArray)} style={{padding: "5px 15px", background: "#0078A8", color: "white"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <CargoContent key={index} text={`hello ${index}`} style={page !== index ? {display: "none"} : {display: "block"}}  values={props.values} setValues={props.setValues}/>
                ))
            }

        </div>
    )
}