import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head'
import YouTubeGraph from '../components/youtube_graph';
import Header from '../components/header.jsx';

import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles"; 
import particleConfig from "../components/config/particles.config";
import Loading from '../components/load';

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const particlesInit = useCallback(async engine => {

    await loadFull(engine);
}, []);

  const particlesLoaded = useCallback(async container => {
      console.log(container);
  }, []);

  // apiのクラスを作成する
  const instance = axios.create({

    // baseURL:  "http://127.0.0.1:8000/api/",
    baseURL:"https://chatgraph.onrender.com/api/",

    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",      
    },

  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGraphData([])
    if (isLoading) {
        return;
    }

    setIsLoading(true);       
    let next = 0;
    let duration = 0
    while (next >= 0) {  
        try {
            const response = await instance.post("v1/grass/", { youtube_url: youtubeUrl ,page: next ,duration:duration});
            console.log(response.data)
            // 既存のgraphDataと新しいデータを結合する
            setGraphData(prevData => ({
              comment_counts: [...(prevData?.comment_counts || []), ...response.data.data["comment_counts"]],
              grass_counts: [...(prevData?.grass_counts || []), ...response.data.data["grass_counts"]],
              intervals: [...(prevData?.intervals || []), ...response.data.data["intervals"]],
              youtube_id: response.data.data["youtube_id"],
              duration: response.data.data["duration"],
              next: response.data.data["next"]
          }));

            next = response.data.data["next"];
            duration = response.data.data["duration"]
            if (next === -1) {
              console.log("-1なので終了する")
              console.log(graphData)
              break
            } 

        } catch (error) {
            console.error('Error during fetching:', error);
            break; // エラーが発生した場合、ループを終了します
        }
    }

    setIsLoading(false);
    
};
  
  return (
    
    <div className='relative z-10'> 
       {isLoading && <Loading />} 
     <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleConfig}
        className="absolute top-0 left-0 w-full h-full z-[-1]"
      />
      
       <Head>
        <title>草カウンターfor youtube</title>
      </Head>
      <Header/>
      <div className='mt-24 md:mt-32 h-32 flex flex-col justify-center items-center  '>
        <h1 className='font-bold text-2xl md:text-3xl  '>草カウンター for Youtube</h1>
       
      </div>
      
      <form className='w-full flex flex-col justify-center items-center mb-20' onSubmit={handleSubmit}>
          <input
            className='rounded-full bg-gray-100 w-3/4 md:w-2/5 h-12 px-4 md:m-auto shadow md:shadow-lg'
            type="text"
            id="youtube_url"
            value={youtubeUrl}
            placeholder="Youtubeのurlを入力"
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <br />
          <p>貧弱サーバーのため取得できない場合がございます。</p>
        </form>

    <div className='mb-32'>
    {graphData && (
      <YouTubeGraph  
        videoId={graphData.youtube_id} 
        data1={graphData.comment_counts} 
        data2={graphData.grass_counts} 
        labels={graphData.intervals}
      />
    )}

    </div>
    
 
  </div>
  )
}
