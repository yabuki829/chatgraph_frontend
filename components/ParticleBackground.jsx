import React from 'react'
import Particles from 'react-tsparticles';
import particleConfig from './config/particles.config';
import { loadFull } from "tsparticles"

const ParticleBackground = () => {
  const particlesInit = async (main) => {
		console.log(main);

		await loadFull(main);
	};
	const particlesLoaded = (container) => {
		console.log(container);
	};
  return (
    <Particles params={particleConfig}
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}></Particles>
  )
}

export default ParticleBackground