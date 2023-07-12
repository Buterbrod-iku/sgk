import style from './newPath.module.scss'
import OpenRequest from "@/app/openRequest/page";
import {useState} from "react";

export default function NewPath(props) {
    const [modal, setModal] = useState([]);

    const open = (e) =>{
        let style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "fixed",
            top: "0", left: "0", right: "0", bottom: "0",
            width: "100vw", height: "100vh",
            zIndex: "70"
        }
        const close = () => {
            setModal([])
        }
        e.preventDefault();
        console.log("qwe")
        setModal(modal.concat(<OpenRequest close={true} fun={close} newPath={true} style={style}/>))
    }

    return (
        <div className={style.main}>
            <div className={style.position}>
                <p className={style.title}>{props.title}</p>
                <button className={style.check} onClick={open}>Посмотреть</button>
                {
                    modal
                }
            </div>
            <button className={style.accept}>Принять</button>
        </div>
    )
}