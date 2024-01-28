"use client"
import style from './userCard.module.scss'

export default function UserCard({user}) {
    return (
        <div className={style.main}>
            <div className={style.logo}>{user.type}</div>
            <div className={style.title}>{user.nameTC}</div>
            <div className={style.info}>
                {user.about}
            </div>
            <div className={style.contact}>
                {
                    user.contact.map(item => (
                        <>
                            <p>{item.fio}: <span>{item.value}</span></p>
                        </>

                    ))
                }
            </div>
        </div>
    )
}
