import { useRouter } from 'next/navigation';
import style from './lineTable.module.scss'
import download from '../../../assets/images/download_icon_128877.svg'

export default function LineTable(props) {
    const router = useRouter();

    const openRequestHandler = e => {
        if(!props.history){
            router.push(`/requests/${props.requestID}`);
        }
    };

    return (
        <>
            <tr onClick={openRequestHandler} className={style.tr} style={props.history ? {gridTemplateColumns: "1fr 2fr 4fr 1fr"} : {gridTemplateColumns: "1fr 2fr 5fr"}}>
                {
                    props.isSingle ? (<div className={style.close}></div>) : ''
                }
                <td className={style.th}>{props.date}</td>
                <td className={style.th}>{props.name}</td>
                <td className={style.th}>{props.path}</td>
                {
                    props.history ? (
                        <>
                            <a className={style.a} href={'./'} download={"putevoy_list.xls"}>
                                <td className={style.th} style={{display: "flex", justifyContent: 'center'}}>
                                    <img src={download.src}/>
                                </td>
                            </a>
                        </>

                    ) : ''
                }
            </tr>
        </>
    )
}