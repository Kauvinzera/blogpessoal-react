import { useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import React from "react";
import { login } from "../services/Service";

interface AuthContextProps {

    //informações do contexto
    usuario: UsuarioLogin;
    handleLogout(): void; // Função para sair da aplicação
    handleLogin(usuario: UsuarioLogin): Promise<void>; // Função para entrar na aplicação que é assíncrona ou seja é uma requisição que roda enquanto o prgrama ainda funciona
    isLoading: boolean; //váriavel que indica que a aplicação esta carregando
}

//Essa interface tipa as props do Provider.
interface AuthProviderProps {
    children: ReactNode; //significa que seu componente React aceita conteúdo dentro dele.
//ReactNode qualquer coisa renderizável no React: componente, texto, div, fragment, lista...
}

//AuthContext que foi transformado em contexto, seguirá o formato AuthContextProps
export const AuthContext = React.createContext<AuthContextProps>(
    {} as AuthContextProps
)


export function AuthProvider({children}: AuthProviderProps){

// zera as informações do usuario, criando um useState do tipo UsuarioLogin
const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

// variavel informando o carregamento usando um useState
const [isLoading, setIsLoading] = useState(false);

//função handleLogin que recebe um Login do tipo UsuarioLogin e acessa a função login da Service
async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            // função login da service recebendo parametros de URL da pagina, dados do usuario, e função para alterar o usuario
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }

// Zera valores do login, após função logout realizada
function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    //Retorna em HTML o contexto com o corpo Children
 return (
        <AuthContext.Provider value={{usuario, handleLogout, handleLogin, isLoading}}>
            {children}
        </AuthContext.Provider>
    )

}