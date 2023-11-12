import style from './report.module.scss';
import FileBlock from "@/app/report/fileBlock/fileBlock";

export default function Report() {
    return (
        <div className={style.main}>
            <h2 className={style.title}>Отчёты</h2>
            <div className={style.pattern}>
                <p className={style.absolut}>Шаблоны</p>
                <FileBlock content={{title: "Ежемесячный отчёт", href: ""}}/>
                <FileBlock content={{title: "Путевой лист", href: ""}}/>
            </div>

            <div className={style.monthBlock}>
                {
                    arrayFile.map(item => (
                        <div className={style.section}>
                            <p className={style.monthText}>{item.month}</p>
                            <div className={style.monthPosition}>
                                {
                                    item.file.map(file => <FileBlock content={file}/>)
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

let arrayFile = [
    {
        month: "Сентябрь",
        file: [
            {
                title: "Ежемесячный отчёт",
                href: ""
            },
        ]

    },
    {
        month: "Август",
        file: [
            {
                title: "Ежемесячный отчёт",
                href: ""
            },

        ]

    },
    {
        month: "Май",
        file: [
            {
                title: "Ежемесячный отчёт",
                href: ""
            },
        ]

    },
    {
        month: "Март",
        file: [
            {
                title: "Ежемесячный отчёт",
                href: ""
            },
        ]

    },
]