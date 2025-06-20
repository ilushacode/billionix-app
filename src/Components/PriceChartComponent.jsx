import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const PriceChartComponent = ({ data }) => {
  if (!data || data.length < 2) {
    return <p>Недостаточно данных для построения графика</p>;
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.datetime) - new Date(b.datetime)
  );

  const prices = sortedData.map(item => parseFloat(item.price)).filter(n => !isNaN(n));

  const labels = sortedData.map((_, index) => index); // индексы как метки

  // Создаем датасеты для сегментов
  const datasets = [];

  for (let i = 1; i < prices.length; i++) {
    const prev = prices[i - 1];
    const current = prices[i];
    const color = current > prev ? '#66c04a' : '#be4848';

    datasets.push({
      label: `Сегмент ${i}`,
      data: [
        { x: i - 1, y: prev },
        { x: i, y: current }
      ],
      borderColor: color,
      backgroundColor: color,
      tension: 0.2,
      pointRadius: [0, 3], // точка только в конце
      pointStyle: 'circle',
      pointBackgroundColor: 'transparent',
      pointBorderColor: color,
      showLine: true,
      fill: false,
      spanGaps: false,
    });
  }

  // Добавляем финальную точку, чтобы она отображалась
  datasets.push({
    label: 'Финальная точка',
    data: [{ x: prices.length - 1, y: prices[prices.length - 1] }],
    borderColor: 'transparent',
    pointRadius: 3,
    pointStyle: 'circle',
    pointBackgroundColor: 'transparent',
    pointBorderColor: prices.length > 1
      ? prices[prices.length - 1] > prices[prices.length - 2]
        ? 'rgb(75, 250, 180)'
        : 'rgb(255, 99, 132)'
      : 'gray',
    showLine: false,
  });

  // Добавляем невидимый dataset, чтобы график доходил до конца
  datasets.push({
    label: 'График до конца',
    data: [
      { x: 0, y: null },
      { x: prices.length - 1, y: null }
    ],
    borderColor: 'transparent',
    pointRadius: 0,
    showLine: true,
    spanGaps: false
  });

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false, // ✅ Включаем тултип
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: false, // ❌ Скрываем легенду
      }
    },
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: prices.length - 1,
        title: {
          display: false,
          text: 'Время', // ✅ Подпись оси X
          color: '#666',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const date = sortedData[value]?.datetime;
            return date ? new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          }
        }
      },
      y: {
        title: {
          display: false,
          text: 'Цена', // ✅ Подпись оси Y
          color: '#666',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          callback: (value) => value
        }
      }
    }
  };

  return (
    <div style={{ height: '30vh' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceChartComponent;