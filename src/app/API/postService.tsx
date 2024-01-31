import axios from "axios";

export default class PostService {
    static async getAll() {
        const apiUrl = 'http://localhost:5000/routes/std/';
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data.results;
        });

        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:5000/routes/std/' + id)
        return response.data
    }

    static async sendRequest(object) {
        const response = await axios.post('http://localhost:5000/routes/complex/', object)
        return response
    }

    static async deleteOrder(orderId) {
        return await axios.delete('http://localhost:5000/orders/' + orderId)
    }

    static async deleteRoute(routeId) {
        return await axios.delete(`http://localhost:5000/routes/std/${routeId}`)
    }

    static async switchRoute(routeId, object) {
        const response = await axios.patch('http://localhost:5000/routes/complex/' + routeId, object)
        return response
    }

    static async mergeRoute(object) {
        const response = await axios.post('http://localhost:5000/routes/std/merge', object)
        return response
    }
}