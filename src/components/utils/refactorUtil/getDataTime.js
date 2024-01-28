export const addZero = (dateTime, type) => {
    if(type === 'date'){
        return dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate()
    } else if(type === 'month'){
        return (dateTime.getUTCMonth() + 1) < 10 ? '0' + (dateTime.getUTCMonth() + 1) : (dateTime.getUTCMonth() + 1)
    } else {
        return '00'
    }
}
export const getDate = (_date) => {
    const dateTime = new Date(_date * 1000);
    return (dateTime.getUTCFullYear() + '-' +  addZero(dateTime, 'month') + '-' + addZero(dateTime, 'date'));
}
export const getTime = (_date) => {
    const dateTime = new Date(_date * 1000);
    return (dateTime.getUTCHours() < 10 ? '0' + dateTime.getUTCHours() : dateTime.getUTCHours()) + ":" + (dateTime.getUTCMinutes() < 10 ? '0' + dateTime.getUTCMinutes() : dateTime.getUTCMinutes());
}