import { useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
 
function Navbar() {
 
    const navigate = useNavigate();
 
    //utilizando o Hook de UseContext do AuthContext
    const { usuario, handleLogout } = useContext(AuthContext)

    // função para sair da conta vínculada
    function logout() {
        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    let component: ReactNode


    const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false)
    const token = usuario.token
    
        useEffect(() => {
            if (token === '') {
                setUsuarioLogado(false)
            } else  {
                setUsuarioLogado(true)
            }

        }, [token])

        if(token !== "") {
            component = (
            
            <div className='w-full flex justify-center py-4
                        bg-indigo-900 text-white'>
                <div className="container flex justify-between text-lg mx-8">
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
                    <p>{usuarioLogado ? "Bem-vindo " + usuario.nome : ""}</p>
                    <div className='flex gap-4'>
                        <Link to='/postagens' className="hover:underline">Postagens</Link>
                        <Link to='/temas' className="hover:underline">Temas</Link>
                        <Link to='/cadastartema' className="hover:underline">Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
        </div>)
        }
    
    return (
        <>
        { component }      
        </>
    )
}
 
export default Navbar