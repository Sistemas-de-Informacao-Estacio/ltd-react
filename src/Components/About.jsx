import Carrossel from "./Carrossel";
import ElementosAbout from "./ElementosAbout";

function About() {
  return (


    <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8  mt-[-4rem]">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-6 animate-pulse"> Sobre o LTD</h1>

        <p className=" text-2xl font-serif text-white mb-4">Conheça o Laboratório de Tecnologia e Desenvolvimento da Estácio

        </p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2 w-full">
          <Carrossel />
        </div>


        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl font-bold  bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-6 animate-pulse">Inovação e Desenvolvimento</h2>

          <p className="mb-4 font-serif">O Laboratório de Tecnologia e Desenvolvimento (LTD) da Estácio é um espaço onde os estudantes podem transformar conhecimento teórico em soluções práticas, através de projetos realizados em parceria com as prefeituras de São José e Florianópolis.

          </p>

          <p className="mb-4 font-serif">Nosso objetivo é proporcionar aos alunos experiência prática no desenvolvimento de soluções tecnológicas que atendam às necessidades do setor público, ao mesmo tempo em que contribuímos para a modernização e eficiência da administração municipal.

          </p>
          <ElementosAbout/>
        </div>
      </div>

    </div>


  )

}
export default About;