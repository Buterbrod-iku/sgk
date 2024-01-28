"use client";

import style from './active.module.scss';
import SectionInput from "../new/sectionInput/sectionInput";
import {use, useEffect, useState, Fragment} from "react";
import InputButton from "../new/inputButton/inputButton";
import {ObjectRestructuring} from "@/app/requests/utils/objectRestructuring";
import {onChangeDefault, onListChange} from "@/app/requests/utils/formUtils";
import axios from 'axios';
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import {useFetching} from "@/components/utils/hooks/useFetching";
import PostService from "@/app/API/postService";
import {useRouter} from "next/navigation";
import successIcon from '@/assets/images/success.svg'

export default function New() {

    
    return (
        <Fragment>
        
            <div className={style.activeBlock}>

                <div className={style.activeHeader}>
                    <span className={style.activeHeaderText}>Активная транспортировка по маршруту</span> 
                    <span className={style.activeHeaderPath}>Барнаул - Бийск - Новосибирск&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>

                <div className={style.activeMapInfo}>
                    <div className={style.activeMap}>
                        <div className={style.mapFrame}>
                            <div className={style.mapFrameHeader}>Отслеживание местоположения на карте</div>
                            <div className={style.mapFrameField}>ЗАГРУЗКА</div>
                        </div>
                        <div className={style.mapTip}>Путевой лист будет создан после того, как заявка будет выполнена</div>
                    </div>
                    <div className={style.activeInfo}>
                        <div className={style.activeInfoHeader}>Сведения о заявке</div>
                        Фактическое начало перевозки: <div className={style.blue}>05.11.2023 10:10</div>
                        Водитель: <div className={style.blue}>Олег Николаевич Сартуков</div>
                        Гос. номер автомобиля: <div className={style.blue}>С652ХТ</div>
                    </div>
                </div>

                <div className={style.activeHistory}>
                    <div className={style.historyBlock}>
                        <div className={style.historyHeader}>История перемещений</div>

                        <textarea className={style.historyLog}>
                            05.11.2023 10:10 - Барнаул, ул. аыва 145
                        </textarea>
                    </div>
                    <div className={style.historyTip}>
                        Водитель может временно оказаться вне зоны покрытия интернета<br></br>
                        Информация о его перемещении будет обновлена после восстановления соединения
                    </div>
                </div>

                {/* <div className={style.activeRoute}>
                    <div className={style.routeHeader}>
                        Подробный маршрут   
                    </div>
                    <div className={style.routeList}>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                        Барнаул, ул. аыва 145 фывждыфв одвфоыдлвфывдолвдлфыов<br></br>
                    </div>
                </div> */}

            </div>
        
        </Fragment>
    )
}
