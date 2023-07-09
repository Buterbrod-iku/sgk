import style from './header.module.scss'

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.topBlock}>
                <div className={style.name}>
                    <h2>Заявки</h2>
                </div>
                <div className={style.user}>
                    {/*заменить*/}
                    <div className={style.icoUser}></div>
                </div>
            </div>
            <div className={style.bottomBlock}>
                <p className={style.href}>Главная - Завявки</p>
            </div>
        </header>
    )
}
