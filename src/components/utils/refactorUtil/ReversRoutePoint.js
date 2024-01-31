export const ReversRoutePoint = (request) => {
    let result = ""

    request.waypoints?.points.map(item => (
        result += item.address.split(',')[0] + ' - '
    ))

    result = result.slice(0, -2);

    return result
}
