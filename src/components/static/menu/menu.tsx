"use client"

import style from './menu.module.scss'
import Image from "next/image";
import logo from '../../../assets/images/logo_1.svg'
import ItemMenu from "@/components/static/menu/itemMenu/itemMenu";
import Link from "next/link";
import contactsIcon from '../../../assets/images/menu_contacts_icon.svg'
import requestIcon from '../../../assets/images/menu_request_icon.svg'
import fleet from '../../../assets/images/car_icon-icons.com_70268.svg'
import statsIcon from '../../../assets/images/menu_stats_icon.svg'
import exitIcon from '../../../assets/images/menu_exit_icon.svg'
import userAvatar2 from '../../../assets/images/userAvatar2.png'
import history from '../../../assets/images/history_117628.svg'
import {useEffect, useState} from "react";

export default function Menu() {
    const [burgerMenu, setBurgerMenu] = useState(false);

    const OpenMenu = () => {
        setBurgerMenu(!burgerMenu);
    }

    const [width, setWidth] = useState<number>();

    useEffect(() => {
        setWidth(window.screen.width);
    }, []);

    return (
        <menu className={style.menu}>
            <div className={style.logoBlock}>
                {/* TODO: Из-за ссылки немного съехало лого. Пофиксить */}
                <Link href={"/"}><Image src={logo} alt="" className={style.logo} /></Link>
                {/* <Image src={logo} alt="" className={style.logo} /> */}
                <label className={style.close} htmlFor="check">
                    <input type="checkbox" id="check" onClick={OpenMenu}/>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className={style.burger} style={burgerMenu ? {height: "35vh"} : width < 800 ? {height: "0", transition: "0.3s"} : {}}>
                <div className={style.itemBlock} style={burgerMenu ? {display: "block"} : {}}>
                    <Link href={"/requests"} className={style.Link}><ItemMenu item="Заявки" iconURL={requestIcon.src}/></Link>
                    <Link href={"/staff"} className={style.Link}><ItemMenu item="Автопарк" iconURL={fleet.src}/></Link>
                    <Link href={"/report"} className={style.Link}><ItemMenu item="Отчёты" iconURL={statsIcon.src}/></Link>
                    <Link href={"/contactWithTC"} className={style.Link}><ItemMenu item="Связь с ТК" iconURL={contactsIcon.src}/></Link>
                    <Link href={"/history"} className={style.Link}><ItemMenu item="История заявок" iconURL={history.src}/></Link>
                </div>

                <div className={style.userBlock} style={burgerMenu ? {display: "flex"} : {}}>
                    {/*<div className={style.icoUser}></div>*/}
                    <p className={style.nameUser}>Иван Иванович</p>
                    <div className={style.exit} style={{backgroundImage: `url(${exitIcon.src})`, backgroundSize: 'cover'}}></div>
                </div>
            </div>
        </menu>
    )
}