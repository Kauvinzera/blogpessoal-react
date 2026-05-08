import axios from "axios";

//Determina acesso ao backend através da api utilizando axios, passando a URL do Swagger na Web com funções HTTP disponíveis
const api = axios.create({
    baseURL: 'https://blogpessoal-id16.onrender.com/'
})

// função assíncrona que acessa a api para cadastro de Usuário, através da URL, dados passados para ele. Salvando a resposta no setDados
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

// função assíncrona que acessa a api para login de Usuário, através da URL, dados passados para ele. Salvando a resposta no setDados
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}