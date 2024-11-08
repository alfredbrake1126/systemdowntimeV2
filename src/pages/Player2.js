import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import VideoPlayer from "../components/VideoPlayer";

// Import the video file from assets
import video2 from "../assets/2.mp4";

const Player2 = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const videoTitle = "My Video Title"; // Title for the video
  const autoPlay = true;

  // Function to navigate after video ends
  const handleVideoEnd = () => {
    navigate("/final"); // Replace with your desired route
  };

  return (
    <div className="flex flex-col h-screen"> {/* Set full height */}
      <Header />
      <main className="flex-grow pt-[2rem]"> {/* Allow main to grow */}
        <VideoPlayer 
          src={video2} 
          title={videoTitle} 
          autoPlay={autoPlay} 
          onVideoEnd={handleVideoEnd} // Pass the function as a prop
        />
      </main>
    </div>
  );
};

export default Player2;
