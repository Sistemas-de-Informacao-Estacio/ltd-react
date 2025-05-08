import { useState } from "react";
import Apps from "../Components/Apps";
import About from "../Components/About";

function Home() {
  const [app, setApp] = useState('Home');

  const handleNavegação = (page) => {
    setApp(page);
  }

 if (app === 'Apps') 
  return <Apps/>;
 if (app === 'Sobre')
  return <About/>

 
  return (
    <div className="h-screen  pt-24 bg-gray-900 text-white overflow-hidden">
      <section className="text-center p-8">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-6 animate-pulse leading-tight">
          Laboratório de Tecnologia e Desenvolvimento
        </h1>
        <p className=" text-2xl font-serif max-w-xl text-center mx-auto">
          Uma parceria entre a Estácio e as Prefeituras de São José e Florianópolis para inovação tecnológica no setor público
        </p>

        <div className="mt-6 flex justify-center gap-4">

          <button onClick={() => handleNavegação('Apps')} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
            Nossos Aplicativos
          </button>

          <button onClick={() => handleNavegação('Sobre')} className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition">
            Saiba mais
          </button>

        </div >
      </section>
    </div>

  )
}
export default Home;