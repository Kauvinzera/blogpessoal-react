import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { deletarTema, listarTodosTemas } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function DeletarTema() {

const navigate = useNavigate();

//armazena dados do Tema
const [tema, setTema] = useState<Tema>({} as Tema)

const [isLoading, setIsLoading] = useState<boolean>(false)

const {id} = useParams<{ id: string }>()

const {usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

async function buscarPorId(id:string) {
    try {
        await listarTodosTemas(`/temas/${id}`, setTema, {
                    headers: {Authorization: token}
                }) 
    } catch (error: any) {
        //Se a mensagem de erro contiver '401', isso indica erro de autenticação (401 - Unauthorized)
        if (error.toString().includes('401')) {
            handleLogout() //Nesse caso, handleLogout() é chamado, desconectando o usuário e redirecionando-o para a tela de Login.
        } 
    }
}

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

useEffect (() => {
    if (id !== undefined) {
        buscarPorId(id)
    }
}, [id])

function retornar() {
    navigate("/temas")
}

async function apagarTema() {
    setIsLoading(true)

    try {
        await deletarTema(`/temas/${id}`, {
            headers: {'Authorization': token}
        }) 
        alert ("Tema foi apagado com sucesso!")
    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
    } else {
        alert("Erro ao deletar o tema.")
    }
   }

   setIsLoading(false)
   retornar()

}

    return (
        <>
        <div className="container w-1/3 mx-auto">
            <h1 className="text-center text-4xl my-4">Deletar Tema</h1>
            <p className="text-center font-semibold mb-4">Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className="border flex flex-col rounded-2x1 overflow-hidden justify-between">
                <header 
                className="bg-indigo-600 text-white font-bold text-2x1 py-2 px-6">
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>   
                <div className="flex">
                    <button className="w-full text-slate-100 bg-red-400 hover:bg-red-600 py-2" onClick={retornar}>
                        Não
                    </button>
                    <button className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800" onClick={apagarTema}>
                        { isLoading ?
                        <ClipLoader color="#ffffff" size={24}/> : <span>Sim</span>             
                         }
                    </button>

                </div>
            </div>
        </div>
        </>
    )
}

export default DeletarTema