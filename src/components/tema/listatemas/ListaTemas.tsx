import { useNavigate } from "react-router-dom"
import CardTema from "../cardtema/CardTema"
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { listarTodosTemas } from "../../../services/Service";
import { SyncLoader } from "react-spinners";

function ListaTemas() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [temas, setTemas] = useState<Tema[]>([])

    const {usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [temas.length])

async function buscarTemas() {
    try {
        setIsLoading(true)

        await listarTodosTemas('/temas', setTemas, {
            headers: {Authorization: token}
        }) 
    } catch (error: any) {
        //Se a mensagem de erro contiver '401', isso indica erro de autenticação (401 - Unauthorized)
        if (error.toString().includes('401')) {
            handleLogout() //Nesse caso, handleLogout() é chamado, desconectando o usuário e redirecionando-o para a tela de Login.
        } 
    } finally {
        setIsLoading(false)           
        }
} 

return (
    <>
    {/* SyncLoader do React Spinners */}
    {/* Quando isLoading for true, o componente SyncLoader, da biblioteca React Spinners, será exibido, sinalizando ao usuário que os dados ainda estão sendo carregados. */}
    {isLoading && (
        <div className=" flex justify-center w-full my-8">
            <SyncLoader color="#312e81" size={32}/>
        </div>     
    )}
    <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
            {/* !isLoading garante que a mensagem só será exibida após o término do carregamento. */}
            {/* temas.length === 0 assegura que a mensagem apareça apenas se o array de temas estiver vazio. */}
            {(!isLoading && temas.length === 0) && 
            (<span className="text-3x1 text-center my-8">
                Nenhum Tema foi encontrado!
            </span>)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    //map() Cria um novo Array, que percorre cada elemento do array original (no caso, o estado temas) e aplica uma arrow function para gerar um novo array transformado.
                    temas.map((tema) => (
                    <CardTema key={tema.id} tema={tema}/> //arrow function envia os dados de cada tema para o Componente CardTema, que será responsável por exibir visualmente as informações de cada tema em um card individual.
                    ))
                    }
            </div>
        </div>
    </div>
    </>
)
}

export default ListaTemas