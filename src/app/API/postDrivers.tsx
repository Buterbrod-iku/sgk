import axios from "axios";

export default class PostDrivers {
    static async getAll() {
        const apiUrl = 'http://localhost:8008/drivers/all';
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data;
        });

        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8008/drivers/' + id)
        return response
    }

    // TODO
    static async sendRequest(object) {
        const response = await axios.post('http://localhost:5000/routes/complex/', object)
        return response
    }

    // привязать удаление
    static async deleteDriver(id) {
        return await axios.delete('http://localhost:8008/drivers/' + id)
    }

    // TODO
    static async switchDriver(id, object) {
        const response = await axios.patch('http://localhost:8008/drivers/' + id, object)
        return response
    }

}