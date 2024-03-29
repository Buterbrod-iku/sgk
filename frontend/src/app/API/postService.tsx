import axios from "axios";
import {HOST} from "./CONST/const"

export default class PostService {
    private static host: string = HOST;

    static async getAll(query) {
        const apiUrl = `${this.host}5000/deals/${query}`;
        let response;
        await axios.get(apiUrl).then((resp) => {
            if(query === "?type=order&active=false&done=false"){
                response = resp.data.orders;
            }
            else if(query === "?type=route&active=false&done=false"){
                response = resp.data.routes;
            }
            else if(query === "?active=false&done=false"){
                let route = resp.data.routes
                let order = resp.data.orders
                response = order.concat(route);
            }
            else if(query === "?done=true"){
                response = resp.data.routes;
            }
            else {
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

    static async getNewPathRoute(id) {
        const response = await axios.get(`${this.host}5000/similar/65cb10ce952f124987aa1892?type=route&match=0.5`)
        return response.data.routes
    }

    static async getNewPathOrder(id) {
        const response = await axios.get(`${this.host}5000/similar/` + id + "?type=order&match=0.5")
        return response.data.order
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

    static async mergeRoute(query) {
        const response = await axios.post(`${this.host}5000/routes/std/automerge/${query}`)
        return response.data
    }
}