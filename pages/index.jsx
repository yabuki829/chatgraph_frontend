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
  const [graphData, setGraphData] = useState(null);
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
    baseURL:"https://django-render-w9mc.onrender.com/api/",

    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",      
    },

  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoading) {
        return
      }
      setIsLoading(true)       
      const response = await instance.post("v1/grass/",{ youtube_url: youtubeUrl })
      setGraphData(response.data); 
     
    } catch (error) {
      if (error.response) {
        console.error('エラー１:', error.response.data);
      } else if (error.request) {
        console.error("エラー2",'API request was made but no response was received', error.request);
      } else {
        console.error("エラー3",'Error setting up the request', error.message);
      }
    }
    finally {
      setIsLoading(false);  // ← 応答が完了したらローディング状態をfalseに設定
    }
  };
  
  return (
    
    <div className='relative z-10'> {/* z-indexを1に設定する */}
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
               <p>コメントの総数が多いと20分以上かかります</p>
        </form>

    <div className='mb-32'>
    {graphData && (
      <YouTubeGraph  videoId={graphData.data.youtube_id} 
                    data1={graphData.data.comment_counts} 
                    data2={graphData.data.grass_counts} 
                    labels={graphData.data.intervals}/>
    )}
    </div>
    
 
  </div>
  )
}
