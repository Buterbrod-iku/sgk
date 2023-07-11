import style from './request.module.scss'
import LineTable from "@/app/request/lineTable/lineTable";

export default function Request() {
    return (
        <main className={style.main}>
            <h3 className={style.title}>Все заявки</h3>
            <table className={style.table}>
                <tr className={style.tr}>
                    <th>Дата</th>
                    <th>Структурное подразделение</th>
                    <th>Маршрут</th>
                </tr>
                <div className={style.position}>
                    <LineTable date="123123" name="jjjjjjj" path="asdasd"/>
                    <LineTable date="123123" name="jjjjjjj" path="asdasd"/>
                    <LineTable date="123123" name="jjjjjjj" path="asdasd"/>
                    <LineTable date="123123" name="jjjjjjj" path="asdasd"/>
                </div>

            </table>
        </main>
    )
}
