import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="scroll-mt-24 mb-16 py-12 border-b border-gray-200">
            {/* ✅
                1. flex-col: Padrão (mobile) para empilhar verticalmente (Imagem acima do texto).
                2. md:flex-row: Volta para o layout lado a lado em telas médias/grandes.
                3. md:space-x-8: Adiciona espaço horizontal apenas no desktop.
                4. space-y-8: Adiciona espaço vertical no mobile.
            */}
            <div className="flex flex-col md:flex-row space-y-8 md:space-x-8 md:space-y-0 items-center">
                
                {/* ✅ ORDEM: 
                    1. Em mobile (flex-col), a imagem (order-1) vem antes do texto (order-2).
                    2. Em desktop (md:flex-row), a ordem volta para a original (order-2, order-1), 
                       Vamos reverter a ordem do texto para garantir que ele fique na esquerda no desktop.
                */}
                <div className="order-2 md:order-1"> 
                    <h1 className="text-5xl font-extrabold text-[#C69C6D] mb-4">Bem-vindo à Matripanne™</h1>
                    <p className="text-2xl text-[#C69C6D] max-w-3xl">A <strong>Matripanne™</strong> é um site de e-commerce de panetones recheados, onde vocês irão encontrar os melhores panetones para adoçar o natal de quem você ama.</p>
                    <br />
                    <p className="text-2xl text-[#C69C6D] max-w-2xl">É um projeto de um jovem casal que tem o intuito de trazer mais sabor para o natal de quem mais importa para você, além disso, a Matripanne™ tem o objetivo de realizar o nosso casamento e fazer o nosso sonho se tornar real.</p>
                </div>
                
                {/* ✅ IMAGEM: 
                    1. order-1: Garante que a imagem venha primeiro no layout mobile (flex-col).
                    2. md:order-2: Garante que a imagem volte para a direita no desktop (flex-row).
                    3. w-full: Ocupa toda a largura do mobile.
                    4. md:w-1/2: Ocupa metade da largura no desktop.
                */}
                <Image 
                    src="/logo2.png" 
                    alt="Matripanne™" 
                    width={1000} 
                    height={1000} 
                    className="order-1 md:order-2 w-full md:w-1/2 h-full object-cover" 
                />
            </div>
        </section>
    )
}