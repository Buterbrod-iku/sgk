import axios from "axios";

export default class PostCar {
    public host = "http://192.168.1.2:"

    static async getAll() {
        const apiUrl = 'http://localhost:8008/cars/all';
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data;
        });

        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:5000/routes/std/' + id)
        return response.data
    }

    static async getNewPath(id) {
        const response = await axios.get('http://localhost:5000/routes/std/' + id)
        return response.data
    }

    // TODO
    static async sendRequest(object) {
        const response = await axios.post('http://localhost:5000/routes/complex/', object)
        return response
    }

    // привязать удаление
    static async deleteOrder(orderId) {
        return await axios.delete('http://localhost:5000/orders/' + orderId)
    }

    // привязать удаление
    static async deleteRoute(routeId) {
        return await axios.delete(`http://localhost:5000/routes/std/${routeId}`)
    }

    // TODO
    static async switchRoute(routeId, object) {
        const response = await axios.patch('http://localhost:5000/routes/complex/' + routeId, object)
        return response
    }

    static async mergeRoute(object) {
        const response = await axios.post('http://localhost:5000/routes/std/merge', object)
        return response
    }
}