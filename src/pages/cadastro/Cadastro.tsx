import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {

    //Hook de navegação
    const navigate = useNavigate();
    //Hook de carregamento
    const [isLoading, setIsLoading] = useState<boolean>(false);
    //Hook de estado do confirma senha
    const [confirmarSenha, setConfirmarSenha] = useState<string>('');
    //Hook de estado do usuario utilizando a Interface com os parametros do Usuário e os zerando
    const [usuario, setUsuario] = useState<Usuario>({
      id: 0,
      nome: '',
      usuario: '',
      senha: '',
      foto: '',
    });

    //compara se o id do usuário é diferente de 0, se for leva o usuário a página de login
    useEffect(() => {
      if (usuario.id !== 0){
        retornar()
      }
    },[usuario])

    //função de levar o usuário para tela de login
    function retornar() {
      navigate('/login')
    }

    //Função de atualizar estado do usuário, acessando campos dos Inputs
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
       setUsuario({
        ...usuario, 
        [e.target.name]: e.target.value //target acessa os campos do elemento no caso (INPUT)
       })
    }

    //Atualiza o state da confirmação de senha.
    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
      setConfirmarSenha(e.target.value)//pega valor digitado no campo ConfirmarSenha
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()// não recarrega a página 

      //valida senha do usuário o comparando com a senha digitada nos dois campos de senha, e validando se maior de 8 caracteres
      if (confirmarSenha === usuario.senha && usuario.senha.length >= 8){

        //diz que o programa está carregando
      setIsLoading(true)
 
      //tenta cadastar um novo usuário com os parâmetros preenchidos através da função localizada no Service cadastrarUsuario
      try{
        //conversa com a API do Back-end para tentar cadastrar um usuário. Método assíncrono, espera resposta sem parar a aplicação
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!')
      }catch(error){
        alert('Erro ao cadastrar o usuário!')
      }
      }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''}) //remove a senha digitada pelo o usuário
      setConfirmarSenha('') //remove a senha digitada no confirmar senha pelo o usuário
      }
 
      //carregamento concluído
    setIsLoading(false)

    }


    return(
        <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center"
        ></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>  
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              value={usuario.nome} //campo recebendo entrada do usuário
              className="border-2 border-slate-700 rounded p-2"
              onChange={atualizarEstado} // React envia o evento automaticamente
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              value={usuario.usuario} //campo recebendo entrada do usuário
              className="border-2 border-slate-700 rounded p-2"
              onChange={atualizarEstado} // React envia o evento automaticamente
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              value={usuario.foto} //campo recebendo entrada do usuário
              className="border-2 border-slate-700 rounded p-2"
              onChange={atualizarEstado} // React envia o evento automaticamente
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              value={usuario.senha} //campo recebendo entrada do usuário
              className="border-2 border-slate-700 rounded p-2"
              onChange={atualizarEstado} // React envia o evento automaticamente
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              value={confirmarSenha} //campo recebendo entrada do usuário
              className="border-2 border-slate-700 rounded p-2"
              onChange={handleConfirmarSenha} // React envia o evento automaticamente
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button 
                type='reset'
                className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
                onClick={retornar}
             >
                Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center'>
                  { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={24}
                  /> : 
                <span>Cadastrar</span>
                }
            </button>
          </div>
          <hr className="border-slate-800 w-full" />

            <p>
                Já possuí uma conta?{' '}
                <Link to='/' className="text-indigo-800 hover:underline">
                Entre
                </Link>
            </p>
        </form>
      </div>
    </>
    )
}

export default Cadastro