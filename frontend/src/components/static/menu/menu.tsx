"use client"

import style from './menu.module.scss'
import Image from "next/image";
import logo from '../../../assets/images/logo_1.svg'
import ItemMenu from "@/components/static/menu/itemMenu/itemMenu";
import Link from "next/link";
import contactsIcon from '../../../assets/images/menu_contacts_icon.svg'
import requestIcon from '../../../assets/images/ico/requests.svg'
import fleet from '../../../assets/images/car_icon-icons.com_70268.svg'
import statsIcon from '../../../assets/images/ico/docs.svg'
import exitIcon from '../../../assets/images/menu_exit_icon.svg'
import driver from '../../../assets/images/fleet/driver.png'
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
                <div className={style.positionLogo}>
                    <Link href={"/"}><Image src={logo} alt="" className={style.logo} /></Link>
                    <p className={style.logoText}>УПРАВЛЕНИЕ <br/> ЛОГИСТИКОЙ</p>
                </div>

                {/*Для мобильно версии*/}
                <label className={style.close} htmlFor="check">
                    <input type="checkbox" id="check" onClick={OpenMenu}/>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className={style.burger} style={burgerMenu ? {height: "35vh"} : width < 800 ? {height: "0", transition: "0.3s"} : {}}>
                <div className={style.itemBlock} style={burgerMenu ? {display: "block"} : {}}>
                    <p className={style.typeMenu}>Логистика</p>
                    <Link href={"/requests"} className={style.Link}><ItemMenu item="Заявки" iconURL={requestIcon.src}/></Link>
                    <Link href={"/history"} className={style.Link}><ItemMenu item="История заявок" iconURL={history.src}/></Link>

                    <p className={style.typeMenu}>Автопарк</p>
                    <Link href={"/fleet"} className={style.Link}><ItemMenu item="Автомобили" iconURL={fleet.src}/></Link>
                    <Link href={"/drivers"} className={style.Link}><ItemMenu item="Водители" iconURL={driver.src}/></Link>

                    <p className={style.typeMenu}>Управление данными</p>
                    <Link href={"/report"} className={style.Link}><ItemMenu item="Документы" iconURL={statsIcon.src}/></Link>
                    <Link href={"/contactWithTC"} className={style.Link}><ItemMenu item="Справочник" iconURL={contactsIcon.src}/></Link>
                </div>

                <div className={style.userBlock} style={burgerMenu ? {display: "flex"} : {}}>
                    {/*<div className={style.]icoUser}></div>*/}
                    <Link href={"/signIn"} style={{textDecoration: "none", color: "white"}}>
                        <p className={style.nameUser}>Иван Иванович</p>
                    </Link>
                    <div className={style.exit} style={{backgroundImage: `url(${exitIcon.src})`, backgroundSize: 'cover'}}></div>
                </div>
            </div>
        </menu>
    )
}