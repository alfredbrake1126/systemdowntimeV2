import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import { FormContext } from "../context/FormContext";

const Summarize = () => {
  const { formData } = useContext(FormContext);
  const navigate = useNavigate();
  // Check formData.status on page load
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

  const employees = formData.employees;
  const salary = formData.salary;
  const formattedSalary = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(salary);
  const daysDown = formData.daysDown;
  const billingType = formData.billingType;
  let revenueTitle = "";
  if (billingType === "annualRevenue") {
    revenueTitle = "Revenue/Year";
  } else if (billingType === "dailyBilling") {
    revenueTitle = "Revenue/Day";
  } else {
    revenueTitle = "Revenue/Hour";
  }
  const rate = formData.rate;
  const formattedRate = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(rate);
  const sum = formData.sum;
  const formattedSum = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(sum);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data saved successfully:', data);
        navigate("/player2");
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      navigate("/player2");
    }
  };

  return (
    <div className="main-section">
      <Header />
      <main className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-start bg-white text-black pt-[4rem] gap-8">
          <h1 className="text-2xl md:text-3xl font-bold">Systems Going Down Will Cost</h1>
          <div className="mt-6 text-pink-600 text-6xl font-bold">
            {formattedSum}
          </div>
          {/* <p className="mt-2 text-gray-500">(That's £5,345.00 Per Day!)</p> */}

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-6 text-center rounded-md">
              <p className="text-gray-500">Total Employee</p>
              <p className="text-3xl lg:text-xl font-bold">{employees}</p>
            </div>
            <div className="bg-green-100 p-6 text-center rounded-md">
              <p className="text-gray-500">Avg Paid/Year</p>
              <p className="text-3xl lg:text-xl font-bold">{formattedSalary}</p>
            </div>
            <div className="bg-gray-100 p-6 text-center rounded-md">
              <p className="text-gray-500">{revenueTitle}</p>
              <p className="text-3xl lg:text-xl font-bold">{formattedRate}</p>
            </div>
            <div className="bg-green-100 p-6 text-center rounded-md">
              <p className="text-gray-500">Down Days</p>
              <p className="text-3xl lg:text-xl font-bold">{daysDown}</p>
            </div>
          </div>

          <button
            className="mt-8 px-6 py-3 border-2 border-pink-500 text-black hover:bg-pink-500 hover:text-white rounded-md font-semibold uppercase w-[16rem] text-lg tracking-wide"
            onClick={handleSubmit}
          >
            What Have I Won?
          </button>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Summarize;
