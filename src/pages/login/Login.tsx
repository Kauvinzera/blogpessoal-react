import {useContext, useEffect, useState,  type ChangeEvent,  type FormEvent} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { ClipLoader } from "react-spinners";

function Login() {

  // Hook responsável pela navegação entre páginas
  const navigate = useNavigate();

  // Consumindo informações e funções do Context API
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  // State responsável pelos dados do formulário
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  // Sempre que o usuário mudar, verifica se existe token válido
  useEffect(() => {
    // Se existir token, redireciona para home
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  // Atualiza o state conforme o usuário digita
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      // Mantém os dados anteriores
      ...usuarioLogin,
      // Atualiza dinamicamente o campo alterado
      [e.target.name]: e.target.value
    });
  }

  // Função executada ao enviar o formulário
  async function login(e: FormEvent<HTMLFormElement>) {
    // Impede recarregamento da página
    e.preventDefault();
    // Realiza autenticação
    await handleLogin(usuarioLogin);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        {/* Formulário */}
        <form
          className="flex justify-center items-center flex-col w-1/2 gap-4"
          onSubmit={login}
        >
          {/* Título */}
          <h2 className="text-slate-900 text-5xl">
            Entrar
          </h2>
          {/* Campo Usuário */}
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              // Valor armazenado no state
              value={usuarioLogin.usuario}
              // React envia o evento automaticamente
              onChange={atualizarEstado}
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              // Valor armazenado no state
              value={usuarioLogin.senha}
              // React envia o evento automaticamente
              onChange={atualizarEstado}
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="
              rounded bg-indigo-400 flex justify-center
              hover:bg-indigo-900 text-white
              w-1/2 py-2
            ">
            {/* Renderização condicional */}
            {
              isLoading ?
                <ClipLoader
                  color="#ffffff"
                  size={24}
                />
                :
                <span>
                  Entrar
                </span>
            }
          </button>

          {/* Linha divisória */}
          <hr className="border-slate-800 w-full" />

          {/* Link para cadastro */}
          <p>
            Ainda não tem uma conta?{" "}

            <Link
              to="/cadastro"
              className="text-indigo-800 hover:underline"
            >
              Cadastre-se
            </Link>

          </p>

        </form>
        {/* Imagem lateral */}
        <div
          className="
            bg-[url('https://i.imgur.com/ZZFAmzo.jpg')]
            lg:block hidden
            bg-no-repeat
            w-full
            min-h-screen
            bg-cover
            bg-center
          ">
        </div>
      </div>
    </>
  );
}

export default Login;