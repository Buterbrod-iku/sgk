import axios from "axios";

export default class PostService {
    static async getAll() {
        const apiUrl = 'http://localhost:5000/routes/complex/';
        let response;
        await axios.get(apiUrl).then((resp) => {
            response = resp.data;
        });

        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:5000/routes/complex/' + id)
        return response
    }
}