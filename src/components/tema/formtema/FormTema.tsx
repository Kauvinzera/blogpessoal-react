import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema";
import { atualizarTema, cadastrarTema, listarTodosTemas } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

function FormTema() {

const navigate = useNavigate();

const [tema, setTema] = useState<Tema>({} as Tema)

const [isLoading, setIsLoading] = useState<boolean>(false)

const {id} = useParams<{ id: string }>()

const {usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

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

useEffect (() => {
    if (id !== undefined) {
        buscarPorId(id)
    }
}, [id])

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
        ...tema, //copia os dados atuais
        [e.target.name]: e.target.value //atualiza apenas o campo name corressponde ao atributo do estado, atribuindo o valor digitado no value
    })
}

function retornar() {
    navigate("/temas")
}

async function gerarNovoTema(e:FormEvent<HTMLFormElement>) {
    e.preventDefault() //evita que a página recarregue, sejam enviados pela URL e o estado do REACT ser pedido
   setIsLoading(true)
   
   if (id !== undefined) {
    try {
        await atualizarTema(`/temas`, tema, setTema, {
            headers: { 'Authorization': token}
        })
        alert ("O Tema foi atualizado com sucesso!")
    } catch (error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
    } else {
        alert("Erro ao atualizar o tema.")
    }
   }
} else {
    try {
        await cadastrarTema (`/temas`, tema, setTema, {
            headers: { 'Authorization': token}
    })
        alert('O Tema foi cadastrado com sucesso!')
} catch(error: any) {
        if (error.toString().includes('401')) {
            handleLogout()
    } else {
        alert("Erro ao cadastrar o tema.")
    }
   }

}

setIsLoading(false)
retornar()

}

return (
    <>
    <div className="container flex flex-col items-center justify-center mx-auto"> 
        <h1 className="text-4xl text-center my-8 ">{id === undefined ? "Cadastrar Tema" : "Editar Tema"}</h1>

        <form className="w-1/2 flex flex-col gap-4" 
        onSubmit={gerarNovoTema}> 
            <div className="flex flex-col gap-2">
                <label htmlFor="descricao">Descrição do Tema</label>
                <input 
                    placeholder="Descreva aqui o seu tema"
                    type="text" 
                    name="descricao" 
                    value={tema.descricao}
                    className="border-2 border-slate-700 rounded p-2"
                    onChange={atualizarEstado}
                    >

                </input>
            </div>
            <button className="text-slate-100 rounded bg-indigo-400
            hover:bg-indigo-800 w-1/2 flex justify-center mx-auto py-2"
            type="submit">
                { isLoading ? 
                <ClipLoader color="#ffffff" size={24}/> :
                <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span> }
            
            </button>
        </form>
    </div>
    </>
)

}

export default FormTema