"use client"

import style from './header.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";
import pathAdaptive from "@/components/static/header/pathAdaptive";

export default function Header() {
    const location = usePathname()
    let path = []
    console.log(location)

    path = pathAdaptive(location)

    return (
        <header className={style.header}>
            <div className={style.topBlock}>
                <div className={style.name}>
                    <h2>{path[0]}</h2>
                </div>
                <div className={style.user}>
                    {/*заменить*/}
                    <Link href={"/signIn"} style={{textDecoration: "none"}}><p className={style.text}>Выход</p></Link>
                    <div className={style.borderBottom}></div>
                    {/*<div className={style.optionsButton}></div>*/}

                </div>
            </div>
            <div className={style.bottomBlock}>
                <p className={style.href}>Главная {path.map(item => ' - ' + item)}</p>
            </div>
        </header>
    )
}
