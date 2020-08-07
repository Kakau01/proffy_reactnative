import axios from "axios";

//fazer conexao com a api
const api = axios.create({
    //******ATENCAOvamos utilizar o IP da maquina na rede
    baseURL: 'http://192.168.15.19:3333'
});

export default api;

