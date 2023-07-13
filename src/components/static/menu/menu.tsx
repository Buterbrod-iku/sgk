import style from './menu.module.scss'
import Image from "next/image";
import logo from '../../../assets/images/logo_1.svg'
import ItemMenu from "@/components/static/menu/itemMenu/itemMenu";
import Link from "next/link";

import contactsIcon from '../../../assets/images/menu_contacts_icon.svg'
import requestIcon from '../../../assets/images/menu_request_icon.svg'
import statsIcon from '../../../assets/images/menu_stats_icon.svg'
import exitIcon from '../../../assets/images/menu_exit_icon.svg'
import userAvatar from '../../../assets/images/userAvatar.png'

export default function Menu() {
    return (
        <menu className={style.menu}>
            <div className={style.logoBlock}>
                <Image src={logo} alt="" className={style.logo} />
            </div>

            <div className={style.itemBlock}>
                <Link href={"/"} className={style.Link}><ItemMenu item="Заявки" iconURL={requestIcon.src}/></Link>
                <Link href={"/gap"} className={style.Link}><ItemMenu item="Отчёты" iconURL={statsIcon.src}/></Link>
                <ItemMenu item="Связь с ТК" iconURL={contactsIcon.src}/>
            </div>

            <div className={style.userBlock}>
                <div className={style.icoUser} style={{backgroundImage: `url(${userAvatar.src})`, backgroundSize: 'cover'}}></div>
                <p className={style.nameUser}>Мелков Илья</p>
                <div className={style.exit} style={{backgroundImage: `url(${exitIcon.src})`, backgroundSize: 'cover'}}></div>
            </div>
        </menu>
    )
}