import axios from "axios";
import {HOST} from "./CONST/const"

export default class PostVanger {
    private static host: string = HOST;

    static async getById(id) {
        let response = await axios.get(`${this.host}8008/vangers/` + id)

        return response.data
    }
}