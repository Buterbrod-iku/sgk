'use client'

import style from './openDrivers.module.scss';
import InfoBlock from "@/app/requests/[id]/infoBlock/infoBlock";
import {useEffect, useState} from "react";
import ModalConfirm from "@/app/requests/[id]/modalConfirm/modalConfirm";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostDrivers from "@/app/API/postDrivers";
import {useParams, useRouter} from "next/navigation";
import Loading from "@/app/requests/loading/loading";
import {onChangeDefault} from "@/components/utils/formUtils";

export default function OpenCar(props) {
    const [appState, setAppState] = useState([]);

    const router = useParams()
    let routerId = router.id

    const [fetchGetDriver, isLoading, error] = useFetching(async (id) => {
        let response = await PostDrivers.getById(id)

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
        "firstName": appState.firstName,
        "lastName": appState.lastName,
        "category": appState.category,
        "location": appState.location
    })

    let link = useRouter()
    const createEdit = async (e) => {
        e.preventDefault()

        await PostDrivers.switchDriver(routerId, values)

        await link.push(`/drivers/${routerId}`)

        fetchGetDriver(routerId)

        setEdit(!edit)
    }

    const oCD = (e) => {
        onChangeDefault(e, values, setValues);
    }

    return (
        <div className={style.main}>
            {
                confirm ? <ModalConfirm setConfirm={openConfirm} funDelete={PostDrivers.deleteDriver(routerId)} path={'/drivers'}/> : ""
            }
            {
                isLoading ?
                    <Loading />
                    :
                    (
                        <div className={style.block}>
                            <h2 className={style.title}>Данные водителя</h2>
                            <button onClick={openConfirm} className={style.cancelButton}>Удалить данные</button>

                            <div style={{display: 'flex'}}>
                                <div className={style.posLeft}>
                                    <InfoBlock title="ФИО водителя" name="lastName" info={appState.name} edit={edit} onChange={(e) => oCD(e)}/>
                                    <InfoBlock title="Номер телефона" name="phoneNumber" info={appState.phoneNumber} edit={edit} onChange={(e) => oCD(e)}/>
                                    <InfoBlock title="Почта водителя" name="mail" info={appState.mail} edit={edit} onChange={(e) => oCD(e)}/>
                                </div>

                                <div className={style.posRight}>
                                    <InfoBlock title="График работы" name="gr" info={"2 через 2"} onChange={(e) => oCD(e)}/>
                                    {/*<InfoBlock title="Адрес автопарка" name="location" info={appState.location} edit={edit} onChange={(e) => oCD(e)}/>*/}
                                    <InfoBlock title="Категория водительских прав" name="category" info={appState.category} edit={edit} onChange={(e) => oCD(e)}/>
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