import style from './newPath.module.scss'
import OpenRequest from "@/app/requests/[id]/page";
import {useState} from "react";
import {useRouter} from "next/navigation";
import PostService from "@/app/API/postService";

export default function NewPath(props) {
    const [modal, setModal] = useState([]);

    const open = (e) =>{
        let style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "fixed",
            top: "0", left: "0", right: "0", bottom: "0",
            width: "100vw", height: "100vh",
            zIndex: "70"
        }
        const close = () => {
            setModal([])
        }
        e.preventDefault();
        setModal(modal.concat(<OpenRequest pathId={props.routeId} buttonEdit={true} addStyle={{height: "75vh", width: "80vw"}} close={true} fun={close} newPath={true} style={style}/>))
    }

    let link = useRouter()

    const mergeRequest = async (e) => {
        e.preventDefault()

        // Запрос на сервер на слияние заявок
        const response = await PostService.mergeRoute(`?first=${props.mainRouteId}&second=${props.routeId}&first_type=route&second_type=route`)

        console.log("Hello", response.data)

        await link.push(`/requests/`)
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
            <button className={style.accept} onClick={mergeRequest}>Принять</button>
        </div>
    )
}