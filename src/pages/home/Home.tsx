import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"



// rtcf
function Home() {
    return (
        //usa <> </> Pois o return identifica tudo como único, e não quebra
        <>
            <div className="bg-indigo-900 flex justify-center ">
                <div className="container grid grid-cols-2 text-white">
                    <div className="flex flex-col gap-4 items-center justify-center py-4">     
                        <h2 className="text-5xl font-bold">
                            Seja Bem Vinde!
                        </h2>
                        <p className="text-2xl"> 
                            Expresse aqui seus pensamentos e opniões
                        </p>
                        <div className="flex justify-around gap-4">
                             <ModalPostagem />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstBf2H4lBlFUZLwuhMYJcN7lIPu1otiI9vQ&s" alt="Diva máxima Claire Redfield" className="w-3/4">
                        </img>
                    </div>
                </div>
            </div>
             <ListaPostagens />
        </>
    )
}

export default Home