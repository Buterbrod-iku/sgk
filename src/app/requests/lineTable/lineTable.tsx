import { useRouter } from 'next/navigation';
import style from './lineTable.module.scss'
import downloadIco from '../../../assets/images/download_icon_128877.svg'
import useDownloader from "react-use-downloader";
import Link from "next/link";

export default function LineTable(props) {
    const router = useRouter();
    const {download} = useDownloader();

    return (
        <Link href={ `/requests/${props.requestID}?isRoute=${props.route}`}>
        }}>
            <tr className={style.tr} style={props.history ? {gridTemplateColumns: "1fr 2fr 4fr 1fr"} : {gridTemplateColumns: "1fr 2fr 5fr"}}>
                {
                    props.isSingle ? (<div className={style.close}></div>) : null
                }
                <td className={style.th}>{props.date}</td>
                <td className={style.th}>{props.name}</td>
                <td className={style.th}>{props.path}</td>
                {
                    props.history ? (
                        <td className={style.th} style={{display: "flex", justifyContent: 'center'}} onClick={() => download("/", "putevoy_list.xls")}>
                            <img src={downloadIco.src}/>
                        </td>
                    ) : null
                }
            </tr>
        </Link>
    )
}