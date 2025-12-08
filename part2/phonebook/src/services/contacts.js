import axios from 'axios';
const url = "http://localhost:3001/persons"

const getData = () => {
    const request = axios.get(url);
    return request.then (response => {
        return response.data;
    })
}

const postData = (newContact) => {
    const request = axios.post(url, newContact);
    return request.then (response => response.data);
}

const deleteData = (id) => {
    console.log("Deleting...");
    return axios.delete(`${url}/${id}`);
}

export default {getData, postData, deleteData}