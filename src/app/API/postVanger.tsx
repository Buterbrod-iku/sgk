import axios from "axios";

export default class PostVanger {
    private static host: string = "http://192.168.1.9:";

    static async getById(id) {
        let response = await axios.get(`${this.host}8008/vangers/` + id)

        return response.data
    }
}