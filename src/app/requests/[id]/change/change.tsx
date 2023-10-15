import {phoneFormatter} from "@/app/requests/utils/formUtils";
import {ConvertToUnixTime} from "@/app/requests/utils/objectRestructuring";

function ReformatPhoneNumber(formattedPhone: string) {
    if (!(/^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedPhone))) return -1;

    return formattedPhone.slice(0,2) + formattedPhone.slice(4,7) + formattedPhone.slice(9,12) + formattedPhone.slice(13,15) + formattedPhone.slice(16,18);
}

const ReversDateTime = (dataTime) => {
    const dateTime = new Date(dataTime * 1000);

    return dateTime.getUTCFullYear() + '-' + ((dateTime.getUTCMonth() + 1) < 10 ? '0' + (dateTime.getUTCMonth() + 1) : (dateTime.getUTCMonth() + 1)) + '-' +(dateTime.getUTCDate() < 10 ? '0' + dateTime.getUTCDate() : dateTime.getUTCDate());
}


export const Change = (newObj, last) => {
    let old = Object.assign(last);

    const reversWaiting = (time) => {
        let a = time.split(':')
        return (a[0] * 60) + Number(a[1])
    }

    let destinationPoints = Object.entries(newObj.destinationPoints)

    for(let i = 0; i < destinationPoints.length; i++){
        if(newObj.destinationPoints[`dest_${i}`].destinationPoint_address !== old.orders[0].route.unloadingAddress.address){
            old.orders[i].route.unloadingAddress.address = newObj.destinationPoints[`dest_${i}`].destinationPoint_address
            console.log(1)
        }
        if(newObj.destinationPoints[`dest_${i}`].destinationPoint_date !== ReversDateTime(old.orders[i].date.unloadingTime)){
            old.orders[i].date.unloadingTime = ConvertToUnixTime(newObj.destinationPoints[`dest_${i}`].destinationPoint_date)
            console.log(8)
        }
        // time!!!!!
        else if((ConvertToUnixTime(newObj.destinationPoints[`dest_${i}`].destinationPoint_date, newObj.destinationPoints[`dest_${i}`].destinationPoint_time) - old.orders[i].date.unloadingTime) !== 0){
            old.orders[i].date.unloadingTime = ConvertToUnixTime(newObj.destinationPoints[`dest_${i}`].destinationPoint_date, newObj.destinationPoints[`dest_${i}`].destinationPoint_time)
            console.log(12)
        }

        else if(reversWaiting(newObj.destinationPoints[`dest_${i}`].destinationPoint_waitingTime) !== old.orders[i].date.unloadingWaiting){
            console.log(reversWaiting(newObj.destinationPoints[`dest_${i}`].destinationPoint_waitingTime))
            console.log(old.orders[i].date.unloadingWaiting)

            old.orders[i].date.unloadingWaiting = reversWaiting(newObj.destinationPoints[`dest_${i}`].destinationPoint_waitingTime)
            console.log(3)
        }
    }

    let passengersInfo = Object.entries(newObj.passengersInfo)

    for(let i = 0; i < passengersInfo?.length; i++){
        if(newObj.passengersInfo[`passenger_${i}`].passengersInfo_fullName !== old.orders[0].order.passengers[i].fullName){
            old.orders[0].order.passengers[i].fullName = newObj.passengersInfo[`passenger_${i}`].passengersInfo_fullName
            console.log(4)
        } else if(ReformatPhoneNumber(newObj.passengersInfo[`passenger_${i}`].passengersInfo_phoneNumber) !== old.orders[0].order.passengers[i].phoneNumber){
            old.orders[0].order.passengers[i].phoneNumber = ReformatPhoneNumber(newObj.passengersInfo[`passenger_${i}`].passengersInfo_phoneNumber)
            console.log(5)
        }
    }

    if(newObj.devisionName !== old.orders[0].order.devisionName){
        old.orders[0].order.devisionName = newObj.devisionName
        console.log(6)
    }
    if(newObj.carStartPoint_address !== old.orders[0].route.loadingAddress.address){
        old.orders[0].route.loadingAddress.address = newObj.carStartPoint_address
        console.log(7)
    }
    if(newObj.carStartPoint_dateTime_date !== ReversDateTime(old.orders[0].date.loadingTime)){
        old.orders[0].date.loadingTime = ConvertToUnixTime(newObj.carStartPoint_dateTime_date)
        console.log(8)
    }
    else if((ConvertToUnixTime(newObj.carStartPoint_dateTime_date, newObj.carStartPoint_dateTime_time) - old.orders[0].date.loadingTime) !== 0){
        old.orders[0].date.loadingTime = ConvertToUnixTime(newObj.carStartPoint_dateTime_date, newObj.carStartPoint_dateTime_time)
        console.log(11)
    }
    if(newObj.cargoWeight !== old.route.cargoInRoute){
        old.route.cargoInRoute = newObj.cargoWeight
        console.log(9)
    }
    if(newObj.passengersAmount !== old.route.passengersInRoute){
        old.route.passengersInRoute = newObj.passengersAmount
        console.log(10)
    }

    return old
}