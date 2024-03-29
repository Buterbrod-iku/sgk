import style from './fileBlock.module.scss';

export default function FileBlock({content}) {
    return (
        <>
            <a href={content.path} download={content.href}>
                <div className={style.main}>
                    <p>{content.title}</p>
                    <div>!</div>
                </div>
            </a>
        </>
    )
}