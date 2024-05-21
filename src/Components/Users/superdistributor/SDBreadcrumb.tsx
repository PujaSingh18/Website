import { adminImg } from "@/src/Assets/admin";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SDBreadcrumb() {
  const [data, setData] = useState<any>();
  const [data1, setData1] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };
        const response = await axios.get(
          // "http://api.ipaisa.site/api/protected/balance",
          "http://localhost:5000/api/protected/balance",
          {
            headers: headers,
          }
        );
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="w-full main-container h-full flex flex-col items-start justify-start gap-4 mb-8">
      <div className="w-full h-[70%] flex items-center justify-between gap-4 ">
        <div className="w-full h-full rounded-3xl bg-gradient-to-r from-[#C420ED] to-[#6C45BF] shadow-[0_10px_20px_rgba(00,00,00)] flex flex-col items-center justify-center gap-6">
          <h1 className="text-2xl font-bold capitalize text-white ">
            Wallet Balance
          </h1>
          <h1 className="text-2xl font-bold capitalize text-white ">
            {data?.balance} &#x20B9;
          </h1>
        </div>
      </div>
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_10px_20px_rgba(00,00,00)]">
        <img src={adminImg.src} alt="" className="w-full h-full object-fill" />
      </div>
    </section>
  );
}
