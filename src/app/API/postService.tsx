import axios from "axios";

export default class PostService {
    private static host: string = "http://192.168.1.9:";

    static async getAll(query) {
        const apiUrl = `${this.host}5000/deals/${query}`;
        let response;
        await axios.get(apiUrl).then((resp) => {
            if(query === "?type=order&active=false"){
                response = resp.data.orders;
            }
            else if(query === "?type=route&active=false"){
                response = resp.data.routes;
            }
            else if(query === "?active=false"){
                let route = resp.data.routes
                let order = resp.data.orders
                response = order.concat(route);
            }
        });

        return response
    }

    static async getActive() {
        const response = await axios.get(`${this.host}5000/deals/?active=true&type=route`)
        return response.data.routes
    }

    static async getById(id) {
        const response = await axios.get(`${this.host}5000/routes/std/` + id)
        return response.data
    }

    static async getByIdOrder(id) {
        const response = await axios.get(`${this.host}5000/orders/` + id)
        return response.data
    }

    static async getNewPath(id) {
        const response = await axios.get(`${this.host}5000/similar/` + id + "?type=route&match=0.5")
        return response.data.routes
    }

    // TODO
    static async sendRequest(object) {
        return await axios.post(`${this.host}5000/orders/advanced/`, object)
    }

    // привязать удаление
    static async deleteOrder(orderId) {
        return await axios.delete(`${this.host}5000/orders/` + orderId)
    }

    // привязать удаление
    static async deleteRoute(routeId) {
        return await axios.delete(`${this.host}5000/routes/std/${routeId}`)
    }

    // TODO
    static async switchRoute(routeId, object) {
        const response = await axios.patch(`${this.host}5000/routes/complex/` + routeId, object)
        return response
    }

    static async mergeRoute(object) {
        const response = await axios.post(`${this.host}5000/routes/std/merge`, object)
        return response
    }
}