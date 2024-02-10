import style from './PageBlockForPass.module.scss'
import {useState} from "react";
import {RoutePointContent} from "@/app/requests/new/pageBlock/routePointContent/routePointContent";
import {PassengersContent} from "@/app/requests/new/pageBlock/PageBlockForPass/PassengersContent/PassengersContent";

export default function PageBlockForPass(props) {
    const [page, setPage] = useState(0);
    const [indexCount, setIndexCount] = useState(1);
    const [buttonArray, setButtonArray] = useState([
        {
            index: 0,
            name: "Пассажир № "
        },
    ]);

    const switchHandler = (e, index) => {
        e.preventDefault()
        setPage(index)
    }

    const addPage = (e) => {
        e.preventDefault()
        let obj = {
            index: indexCount,
            name: `Пассажир № `
        }
       
        setIndexCount(prev => {
            setButtonArray(oldArray => [...oldArray, obj])
            setPage(indexCount)
            return prev + 1
        }) 
    }

    const search = (array, page, deleted) => {
        if(array.length - 1 === 0){
            return 0;
        }

        console.log(array)
        console.log(page)
        console.log(deleted)
        if(deleted === page){
            for (let i = array.length - 1; i >= 0; i--){
                if(array[i].index === deleted){
                    console.log("111111111111111111111")
                    return array[i - 1].index
                }
            }
        } else{
            for (let i = 0; i < array.length; i++){
                if(array[i].index === page){
                    console.log("2222222")
                    return page
                }
            }
        }

    }

    const closeHandler = (e, index) => {
        e.preventDefault()
        setPage(prev => (prev > 0) ? search(buttonArray, prev, index) : 0)
        console.log("page index", page, index)
        setButtonArray(
            prev => {
                return prev.filter(item => {
                    return item.index !== index
                });
            }
        )
        console.log("closeHandler", page, index, indexCount)

        // let delPoint = routePointContent.filter((number) => number.index !== index);
        // setRoutePointContent(delPoint)
    }


    return (
        <div className={style.main}>
            <div className={style.tabPosition}>
                {
                    buttonArray.map((item, index) => (
                        <div className={style.pos} style={item.index === page ? {background: 'white'} : {background: '#E6E6E6'}}>
                            <button key={item.index} onClick={(e) => switchHandler(e, item.index)}>
                                <div className={style.pageButton}>
                                    {
                                        item.name + (index) 
                                    }
                                </div>
                            </button>
                            {
                                item.index !== 0 ? (
                                    <div className={style.close} onClick={(e) => {closeHandler(e, item.index)}}>+</div>
                                ) : null
                            }
                        </div>
                    ))
                }
                <button onClick={(e) => addPage(e)} style={{padding: "7px 15px", background: "#0078A8", color: "white"}}>+</button>
            </div>

            {
                buttonArray.map((item, index) => (
                    <PassengersContent key={item.index} text={`hello ${item.index}`} style={page !== item.index ? {display: "none"} : {display: "block"}} values={props.values} setValues={props.setValues}/>
                ))
            }

        </div>
    )
}