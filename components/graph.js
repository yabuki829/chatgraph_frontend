import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WaveformChart = ({ data1, data2, labels }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data1 && data2 && labels) {
      if (chartInstance.current) {
        // 既存のグラフがあれば破棄する
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'コメントの数',
              data: data1,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
            },
            {
              label: '草とコメントされた数',
              data: data2,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }, [data1, data2, labels]);

  return <canvas  ref={chartRef} />;
};

export default WaveformChart;