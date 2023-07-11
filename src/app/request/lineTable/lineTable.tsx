import style from './lineTable.module.scss'

export default function LineTable(props) {
    return (
        <>
            <tr className={style.tr}>
                <th className={style.th}>{props.date}</th>
                <th className={style.th}>{props.name}</th>
                <th className={style.th}>{props.path}</th>
            </tr>
        </>
    )
}
