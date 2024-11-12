import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { FormContext } from "../context/FormContext";

const Final = () => {
  const { formData } = useContext(FormContext);
  const navigate = useNavigate();

  // Corrected image paths
  const images = [
    require("../assets/final/1.png"),
    require("../assets/final/2.png"),
    require("../assets/final/3.png")
  ];
  const prizeTexts = [
    "ILUX Stress Sheep",
    "ILUX Pen",
    "ILUX Coffee Cup",
  ];

  const [randomImage, setRandomImage] = useState(images[0]);
  const [randomPrize, setRandomPrize] = useState(prizeTexts[0]);

  useEffect(() => {
    let index = Math.floor(Math.random() * images.length);
    setRandomImage(images[index]);
    setRandomPrize(prizeTexts[index]);
    
    if (!formData.status) {
      toast.error("Oops! It looks like your input data was lost. Please start again from the beginning.", {
        autoClose: 3000,
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: false,
        closeButton: false
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [formData.status, navigate, images, prizeTexts]);

  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div className="main-section">
      <Header />
      <main className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-start bg-white text-black pt-[4rem] gap-8">
          <h2 className="text-4xl font-bold">You are a <span className="text-pink-600">Winner</span></h2>
          <img
            src={randomImage}
            alt="Calculator Illustration"
            className="w-[20rem] h-auto"
          />
          <h3 className="text-2xl font-bold text-pink-600">{randomPrize}</h3>
          <button
            className="px-6 py-3 border-2 border-pink-500 text-black hover:bg-pink-500 hover:text-white rounded-md font-semibold uppercase w-[16rem] text-lg tracking-wide"
            onClick={handleSubmit}
          >
            START AGAIN
          </button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Final;
