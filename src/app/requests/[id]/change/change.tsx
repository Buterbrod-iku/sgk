import {phoneFormatter} from "@/app/requests/utils/formUtils";
import {ConvertToUnixTime} from "@/app/requests/utils/objectRestructuring";

function ReformatPhoneNumber(formattedPhone: string) {
    if (!(/^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formattedPhone))) return -1;

    return formattedPhone.slice(0,2) + formattedPhone.slice(4,7) + formattedPhone.slice(9,12) + formattedPhone.slice(13,15) + formattedPhone.slice(16,18);
}

export const Change = (newObj, last) => {
    let old = Object.assign(last);
    const reversWaiting = (time) => {
        let a = time.split(':')
        return (a[0] * 60) + a[1]
    }

    let destinationPoints = Object.entries(newObj.destinationPoints)

    for(let i = 0; i < destinationPoints.length; i++){
        if(newObj.destinationPoints[`dest_${i}`].destinationPoint_address !== old.orders[0].route.unloadingAddress.address){
            old.orders[i].route.unloadingAddress.address = newObj.destinationPoints[`dest_${i}`].destinationPoint_address
            console.log(1)
        } else if(Math.floor(new Date(newObj.destinationPoints[`dest_${i}`].destinationPoint_date).getTime() / 1000) !== old.orders[i].date.unloadingTime){
            old.orders[i].date.unloadingTime = Math.floor(new Date(newObj.destinationPoints[`dest_${i}`].destinationPoint_date).getTime() / 1000)
            console.log(2)
        }
        // time!!!!!
        else if((ConvertToUnixTime(newObj.destinationPoints[`dest_${i}`].destinationPoint_date, newObj.destinationPoints[`dest_${i}`].destinationPoint_time) - old.orders[i].date.unloadingTime) !== 0){
            old.orders[i].date.unloadingTime = ConvertToUnixTime(newObj.destinationPoints[`dest_${i}`].destinationPoint_date, newObj.destinationPoints[`dest_${i}`].destinationPoint_time)
            console.log(2)
        }
        else if(reversWaiting(newObj.destinationPoints[`dest_${i}`].destinationPoint_waitingTime) !== old.orders[i].date.unloadingWaiting){
            old.orders[i].date.unloadingWaiting = reversWaiting(newObj.destinationPoints[`dest_${i}`].destinationPoint_waitingTime)
            console.log(3)
        }
    }

    let passengersInfo = Object.entries(newObj.passengersInfo)

    for(let i = 0; i < passengersInfo?.length; i++){
        if(newObj.passengersInfo[`passenger_${i}`].passengersInfo_fullName !== old.orders[0].order.passengers[i].fullName){
            old.orders[0].order.passengers[i].fullName = newObj.passengersInfo[`passenger_${i}`].passengersInfo_fullName
            console.log(4)
        } else if(newObj.passengersInfo[`passenger_${i}`].passengersInfo_phoneNumber !== old.orders[0].order.passengers[i].phoneNumber){
            console.log(ReformatPhoneNumber(newObj.passengersInfo[`passenger_${i}`].passengersInfo_phoneNumber))
            console.log(ReformatPhoneNumber(old.orders[0].order.passengers[i].phoneNumber))

            old.orders[0].order.passengers[i].phoneNumber = newObj.passengersInfo[`passenger_${i}`].passengersInfo_phoneNumber
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
    if(Math.floor(new Date(newObj.carStartPoint_dateTime_date).getTime() / 1000) !== old.orders[0].date.loadingTime){
        old.orders[0].date.loadingTime = Math.floor(new Date(newObj.carStartPoint_dateTime_date).getTime() / 1000)
        console.log(8)
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