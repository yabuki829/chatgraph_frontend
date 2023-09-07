import React from 'react';

const YouTubeEmbed = ({ videoId, width = 560, height = 315, start = 0 }) => {
  return (
    <div className="youtube-container">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}?start=${start}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;