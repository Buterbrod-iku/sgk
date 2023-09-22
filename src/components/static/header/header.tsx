import style from './header.module.scss'
import Link from "next/link";

export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.topBlock}>
                <div className={style.name}>
                    <h2>Заявки</h2>
                </div>
                <div className={style.user}>
                    {/*заменить*/}
                    <Link href={"/signIn"} style={{textDecoration: "none"}}><p className={style.text}>Авторизация</p></Link>
                    <div className={style.borderBottom}></div>
                    {/*<div className={style.optionsButton}></div>*/}

                </div>
            </div>
            <div className={style.bottomBlock}>
                <p className={style.href}>Главная - Заявки</p>
            </div>
        </header>
    )
}
