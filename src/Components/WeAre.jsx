import QuadradoSistemas from "../Components/QuadradoSistemas"

function WeAre() {


  return (
      <div>
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2 animate-pulse leading-snug">
          Quem Somos
        </h1>

        <p className="text-2xl font-serif text-white">
          Conheça nossos cursos e o perfil dos alunos envolvidos no LTD
        </p>
      </div>

      <div className="grid grid-cols-auto-fit min-[300px] gap-8 mt-10">

        <QuadradoSistemas/>

      </div>
    </div>
  )
}
export default WeAre;