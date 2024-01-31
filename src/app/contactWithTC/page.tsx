import style from './contactWithTC.module.scss'
import UserCard from "@/app/contactWithTC/userCard/userCard";

export default function contactWithTC() {
    return (
        <div className={style.main}>
            <h2 className={style.title}>Контактная информация</h2>
            <p className={style.note}>
                <span className={style.noteSpan}>*ТК - транспортная компания</span>
                <span className={style.noteSpan}>АХО - сотрудник АХО</span>
                <span className={style.noteSpan}>П - пользователь</span>
            </p>
            <div className={style.position}>
                {
                    arrayCard.map((item, index) => <UserCard key={index} user={item} />)
                }
            </div>
        </div>
    )
}

let arrayCard = [
    {
        type: "ТК",
        nameTC: "Байкал сервис",
        about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus debitis ex harum ipsam laudantium modi, natus nemo optio perferendis quisquam reprehenderit rerum sint sit tempore totam. Deserunt ipsa obcaecati recusandae.",
        contact: [
            {
                fio: "Телефон",
                value: "+7 (333)333-33-33"
            },
            {
                fio: "E-mail",
                value: "asdasasd@gmail.com"
            }
        ]
    },
    {
        type: "АХО",
        nameTC: "Марина Петровна",
        about: "Lorem ipsum dolor sit ametudantium modi, natus nemo optio perferendis quisquam reprehenderit rerum sint sit tempore totam. Deserunt ipsa obcaecati recusandae.",
        contact: [
            {
                fio: "E-mail",
                value: "asdasasd@gmail.com"
            }
        ]
    },
    {
        type: "П",
        nameTC: "Михаил Васильевич",
        about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus debitis ex harum ipsam laudantium modiehenderit rerum sint sit tempore totam. Deserunt ipsa obcaecati recusandae.",
        contact: [
            {
                fio: "Телефон",
                value: "+7 (333)333-33-33"
            }
        ]
    },
    {
        type: "ТК",
        nameTC: "Байкал сервис",
        about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus debitis ex harum ipsam laudantium modi, natus nemo optio perferendis quisquam reprehenderit rerum sint sit tempore totam. Deserunt ipsa obcaecati recusandae.",
        contact: [
            {
                fio: "Телефон",
                value: "+7 (333)333-33-33"
            },
            {
                fio: "E-mail",
                value: "asdasasd@gmail.com"
            }
        ]
    },
    {
        type: "АХО",
        nameTC: "Точка",
        about: "Lorem ipsm qweqwekj jd kjas ngfn kvd ;;fsd knsndf j reoewir ihrejjgbhf dvb j dolor sit amet, consectetur adipisicing elit. Accusamus debitis ex harum ipsam laudantium modi, natus nemo optio perferendis quisquam reprehenderit rerum sint sit tempore totam. Deserunt ipsa obcaecati recusandae.",
        contact: [
            {
                fio: "Телефон",
                value: "+7 (333)333-33-33"
            },
            {
                fio: "E-mail",
                value: "asdasasd@gmail.com"
            }
        ]
    },
]