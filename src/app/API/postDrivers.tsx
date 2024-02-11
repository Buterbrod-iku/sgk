import axios from "axios";

export default class PostDrivers {
    private static host: string = "http://192.168.118.114:";

    static async getAll() {
        const apiUrl = `${this.host}8008/drivers/all`;
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data;
        });

        return response
    }

    static async getById(id) {
        const response = await axios.get(`${this.host}8008/drivers/` + id)
        return response
    }

    // TODO
    static async sendRequest(object) {
        const response = await axios.post(`${this.host}8008/drivers`, object)
        return response
    }

    // привязать удаление
    static async deleteDriver(id) {
        return await axios.delete(`${this.host}8008/drivers/` + id)
    }

    // TODO
    static async switchDriver(id, object) {
        const response = await axios.patch(`${this.host}8008/drivers/` + id, object)
        return response
    }

}