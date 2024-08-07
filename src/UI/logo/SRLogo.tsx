import { ShieldCheckIcon } from "@heroicons/react/24/outline";

import { lusitana } from "@/ui/fonts/fonts";

export default function SRLogo(){
    return (
        <div className={`${lusitana.className} 
        flex flex-row items-center leading-none text-black md:flex`}>
            <ShieldCheckIcon className="h-12 w-12" />
            <p className="text-[38px]">
                SecureRotate
            </p>
        </div>
    );
}