const TransformationWaitingTime = (waiting: string) => {
    if (!(/^\d{2}:\d{2}$/.test(waiting))) return -1;

    let splitArray = waiting.split(":");
    return (Number(splitArray[0]) * 60) + Number(splitArray[1])
}

const TypeOfTransportation = (cargoWeight: string, passengersAmount: string) => {
    if((Number(cargoWeight) > 0) && (Number(passengersAmount) > 0)){
        return "all";
    }
    else if((Number(cargoWeight) === 0) && (Number(passengersAmount) === 0)){
        return "empty";
    }
    else if((Number(cargoWeight) === 0) && (Number(passengersAmount) > 0)){
        return "passengers";
    }
    else if((Number(cargoWeight) > 0) && (Number(passengersAmount) === 0)){
        return "cargo";
    }
    else{
        return "error";
    }
}

// Функция преобразования строк <дата> / <дата> <временя> формата <yyyy-mm-dd> <hh:mm> в Unix Timestamp (в секундах)
// Если <time> существует, но не имеет формат hh:mm, то функция вернёт значение -1
export function ConvertToUnixTime(date: string, time: string = "") {
    let unixTime:number = Math.floor(new Date(date).getTime() / 1000);
    if (time != "") {
        // Проверка формата hh:mm
        if (!(/^\d{2}:\d{2}$/.test(time))) return -1;

        let hh = parseInt(time.split(':')[0]);
        let mm = parseInt(time.split(':')[1]);
        unixTime += mm * 60 + hh * 60 * 60;
    }

    return unixTime;
}

function ReformatPhoneNumber(formattedPhone: string) {
    if (!(/^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedPhone))) return -1;

    return formattedPhone.slice(0,2) + formattedPhone.slice(4,7) + formattedPhone.slice(9,12) + formattedPhone.slice(13,15) + formattedPhone.slice(16,18);
}
