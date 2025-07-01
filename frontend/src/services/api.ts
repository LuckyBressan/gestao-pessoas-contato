import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333/api/",

})

/**
 * @ignore temporário, apenas para testes de api no json-server
 */
api.interceptors.request.use(config => {
    if(
        ['post', 'put'].includes(config.method || '')
    ) {
        config.data = { ...config.data, id: String(config.data.id), idPessoa: String(config.data?.idPessoa) }
    }
    return config
})

export default api;
