import style from './fileBlock.module.scss';

export default function FileBlock({content}) {
    return (
        <div className={style.main}>
            <p>{content.title}</p>
            <div>!</div>
        </div>
    )
}