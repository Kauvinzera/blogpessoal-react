import { SyncLoader } from "react-spinners"
import CardPostagem from "../cardpostagem/CardPostagem"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { listarTodasPostagens } from "../../../services/Service";
import type Postagem from "../../../models/Postagem";

function ListaPostagens () {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [postagens, setPostagens] = useState<Postagem[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado!")
            navigate('/')
    }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    async function buscarPostagens() {
        try {
            setIsLoading(true)

            await listarTodasPostagens('/postagens', setPostagens, {
                headers : { Authorization: token}
            })    
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
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
            {/* postagem.length === 0 assegura que a mensagem apareça apenas se o array de temas estiver vazio. */}
            {(!isLoading && postagens.length === 0) && 
            (<span className="text-3x1 text-center my-8">
                Nenhuma Postagem foi encontrado!
            </span>)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    //map() Cria um novo Array, que percorre cada elemento do array original (no caso, o estado postagem) e aplica uma arrow function para gerar um novo array transformado.
                    postagens.map((postagem) => (
                    <CardPostagem key={postagem.id} postagem={postagem}/> //arrow function envia os dados de cada tema para o Componente CardTema, que será responsável por exibir visualmente as informações de cada tema em um card individual.
                    ))
                    }
            </div>
        </div>
    </div>
    </>
    )
}


export default ListaPostagens