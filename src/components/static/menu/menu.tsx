import style from './menu.module.scss'
import Image from "next/image";
import logo from '../../../assets/images/logo_1.svg'

export default function Menu() {
    return (
        <menu className={style.menu}>
            <div className={style.logoBlock}>
                <Image src={logo} alt="" className={style.logo} />
            </div>
        </menu>
    )
}