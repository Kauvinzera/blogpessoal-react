import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

function Footer() {

let data = new Date().getFullYear();

return(
<>
    <div className="min-h-screen flex justify-center bg-indigo-900 text-white">
        <div className="containter flex flex-col items-center py-4">
            <p className="text-xl font-bold">
                Blog Pessoal Kauã Vinícius | Copyright: {data}
            </p>
            <p className="text-lg">Acesse minhas redes sociais</p>
            <div className="flex gap-2">
                <LinkedinLogoIcon size={48} weight="bold"/>
                <GithubLogoIcon size={48} weight="bold"/>
                <InstagramLogoIcon size={48} weight="bold"/>
            </div>
        </div>
    </div>
</>
) 
}

export default Footer