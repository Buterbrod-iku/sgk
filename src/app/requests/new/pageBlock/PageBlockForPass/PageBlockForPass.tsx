import style from './PageBlockForPass.module.scss'
import {useState} from "react";
import {RoutePointContent} from "@/app/requests/new/pageBlock/routePointContent/routePointContent";
import {PassengersContent} from "@/app/requests/new/pageBlock/PageBlockForPass/PassengersContent/PassengersContent";

export default function PageBlockForPass(props) {
    const [page, setPage] = useState(0);
    const [buttonArray, setButtonArray] = useState([
        {
            index: 1,
            name: "Пассажир № 1"
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
            name: `Пассажир № ${array.length + 1}`
        }
        setButtonArray(oldArray => [...oldArray, obj])
    }


    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <button key={index} onClick={() => switchHandler(event, index)} style={index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            <div className={style.pageButton}>
                                {item.name}

                                <div className={style.close}>+</div>
                            </div>
                        </button>
                    ))
                }
                <button onClick={() => addPage(event, buttonArray)} style={{padding: "5px 15px", background: "#0078A8", color: "white"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <PassengersContent key={index} text={`hello ${index}`} style={page !== index ? {display: "none"} : {display: "block"}} values={props.values} setValues={props.setValues}/>
                ))
            }

        </div>
    )
}