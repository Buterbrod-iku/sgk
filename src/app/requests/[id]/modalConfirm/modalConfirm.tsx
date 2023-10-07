import style from './modalConfirm.module.scss'

export default function ModalConfirm(props) {
    return (
        <div className={style.main}>
            <div className={style.window}>
                <p>Вы уверенны, что хотете отменить заявку?</p>
                <div className={style.position}>
                    <button onClick={props.setConfirm} style={{background: "red"}}>Закрыть</button>
                    <button style={{background: "green"}}>Подтвердить</button>
                </div>
            </div>
        </div>
    )
}