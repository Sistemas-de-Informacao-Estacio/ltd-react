import InforCyberSec from "../Components/InforCyberSec";
import { FaShieldAlt } from "react-icons/fa";
import ButtonSaibaMais from "../Components/ButtonSaibaMais";
import { useState, useEffect } from "react";

function CyberSec() {
  const [site, setSite] = useState(false);

  useEffect(() => {
    if(site) {
      window.open("https://cybershield-ecru.vercel.app/", "_blank")
    }
  }, [site])

  return (
    <div>
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2 animate-pulse leading-snug">
          Segurança da Informação

        </h1>
        <p className="text-2xl sm:text-2xl font-serif text-white">
          Práticas e ferramentas para proteção dos sistemas e dados municipais
        </p>
      </div>

      <div className="mt-10 mb-10 mx-auto bg-gray-500 p-6 rounded-xl shadow-xl w-full min-h-[700px] h-auto max-w-4xl flex flex-col text-white items-center
      border border-transparent hover:border-blue-400 hover:shadow-blue-400/50 hover:shadow-lg transition-all duration-300">

        <h3 className="text-2xl text-center font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2 leading-snug">
          CyberSec
        </h3>
        <p className="font-serif text-white">
          Soluções de segurança desenvolvidas pelo LTD para proteger a infraestrutura digital da prefeitura
        </p>

        <InforCyberSec/>

        <div className="self-start text-base space-y-2">
          <FaShieldAlt className="text-2xl" />
          <h3 className="font-semibold">
            CyberShield Portal
          </h3>

          <p>
            Portal especializado em cibersegurança para municípios, desenvolvido pelos alunos do LTD
            Inclui treinamentos, ferramentas e recursos de conscientização em segurança
          </p>

          <ButtonSaibaMais onClick={() => setSite(true)}/>
        </div>

      </div>
    </div>
  )
}
export default CyberSec;