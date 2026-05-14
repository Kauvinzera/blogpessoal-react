import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";


function Perfil() {

    const navigate = useNavigate();

    const {usuario} =  useContext(AuthContext)
    const token = usuario.token


    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado", "erro")
            navigate("/")
        }
    }, [token])

    return (
        <>
            <div className="flex justify-center mx-4">
                <div className=" container mx-auto my-4 rounded-2xl overflow-hidden">
                    <img className="w-full h-72 object-cover object-top border-b-8 border-white"
                    src="https://www.residentevildatabase.com/wp-content/uploads/2018/07/re2-remake-claire-redfield-harley.jpg"
                    alt="Capa do Perfil"/>

                    <img className="w-full h-72 object-cover object-top border-b-8 border-white"
                    src={usuario.foto}
                    alt="Foto de Perfil"/>

                    <div className="relative mt-[-0.5rem] h-72 flex flex-col bg-sky-500 text-white text-2xl items-center justify-center">
                        <p>Nome: {usuario.nome}</p>
                        <p>Email: {usuario.usuario}</p>
                    </div>
                </div>
            </div>
        </>

    )
}


export default Perfil