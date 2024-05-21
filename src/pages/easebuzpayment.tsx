// //..................
// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, FormControl, Select, MenuItem } from "@mui/material";
// import MainLayout from "../layouts/MainLayout";

// export default function CombinedPaymentForm() {
//   const [paymentData, setPaymentData] = useState({
//     txnid: "ROCKKPAY" + new Date().getTime(),
//     amount: "",
//     productinfo: "ROCKKPAY",
//     firstname: "Edsom",
//     phone: "8788286618",
//     email: "edsomfintech@gmail.com",
//     surl: "https://edsomfintech.com",
//     furl: "https://edsomfintech.com",
//   });

//   const [mode, setMode] = useState("percentage");
//   const [percentage, setPercentage] = useState("");
//   const [amountNumber, setAmountNumber] = useState("");
//   const [calculatedAmount, setCalculatedAmount] = useState(0);

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setPaymentData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleModeChange = (event: any) => {
//     setMode(event.target.value);
//     setCalculatedAmount(0);
//   };

//   const handleAmountChange = (event: any) => {
//     const newValue = parseFloat(event.target.value);
//     setPaymentData((prevState) => ({
//       ...prevState,
//       amount: newValue.toString(),
//     }));
//     if (mode === "percentage") {
//       const percentageAmount = (newValue * parseFloat(percentage)) / 100;
//       setCalculatedAmount(newValue + percentageAmount);
//     } else {
//       setCalculatedAmount(newValue + parseFloat(amountNumber));
//     }
//   };

//   const handlePercentageChange = (event: any) => {
//     setPercentage(event.target.value);
//     if (mode === "percentage") {
//       const percentageAmount =
//         (parseFloat(paymentData.amount) * parseFloat(event.target.value)) / 100;
//       setCalculatedAmount(parseFloat(paymentData.amount) + percentageAmount);
//     }
//   };

//   const handleAmountNumberChange = (event: any) => {
//     setAmountNumber(event.target.value);
//     if (mode === "number") {
//       setCalculatedAmount(
//         parseFloat(paymentData.amount) + parseFloat(event.target.value)
//       );
//     }
//   };

//   const initiatePayment = async () => {
//     try {
//       const response = await axios.post(
//         "https://api.ipaisa.site/initiate-payment",
//         { ...paymentData, amount: calculatedAmount.toString() } // Use calculatedAmount here
//       );
//       console.log(response.data); // Response from backend
//       if (response.data.status === 1) {
//         // Access key received, use it as needed
//         const accessKey = response.data.data;
//         // Implement this function to use the access key
//         openPaymentGateway(accessKey);
//       } else {
//         console.error("Access key not received from backend");
//       }
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//       // Handle error
//     }
//   };

//   const openPaymentGateway = (accessKey: any) => {
//     console.log("Opening payment gateway with access key:", accessKey);
//     // For example:
//     window.open(`https://pay.easebuzz.in/pay/${accessKey}`, "_blank");
//   };

//   return (
//     <MainLayout>
//       <div className="main-container w-full justify-start items-start ">
//         <h1 className="text-2xl center text-[#FF0000] font-bold">
//           Payment Form
//         </h1>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             initiatePayment();
//           }}
//         >
//           <TextField
//             type="text"
//             name="txnid"
//             placeholder="Transaction ID"
//             value={paymentData.txnid}
//             onChange={handleChange}
//             className="w-64 bg-white mt-4 rounded-sm"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="number"
//             name="amount"
//             placeholder="Amount"
//             value={paymentData.amount}
//             onChange={handleAmountChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="text"
//             name="productinfo"
//             placeholder="Product Info"
//             value={paymentData.productinfo}
//             onChange={handleChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="text"
//             name="firstname"
//             placeholder="First Name"
//             value={paymentData.firstname}
//             onChange={handleChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={paymentData.phone}
//             onChange={handleChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={paymentData.email}
//             onChange={handleChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="text"
//             name="surl"
//             placeholder="Success URL"
//             value={paymentData.surl}
//             onChange={handleChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <TextField
//             type="text"
//             name="furl"
//             placeholder="Failure URL"
//             value={paymentData.furl}
//             onChange={handleChange}
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             required
//           />
//           <br />
//           <div className="flex flex-col">
//             <FormControl className="w-64 h-10 bg-white mt-2">
//               <Select
//                 labelId="mode-select-label"
//                 id="mode-select"
//                 value={mode}
//                 onChange={handleModeChange}
//               >
//                 <MenuItem value="percentage">Percentage</MenuItem>
//                 <MenuItem value="number">Rupees</MenuItem>
//               </Select>
//             </FormControl>
//             {mode === "percentage" && (
//               <TextField
//                 type="number"
//                 placeholder="Enter Percentage"
//                 className="w-64 bg-white mt-2"
//                 inputProps={{
//                   style: {
//                     height: "3px",
//                   },
//                 }}
//                 value={percentage}
//                 onChange={handlePercentageChange}
//               />
//             )}
//             {mode === "number" && (
//               <TextField
//                 type="number"
//                 placeholder="Enter Amount"
//                 className="w-72 bg-white mt-2"
//                 inputProps={{
//                   style: {
//                     height: "5px",
//                   },
//                 }}
//                 value={amountNumber}
//                 onChange={handleAmountNumberChange}
//               />
//             )}
//           </div>
//           <br />
//           <TextField
//             type="text"
//             placeholder="Calculated Amount"
//             className="w-64 bg-white mt-2"
//             inputProps={{
//               style: {
//                 height: "5px",
//               },
//             }}
//             value={calculatedAmount} // Display calculatedAmount here
//             disabled
//           />
//           <br />
//           <button
//             type="submit"
//             className="bg-[#FF0000] mt-4 py-2 px-6 rounded-md text-white"
//           >
//             Pay Now
//           </button>
//         </form>
//       </div>
//     </MainLayout>
//   );
// }









import { useRouter } from 'next/router'; // Next.js router for navigation
import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Create a router instance

  const handleSubmit = (e:any) => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      e.preventDefault(); // Prevent form submission if invalid
      setError('Please enter a valid positive number');
      console.log('Form submission prevented. Invalid amount:', amount);
    } else {
      e.preventDefault(); // Prevent form default behavior
      setError(''); // Clear error if valid

      const targetUrl = `http://192.168.113.177:5000/trigger-rockkpay?amount=${amount}`;
      console.log('Redirecting to:', targetUrl);

      router.push(targetUrl); // Explicitly redirect to the correct URL
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>RockkPay</h1>
      <form
        onSubmit={handleSubmit} // Custom submit logic with explicit redirection
      >
        <label>
          Amount:
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const newAmount = e.target.value;
              setAmount(newAmount); // Update state
              console.log('Input changed:', newAmount);
              setError(''); // Clear error when the input changes
            }}
          />
        </label>
        <button type="submit">Trigger RockkPay</button> {/* Submit button */}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if needed */}
    </div>
  );
}

