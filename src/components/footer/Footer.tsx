import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

function Footer() {

let data = new Date().getFullYear();

return(
<>
    <div className="w-full flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center py-4">
            <p className="text-xl font-bold">
                Blog Pessoal Kauã Vinícius | Copyright: {data}
            </p>
            <p className="text-lg">Acesse minhas redes sociais</p>
            <div className="flex gap-2">
                <a href="www.linkedin.com/in/kauaviniciussabino2707" target="_blank">
                    <LinkedinLogoIcon size={48} weight="bold"/>
                </a>
                <a href="https://github.com/Kauvinzera" target="_blank">
                <GithubLogoIcon size={48} weight="bold"/>
                </a>
                <a href="https://www.instagram.com/kauvin_sabino/" target="_blank">
                    <InstagramLogoIcon size={48} weight="bold"/>
                </a>
            </div>
        </div>
    </div>
</>
) 
}

export default Footer