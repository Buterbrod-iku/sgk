import style from './header.module.scss'
import userAvatar from '../../../assets/images/userAvatar.png'

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.topBlock}>
                <div className={style.name}>
                    <h2>Заявки</h2>
                </div>
                <div className={style.user}>
                    {/*заменить*/}
                    <div className={style.icoUser} style={{backgroundImage: `url(${userAvatar.src})`, backgroundSize: 'cover'}}></div>
                    <div className={style.optionsButton}></div>
                </div>
            </div>
            <div className={style.bottomBlock}>
                <p className={style.href}>Главная - Заявки</p>
            </div>
        </header>
    )
}
