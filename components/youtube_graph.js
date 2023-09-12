
import Chart from 'chart.js/auto';
import { useEffect, useState,useRef } from 'react';

const YouTubeGraph = ({ videoId, data1, data2, labels }) => {
  const [startTime, setStartTime] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      const index = chartElements[0].index;
      const time = labels[index];  
      setStartTime(time);
    }
  };

  useEffect(() => {
    if (data1 && data2 && labels) {
      if (chartInstance.current) {
        // 既存のグラフがあれば破棄する
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        responsive: false,
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

  return (
    <div >
      {videoId && (
          <div>
            <div className='flex justify-center items-center'>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime*60}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
           </div>
        
      <div className='m-10 md:m-auto  md:w-1/2 flex justify-center items-center bg-white'>
        <canvas width="w-full" height="h-full" ref={chartRef} onClick={(e) => handleClick(e, chartInstance.current.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true))} />
      </div>
          </div>
      )}
        
    </div>
  );
};

export default YouTubeGraph;