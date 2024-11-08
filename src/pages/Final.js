import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import coffee from "../assets/coffee.jpg";
import { FormContext } from "../context/FormContext";

const Final = () => {
  const { formData } = useContext(FormContext);
  const navigate = useNavigate(); // Initialize useNavigate
  
  useEffect(() => {
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
  }, [formData.status, navigate]);

  const handleSubmit = () => {
    // Navigate to player1.js after the calculation
    navigate("/"); // Adjust the path according to your routing setup
  };
  return (
    <div className="main-section">
      <Header />
      <main className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-start bg-white text-black pt-[4rem] gap-8">
          <img
            src={coffee}
            alt="Calculator Illustration"
            className="w-[30rem] h-auto"
          />
          <p className="font-semibold text-black">ILUX Insulated Travel Coffee Mug</p>
          <button
            className="mt-8 px-6 py-3 border-2 border-pink-500 text-black hover:bg-pink-500 hover:text-white rounded-md font-semibold uppercase w-[16rem] text-lg tracking-wide"
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
