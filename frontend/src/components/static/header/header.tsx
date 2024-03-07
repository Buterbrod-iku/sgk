"use client"

import style from './header.module.scss'
import {usePathname} from "next/navigation";
import pathAdaptive from "@/components/static/header/pathAdaptive";
import homeHeader from "@/assets/images/ico/homeHeader.svg";
import logo from "@/assets/images/logo_1.svg";
import Image from "next/image";

export default function Header() {
    const location = usePathname()
    let path = []

    path = pathAdaptive(location)

    return (
        <header className={style.header}>
            <div className={style.bottomBlock}>
                <Image src={homeHeader} alt="" className={style.image}/>
                <p className={style.href}> {path.map(item => ' / ' + item)}</p>
            </div>
        </header>
    )
}
