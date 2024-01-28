export const ReversRoutePoint = (request) => {
    let result = request.orders[0].route.loadingAddress.address.split(',')[0]

    request.orders.map(item => (
        result += ' - ' + item.route.unloadingAddress.address.split(',')[0]
    ))

    return result
}
