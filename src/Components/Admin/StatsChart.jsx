import { useState, useEffect } from 'react';
import { FaChartLine, FaTrendingUp, FaTrendingDown } from 'react-icons/fa';

function StatsChart({ title, data = [], color = '#3b82f6' }) {
    const [animatedData, setAnimatedData] = useState([]);

    useEffect(() => {
        // Animar os dados gradualmente
        const timer = setTimeout(() => {
            setAnimatedData(data);
        }, 100);

        return () => clearTimeout(timer);
    }, [data]);

    const maxValue = Math.max(...data, 1);
    const trend = data.length >= 2 ? data[data.length - 1] - data[data.length - 2] : 0;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FaChartLine style={{ color }} />
                        {title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {data[data.length - 1] || 0}
                    </p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                    trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                    {trend > 0 ? <FaTrendingUp /> : trend < 0 ? <FaTrendingDown /> : null}
                    {trend !== 0 && `${trend > 0 ? '+' : ''}${trend}`}
                </div>
            </div>

            {/* Mini gráfico de barras */}
            <div className="flex items-end gap-2 h-24">
                {animatedData.map((value, index) => {
                    const height = (value / maxValue) * 100;
                    return (
                        <div
                            key={index}
                            className="flex-1 rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                            style={{
                                backgroundColor: color,
                                height: `${height}%`,
                                minHeight: '8px'
                            }}
                        >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {value}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Labels dos meses */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].slice(0, data.length).map((month, index) => (
                    <span key={index}>{month}</span>
                ))}
            </div>
        </div>
    );
}

export default StatsChart;
