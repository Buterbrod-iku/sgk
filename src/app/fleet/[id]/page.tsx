'use client'

import style from './openCar.module.scss';
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState} from "react";
import ModalConfirm from "@/app/requests/[id]/modalConfirm/modalConfirm";
import {useParams, useRouter} from "next/navigation";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostDrivers from "@/app/API/postDrivers";
import {onChangeDefault} from "@/components/utils/formUtils";
import Loading from "@/app/requests/loading/loading";
import PostCar from "@/app/API/postCar";

export default function OpenCar() {
    const [appState, setAppState] = useState([]);

    const router = useParams()
    let routerId = router.id

    const [fetchGetDriver, isLoading, error] = useFetching(async (id) => {
        let response = await PostCar.getById(id)

        setAppState(response.data)
    })

    useEffect(() => {
        fetchGetDriver(routerId)
    }, [isLoading])

    const [confirm, setConfirm] = useState(false);
    const [edit, setEdit] = useState(false);

    const openConfirm = (e) => {
        e.preventDefault()
        setConfirm(!confirm)
    }

    const startEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
    }

    const [values, setValues] = useState({
        "numberOfTransport": appState.numberOfTransport,
        "title": appState.title,
        "maxNumberOfPassengersInCar": appState.maxNumberOfPassengersInCar,
        "maxAmountOfCargoInCar": appState.maxAmountOfCargoInCar,
        "numberOfPassengersInCar": 0,
        "amountOfCargoInCar": 0,
        "location": appState.location
    })

    let link = useRouter()
    const createEdit = async (e) => {
        e.preventDefault()

        await PostCar.switchCar(routerId, values)

        await link.push(`/fleet/${routerId}`)

        fetchGetDriver(routerId)

        setEdit(!edit)
    }

    const oCD = (e) => {
        onChangeDefault(e, values, setValues);
    }

    return (
        <div className={style.main}>
            {
                confirm ? <ModalConfirm setConfirm={openConfirm} funDelete={PostCar.deleteCar(routerId)} path={'/fleet'}/> : ""
            }
            {
                isLoading ?
                    <Loading />
                    :
                    (
                        <div className={style.block}>
                            <h2 className={style.title}>Лада гранта</h2>
                            <button onClick={openConfirm} className={style.cancelButton}>Удалить машину</button>

                            <div style={{display: 'flex'}}>
                                <div className={style.posLeft}>
                                    <InfoBlock title="Номер автомобиля" name="numberOfTransport" info={appState.numberOfTransport} edit={edit} onChange={(e) => oCD(e)}/>
                                    {/*<InfoBlock title="Номер телефона" name="name" info={"+7 (909) 555-44-33"} edit={edit} onChange={(e) => oCD(e)}/>*/}
                                    {/*<InfoBlock title="E-mail водителя" name="name" info={"vodila@mail.ru"} edit={edit} onChange={(e) => oCD(e)}/>*/}
                                    <InfoBlock title="Тип автомобиля" name="title" info={appState.title} edit={edit} onChange={(e) => oCD(e)}/>
                                    <InfoBlock title="Адрес автопарка" name="location" info={appState.location} edit={edit} onChange={(e) => oCD(e)}/>
                                </div>

                                <div className={style.posRight}>
                                    <InfoBlock title="Количество посадочных мест" name="maxNumberOfPassengersInCar" info={appState.maxNumberOfPassengersInCar} edit={edit} onChange={(e) => oCD(e)}/>
                                    <InfoBlock title="Грузоподъемность" name="maxAmountOfCargoInCar" info={appState.maxAmountOfCargoInCar} edit={edit} onChange={(e) => oCD(e)}/>
                                </div>
                            </div>

                            <div className={style.editRequestPosition}>
                                {
                                    edit ? (
                                        <>
                                            <button onClick={createEdit} className={style.editRequestButton} style={{background: "#0b626c", marginLeft: "20px"}}>Сохранить</button>
                                            <button onClick={startEdit} className={style.editRequestButton} style={{background: "#5b5757", marginLeft: "20px"}}>Отменa</button>
                                        </>
                                    ) : (
                                        <button onClick={startEdit} className={style.editRequestButton} style={edit ? {background: "#0b626c"} : {background: "#3ea19d"}}>{"Изменить данные"}</button>
                                    )
                                }
                            </div>
                        </div>
                    )
            }
        </div>
    )
}