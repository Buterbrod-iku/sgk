import style from './loading.module.scss'

// компонена для анимации загрузки, по дефлту как небольшой див,
// если что-то надо поменять, то можно объект силей в пропс передать
export default function Loading(props) {
    return (
        <div className={style.main} style={props.style}>
            <div className={style.spinner}></div>
        </div>
    )
}