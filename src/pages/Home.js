import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormContext } from "../context/FormContext"; // Import your FormContext

const HomePage = () => {
  const { setFormData } = useContext(FormContext); // Use context to get setFormData
  const navigate = useNavigate(); // Initialize useNavigate
  // State for sliders
  const [employees, setEmployees] = useState(0);
  const [salary, setSalary] = useState(106);
  const [daysDown, setDaysDown] = useState(40);
  const [email, setEmail] = useState('');
  const [rate, setRate] = useState(40);
  // Function to handle increment and decrement
  const handleIncrement = (value, setter, step = 1) => {
    setter((prev) => Math.min(prev + step, value.max));
  };

  const handleDecrement = (value, setter, step = 1) => {
    setter((prev) => Math.max(prev - step, value.min));
  };

  // Format numbers with commas
  const formatWithCommas = (value) => {
    return new Intl.NumberFormat().format(value);
  };

  const handleCalculate = () => { 
    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email) {
      toast.error("Please type Email.", {
        autoClose: 3000,
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: false,
        closeButton: false
      });
      return;
    }
    if (!emailRegex.test(email)) {
      toast.warn("Oops! It looks like your email is incorrect type.", {
        autoClose: 3000,
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: false,
        closeButton: false
      });
      return;
    }
  
    let sum = 0;
    sum = ((employees * salary) + rate) / 260 * daysDown; // Replace salary with annual revenue
    let status = true;
  
    // Update form data in context, including the sum
    setFormData({
      employees,
      salary,
      daysDown,
      rate,
      sum, // Store the calculated sum
      email,
      status
    });
  
    // Navigate to player1.js after the calculation
    navigate("/player1"); // Adjust the path according to your routing setup
  };
  

  return (
    <div className="main-section">
      <Header />
      <main className="p-4 md:p-8">
        <div className="w-full grid grid-cols-1 gap-8 justify-center items-center">
          <div className="flex justify-center">
            <table>
              <tbody>
                <tr>
                  <td className="text-right"><label className="block font-bold text-slate-400">Number Of Employees:</label></td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleDecrement({ min: 0 }, setEmployees)}
                      >
                        -
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 font-bold invisible">£</span>
                        <input
                          type="text"
                          value={formatWithCommas(employees)}
                          inputMode="numeric"
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, '');
                            const value = parseInt(rawValue);                   
                            if (value >= 0 && value <= 250) {
                              setEmployees(value);
                            } else if (isNaN(value)) {
                              setEmployees(0); 
                            }
                          }}
                          className="w-36 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
                        />
                        <span className="text-pink-600 font-bold invisible">£</span>
                      </div>
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleIncrement({ max: 250 }, setEmployees)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <label className="block font-bold text-slate-400">Average Employee Salary:</label>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleDecrement({ min: 0 }, setSalary)}
                      >
                        -
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 font-bold">£</span>
                        <input
                          type="text"
                          value={formatWithCommas(salary)}
                          inputMode="numeric"
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, '');
                            const value = parseInt(rawValue);                   
                            if (value >= 0 && value <= 100000) {
                                setSalary(value);
                            } else if (isNaN(value)) {
                                setSalary(0); 
                            }
                          }}
                          className="w-36 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
                        />
                        <span className="text-pink-600 font-bold invisible">£</span>
                      </div>
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleIncrement({ max: 100000 }, setSalary)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <label className="block font-bold text-slate-400">Number Of Days Down:</label>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleDecrement({ min: 1 }, setDaysDown)}
                      >
                        -
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 font-bold invisible">£</span>
                        <input
                          type="text"
                          value={formatWithCommas(daysDown)}
                          inputMode="numeric"
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, '');
                            const value = parseInt(rawValue);                   
                            if (value >= 0 && value <= 90) {
                              setDaysDown(value);
                            } else if (isNaN(value)) {
                              setDaysDown(0);
                            }
                          }}
                          className="w-36 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
                        />
                        <span className="text-pink-600 font-bold invisible">£</span>
                      </div>
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleIncrement({ max: 90 }, setDaysDown)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <label className="block font-bold text-slate-400">Annual Revenue:</label>
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleDecrement({ min: 0 }, setRate)}
                      >
                        -
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-600 font-bold">£</span>
                        <input
                          type="text"
                          value={formatWithCommas(rate)}
                          inputMode="numeric"
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/,/g, '');
                            const value = parseInt(rawValue);                   
                            if (value >= 0 && value <= 20000000) {
                              setRate(value);
                            } else if (isNaN(value)) {
                              setRate(0);
                            }
                          }}
                          className="w-36 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
                        />
                        <span className="text-pink-600 font-bold invisible">£</span>
                      </div>
                      <button
                        className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                        onClick={() => handleIncrement({ max: 20000000 }, setRate)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <label className="block font-bold text-slate-400">Email:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button
                      className="w-full bg-pink-600 text-white py-3 font-bold text-lg rounded hover:bg-pink-700"
                      onClick={handleCalculate} // Call the new handleCalculate function
                    >
                      CALCULATE
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
