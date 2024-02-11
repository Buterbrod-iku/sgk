import axios from "axios";

export default class PostCar {
    private static host: string = "http://192.168.118.114:";

    static async getAll() {
        const apiUrl = `${this.host}8008/cars/all`;
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data;
        });

        return response
    }

    static async getById(id) {
        return await axios.get(`${this.host}8008/cars/` + id)
    }

    // TODO
    static async sendRequest(object) {
        return await axios.post(`${this.host}8008/cars`, object)
    }

    // привязать удаление
    static async deleteCar(id) {
        return await axios.delete(`${this.host}8008/cars/` + id)
    }

    // TODO
    static async switchCar(id, object) {
        return await axios.patch(`${this.host}8008/cars/` + id, object)
    }
}