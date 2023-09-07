import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head'
import YouTubeGraph from '../components/youtube_graph';

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [graphData, setGraphData] = useState(null);
  const data1 = [1, 2, 3, 4, 5];
  const data2 = [5, 4, 3, 2, 1];
  const labels = ['A', 'B', 'C', 'D', 'E'];

  const instance = axios.create({

    baseURL:  "http://127.0.0.1:8000/api/",

    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",      
    },
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("v1/grass/",{ youtube_url: youtubeUrl })
      console.log(response.data)
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
  };
  return (
    
    <div>
   
       <Head>
        <title>草カウンターfor youtube</title>
      </Head>
    <h1>YouTubeチャット草カウンター</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="youtube_url">YouTube動画URL:</label>
      <input
        type="text"
        id="youtube_url"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />
      <button type="submit">解析</button>
    </form>

    {graphData && (
 
     
      <YouTubeGraph videoId={graphData.data.youtube_id} 
                    data1={graphData.data.comment_counts} 
                    data2={graphData.data.grass_counts} 
                    labels={graphData.data.intervals}/>
    )}
  </div>
  )
}
