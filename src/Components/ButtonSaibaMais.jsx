function ButtonSaibaMais({onClick, to}) {
    if (to) {
        return (
            <span className="text-white bg-blue-500 border-2 border-blue-800 px-20 py-2 rounded-2xl hover:bg-blue-800 hover:text-white transition cursor-pointer inline-block">
                Saiba mais
            </span>
        );
    }
    
    return (
        <button onClick={onClick} className="text-white bg-blue-500 border-2 border-blue-800 px-20 py-2 rounded-2xl hover:bg-blue-800 hover:text-white transition">
            Saiba mais
        </button>
    );
}

export default ButtonSaibaMais;