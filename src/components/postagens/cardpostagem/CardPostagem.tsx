import { Link } from "react-router-dom"
import type Postagem from "../../../models/Postagem"
import type Usuario from "../../../models/Usuario"

interface CardPostagemProps {
    postagem: Postagem
}

function CardPostagem({postagem}: CardPostagemProps) {



    return (
        <>
            <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                <div>
                    <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                        {/* ? Garante que não acontecerá erro por falta do parâmetro */}
                        <img src={postagem.usuario?.foto} className="h-12 rounded-full" alt={postagem.usuario?.nome}/>
                        <h3 className='text-2xl font-bold text-center uppercase'>
                            {postagem.usuario?.nome}
                        </h3>
                    </div>

                    <div className="p-4">
                        <h4 className="text-black text-2xl font-semibold uppercase">{postagem.titulo}</h4>
                        <p className="p-2 text-xl bg-slate-200 h-full text-black">{postagem.texto}</p>
                        <p className="p-2 text-xl bg-slate-200 h-full text-black">Tema: {postagem.tema?.descricao}</p>
                        <p className="p-2 text-xl bg-slate-200 h-full text-black">Data: 
                            {new Intl.DateTimeFormat("pt-BR", {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(postagem.data))}</p>
                    </div>
                    
                </div>
                <div className="flex">
                    <Link to={`/editarpostagem/${postagem.id}`} className="w-full text-slate-100 bg-indigo-400 flex items-center justify-center py-3 hover:bg-indigo-800">
                        <button>Editar</button>
                    </Link>
                    <Link to={`/deletarpostagem/${postagem.id}`} className="w-full text-slate-100 bg-red-400 flex items-center justify-center hover:bg-red-800 ">
                        <button>Deletar</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CardPostagem