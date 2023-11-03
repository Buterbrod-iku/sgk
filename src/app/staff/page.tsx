'use client'

import style from './staff.module.scss';
import Link from "next/link";

export default function Staff() {

    return (
        <div className={style.main}>
            <Link href={"/drivers"} className={style.left}>
                <div>
                    <p>Водители</p>
                </div>
            </Link>

            <Link href={"/fleet"} className={style.right}>
                <div>
                    <p>Машины</p>
                </div>
            </Link>
        </div>
    )
}