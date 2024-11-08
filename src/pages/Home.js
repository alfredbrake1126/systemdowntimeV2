import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import home from "../assets/home.png";
import { FormContext } from "../context/FormContext"; // Import your FormContext

const HomePage = () => {
  const { setFormData } = useContext(FormContext); // Use context to get setFormData
  const navigate = useNavigate(); // Initialize useNavigate
  // State for sliders
  const [employees, setEmployees] = useState(0);
  const [billableEmployees, setBillableEmployees] = useState(0);
  const [salary, setSalary] = useState(106);
  const [daysDown, setDaysDown] = useState(40);
  const [billingType, setBillingType] = useState("annualRevenue");
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
    let sum = 0; // Initialize sum variable for the calculation
  
    // Calculate based on selected billing type
    switch (billingType) {
      case "annualRevenue":
        sum = ((employees * salary) + rate) / 260 * daysDown; // Replace salary with annual revenue
        break;
      case "dailyBilling":
        sum = ((employees * salary / 260) + (billableEmployees * rate)) * daysDown; // daily billing rate
        break;
      case "hourlyBilling":
        sum = ((employees * salary / 260) + (billableEmployees * rate * 7.5)) * daysDown; // hourly billing rate
        break;
      default:
        sum = 0; // In case of no valid billing type
        break;
    }
    let status = true;
    // Update form data in context, including the sum
    setFormData({
      employees,
      billableEmployees,
      salary,
      daysDown,
      billingType,
      rate,
      sum, // Store the calculated sum
      status
    });
    // Navigate to player1.js after the calculation
    navigate("/player1"); // Adjust the path according to your routing setup
  };

  return (
    <div className="main-section">
      <Header />
      <main className="p-4 md:p-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-start">
          {/* Left Section: Form */}
          {/* <div> */}
            <div className="space-y-6">
              {/* Number of Employees Slider */}
              <div>
                <label className="block font-bold text-slate-400">Number Of Employees</label>
                <input
                  type="range"
                  min="0"
                  max="250"
                  value={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full hidden"
                />
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
                      className="w-24 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
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
              </div>

              {/* Number of Billable Employees Slider */}
              <div>
                <label className="block font-bold text-slate-400">Number Of Billable Employees</label>
                <input
                  type="range"
                  min="0"
                  max="250"
                  value={billableEmployees}
                  onChange={(e) => setBillableEmployees(parseInt(e.target.value))}
                  className="w-full hidden"
                />
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                    onClick={() => handleDecrement({ min: 0 }, setBillableEmployees)}
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-600 font-bold invisible">£</span>
                    <input
                      type="text"
                      value={formatWithCommas(billableEmployees)}
                      inputMode="numeric"
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, '');
                        const value = parseInt(rawValue);                   
                        if (value >= 0 && value <= 250) {
                          setBillableEmployees(value);
                        } else if (isNaN(value)) {
                          setBillableEmployees(0); 
                        }
                      }}
                      className="w-24 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
                    />
                    <span className="text-pink-600 font-bold invisible">£</span>
                  </div>
                  <button
                    className="px-3 py-1 bg-transparent h-10 w-10 border border-gray-300 shadow-md rounded-full"
                    onClick={() => handleIncrement({ max: 250 }, setBillableEmployees)}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Average Employee Salary Slider */}
              <div>
                <label className="block font-bold text-slate-400">Average Employee Salary</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={salary}
                  onChange={(e) => setSalary(parseInt(e.target.value))}
                  className="w-full hidden"
                />
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
                      className="w-24 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
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
              </div>


              {/* Number of Days Down Slider */}
              <div>
                <label className="block font-bold text-slate-400">Number Of Days Down</label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={daysDown}
                  onChange={(e) => setDaysDown(parseInt(e.target.value))}
                  className="w-full hidden"
                />
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
                      className="w-24 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
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
              </div>

              {/* Billing Options */}
              <div>
                <div className="mt-2 space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="annualRevenue"
                      value="annualRevenue"
                      checked={billingType === "annualRevenue"}
                      onChange={(e) => setBillingType(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="annualRevenue">Annual Revenue</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="dailyBilling"
                      value="dailyBilling"
                      checked={billingType === "dailyBilling"}
                      onChange={(e) => setBillingType(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="dailyBilling">
                      Average Employee Daily Billing Rates
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="hourlyBilling"
                      value="hourlyBilling"
                      checked={billingType === "hourlyBilling"}
                      onChange={(e) => setBillingType(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="hourlyBilling">
                      Average Employee Hourly Billing Rates
                    </label>
                  </div>
                </div>
              </div>

              {/* Employee Rate Slider */}
              <div>
                <input
                  type="range"
                  min="0"
                  max="20000000"
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="w-full hidden"
                />
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
                      className="w-24 text-center text-pink-600 font-bold bg-transparent focus:outline-none border-dashed border-2 border-pink-600"
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
              </div>

              {/* Calculate Button */}
              <div>
                <button
                  className="w-full bg-pink-600 text-white py-3 font-bold text-lg rounded hover:bg-pink-700"
                  onClick={handleCalculate} // Call the new handleCalculate function
                >
                  CALCULATE
                </button>
              </div>
            </div>
          {/* </div> */}

          {/* Right Section: Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <img
              src={home}
              alt="Calculator Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
