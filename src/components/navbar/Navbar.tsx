function Navbar() {
    return (
        <>
            <div className="w-full flex justify-center py-4 text-white bg-indigo-900">
                <div className="container flex justify-between mx-8">
                
                    <div className="text-lg font-bold">
                        Blog Pessoal
                    </div>

                    <div className="flex gap-4">
                        Postagens
                        Temas
                        Cadastrar Tema 
                        Perfil 
                        Sair 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar