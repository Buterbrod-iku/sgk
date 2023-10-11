import style from './modalConfirm.module.scss'

export default function ModalConfirm(props) {
    return (
        <div className={style.main}>
            <div className={style.window}>
                <p>Вы уверенны, что хотете отменить заявку?</p>
                <div className={style.position}>
                    <button style={{background: "#2ecc71"}}>Подтвердить</button>
                    <button onClick={props.setConfirm} style={{background: "#e74c3c"}}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}