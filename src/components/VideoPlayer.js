import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src, title, autoPlay, onVideoEnd }) => {
  const videoRef = useRef(null);

  // Function to handle full-screen mode
  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) { // Firefox
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
      videoRef.current.msRequestFullscreen();
    }
  };

  // Automatically enter full-screen mode when video is loaded
  useEffect(() => {
    const videoElement = videoRef.current;

    const onLoadedData = () => {
      handleFullScreen();
    };

    videoElement.addEventListener('loadeddata', onLoadedData);

    // Cleanup event listener on component unmount
    return () => {
      videoElement.removeEventListener('loadeddata', onLoadedData);
    };
  }, []);

  return (
    <div className="video-player">
      <div className="relative w-full h-[calc(100vh-176px)]">
        <video 
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full" 
          controls 
          autoPlay={autoPlay} 
          onEnded={onVideoEnd}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
