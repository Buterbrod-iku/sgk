import { useRouter } from 'next/navigation';
import style from './lineTable.module.scss'

export default function LineTable(props) {
    const router = useRouter();

    const openRequestHandler = e => {
        router.push(`/requests/${props.requestID}`);
    };

    return (
        <>
            <tr onClick={openRequestHandler} className={style.tr}>
                {
                    props.isSingle ? (<div className={style.close}></div>) : ''
                }
                <td className={style.th}>{props.date}</td>
                <td className={style.th}>{props.name}</td>
                <td className={style.th}>{props.path}</td>
            </tr>
        </>
    )
}
