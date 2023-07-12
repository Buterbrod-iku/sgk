import style from './lineTable.module.scss'

export default function LineTable(props) {
    return (
        <>
            <tr className={style.tr}>
                <td className={style.th}>{props.date}</td>
                <td className={style.th}>{props.name}</td>
                <td className={style.th}>{props.path}</td>
            </tr>
        </>
    )
}
