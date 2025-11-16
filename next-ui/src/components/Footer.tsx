import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-10 p-4 bg-white text-black text-center border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4">
                <Link href="/"><Image src="/logo.png" alt="Logo" width={100} height={100} /></Link>
                <p className="text-sm">&copy; {new Date().getFullYear()} Matripanne™. Todos os direitos reservados. Feito com ❤️ por JojaLabz</p>
            </div>
        </footer>
    );
}