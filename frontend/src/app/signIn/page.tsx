import style from './signIn.module.css'

export default function SignIn() {
    return (
        <div className={style.main}>
            <div className={style.moduleBlock}>
                <label className={style.label}>Логин</label>
                <input className={style.input} type="text"/>
                <label className={style.label}>Пароль</label>
                <input className={style.input} type="password"/>
                <button className={style.button}>Авторизироваться</button>
            </div>
        </div>
    )
}