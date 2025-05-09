import { DiPython } from 'react-icons/di';
import { SiJavascript, SiNodedotjs, SiDocker, SiTensorflow } from 'react-icons/si';
import { FaReact, FaNetworkWired, FaCoffee, FaCloud } from 'react-icons/fa';
import { ImDatabase } from "react-icons/im";

function Technologies() {
  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2 animate-pulse leading-snug">
          Tecnologia utilizadas no LTD
        </h1>

        <p className="text-2xl font-serif text-white mb-2">
          Ferramentas e linguagens aplicadas em nossos projetos
        </p>
      </section>

      <section className="w-full max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-6">

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <DiPython className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">Python</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaCoffee className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">Java</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <SiJavascript className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">JavaScript</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaReact className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">React</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <SiNodedotjs className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">Node.js</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <ImDatabase className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">SQL</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaCloud className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">AWS</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <SiDocker className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">Docker</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <SiTensorflow className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">TensorFlow</h4>
          </div>

          <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaNetworkWired className="text-2xl text-blue-400 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-white mb-2">Redes</h4>
          </div>
        </div>
      </section >
    </div >
  )
}
export default Technologies;