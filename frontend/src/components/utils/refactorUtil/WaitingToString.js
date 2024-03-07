export const Waiting = (time) => {
    if(time < 60){
        return '00:' + time.toString()
    } else {
        let hours = Math.floor(time / 60)
        return (hours < 10 ? '0' + hours : hours).toString() + ':' +  ((time - hours * 60) < 10 ? '0' + (time - hours * 60) : (time - hours * 60)).toString()
    }
}

export const reversWaiting = (time) => {
    let a = time.split(':')
    return (a[0] * 60) + Number(a[1])
}