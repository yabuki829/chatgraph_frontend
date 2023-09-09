import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles"; 
import Head from 'next/head'


import particleConfig from "../components/config/particles.config";
import Image from "next/image";
import image1 from "../public/image1.png"
import image2 from "../public/image2.png"
import Header from "../components/header";
const Info = () => {
  const particlesInit = useCallback(async engine => {

    await loadFull(engine);
}, []);

  const particlesLoaded = useCallback(async container => {
      console.log(container);
  }, []);

  return (
   <div>
    <Header/>
    <Head>
      <title>使い方</title>
    </Head>
  <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleConfig}
        className="absolute top-0 left-0 w-full h-full z-[-1]"
      />

      <div className="mt-10  md:w-1/2 bg-white m-auto m-10 p-5">
        <h1 id="howto" className="text-2xl md:text-3xl font-bold">使い方</h1>
        <hr />
        <br />
        <p>youtubeのurlを入力しenterを押す。</p>
        <Image className="md:p-10" src={image1} alt="サービス画像"/>
        <p> 数秒から数十分でグラフが作成されます。</p>
        <p>コメントの総数が多いと30以上かかることがあります。</p>
       
        <Image className="md:p-10" src={image2} alt="サービス画像"/>
      </div>
   </div>
  );
}

export default Info;