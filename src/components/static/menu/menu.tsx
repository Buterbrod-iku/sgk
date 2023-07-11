import style from './menu.module.scss'
import Image from "next/image";
import logo from '../../../assets/images/logo_1.svg'
import ItemMenu from "@/components/static/menu/itemMenu/itemMenu";
import Link from "next/link";

export default function Menu() {
    return (
        <menu className={style.menu}>
            <div className={style.logoBlock}>
                <Image src={logo} alt="" className={style.logo} />
            </div>

            <div className={style.itemBlock}>
                <Link href="/form"><ItemMenu item="Заявки"/></Link>
                <Link href="/gap"><ItemMenu item="Отчёты"/></Link>
                <ItemMenu item="Связь с ТК"/>
            </div>

            <div className={style.userBlock}>
                <div className={style.icoUser}></div>
                <p className={style.nameUser}>Мелков Илья</p>
                <div className={style.exit}></div>
            </div>
        </menu>
    )
}