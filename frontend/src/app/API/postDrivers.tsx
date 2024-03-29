import axios from "axios";
import {HOST} from "./CONST/const"

export default class PostDrivers {
    private static host: string = HOST;

    static async getAll() {
        const apiUrl = `${this.host}8008/drivers/all`;
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data;
        });

        return response
    }

    static async getById(id) {
        return await axios.get(`${this.host}8008/drivers/` + id)
    }

    // TODO
    static async sendRequest(object) {
        return await axios.post(`${this.host}8008/drivers`, object)
    }

    // привязать удаление
    static async deleteDriver(id) {
        return await axios.delete(`${this.host}8008/drivers/` + id)
    }

    // TODO
    static async switchDriver(id, object) {
        return await axios.patch(`${this.host}8008/drivers/` + id, object)
    }
}