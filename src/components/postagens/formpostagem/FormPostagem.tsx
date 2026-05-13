import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import { atualizarPostagem, cadastrarPostagem, listarTodasPostagens, listarTodosTemas } from "../../../services/Service"
import type Postagem from "../../../models/Postagem"
import type Tema from "../../../models/Tema"

function FormPostagem () {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    const [temas, setTemas] = useState<Tema[]>([])

    const {usuario, handleLogout} = useContext(AuthContext)
    const token = usuario.token
    const {id} = useParams<{id : string}>()

    async function buscarPostagemPorId(id : string) {
        try {
            listarTodasPostagens(`/postagens/${id}`, setPostagem, {
                header: {Authorization: token}
            })
        } catch (error: any) {
            if(error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado!")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
        if (id !== undefined) {
        buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem, //copia os dados atuais
            [e.target.name]: e.target.value, //atualiza apenas o campo name corressponde ao atributo do estado, atribuindo o valor digitado no value
            tema: tema,
            usuario: usuario,
        })
    }

    function retornar() {
    navigate("/temas")
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {

        e.preventDefault()

        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizarPostagem(`/postagens`, postagem, setPostagem, {
                headers: { 'Authorization': token}
                })
                alert("A Postagem foi atualizada com sucesso!")
            } catch (error: any){
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao atualizar Postagem")
                }         
            } 
        } else {
            try { 
                await cadastrarPostagem(`/postagens`, postagem, setPostagem, {
                headers: { 'Authorization': token}
                })

                alert("A Postagem foi cadastrada com sucesso!")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao cadastrar Postagem")
                }
            }
             
        }

        setIsLoading(false)
        
        retornar()

    }

    const carregandoTema = tema.descricao === ""


    async function buscarTemaPorId(id: string) {
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

    async function buscarTemas() {
        try {
            await listarTodosTemas(`/temas/`, setTemas, {
                            headers: {Authorization: token}
                        }) 
            } catch (error: any) {
                //Se a mensagem de erro contiver '401', isso indica erro de autenticação (401 - Unauthorized)
                if (error.toString().includes('401')) {
                    handleLogout() //Nesse caso, handleLogout() é chamado, desconectando o usuário e redirecionando-o para a tela de Login.
                } 
            }

        
    }


    return (
        <>
        <div className="container flex flex-col items-center justify-center mx-auto"> 
            <h1 className="text-4xl text-center my-8 ">{id === undefined ? "Nova Postagem" : "Editar Postagem"}</h1>

            <form className="w-1/2 flex flex-col gap-4" 
            onSubmit={gerarNovaPostagem}> 
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Titulo da Postagem</label>
                    <input 
                        placeholder="Título"
                        type="text" 
                        name="titulo" 
                        required
                        value={postagem.titulo}
                        className="border-2 border-slate-700 rounded p-2"
                        onChange={atualizarEstado}
                        >
                    </input>
                    <label htmlFor="texto">Texto da Postagem</label>
                    <input 
                        placeholder="Texto"
                        type="text" 
                        name="texto"
                        required 
                        value={postagem.texto}
                        className="border-2 border-slate-700 rounded p-2"
                        onChange={atualizarEstado}
                        >
                    </input>
                    <p>Tema da Postagem</p>
                    <select id="tema"  
                        name="tema" 
                        className="border p-2 border-slate-800 rounded"
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        >
                        <option value="" selected disabled={carregandoTema} >Selecione um Tema</option>
                        
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id}>{tema.descricao}</option>
                            </>
                        ))}

                    </select>
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

export default FormPostagem