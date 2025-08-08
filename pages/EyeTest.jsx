import React from "react";
import { Link } from "react-router-dom";

function EyeTest() {
  return (
    <div className="font-sans mt-25">

      <div className="max-w-[1250px] mx-auto px-5 text-center">
        <h1 className="text-3xl font-bold font-['Poppins'] mt-10 mb-5">Free Progressive Lens</h1>
        <a href="/Login">
          <img
            src="assets/img/limg1.jpg"
            alt="Promotional banner for progressive lens"
            className="w-full max-w-full h-auto object-center rounded-2xl mb-6"
          />
        </a>

        <h1 className="text-3xl font-bold font-['Poppins'] mt-10 mb-5">Book Eye Test At Home</h1>
        <img
          src="assets/img/limg2.jpg"
          alt="Promotional banner for home eye test"
          className="w-full h-auto object-center rounded-2xl mb-6"
        />

        <h1 className="text-3xl font-bold font-['Poppins'] mt-10 mb-5">Premium Eyewear</h1>
        <img
          src="assets/img/limg3.jpg"
          alt="Promotional banner for premium eyewear"
          className="w-full h-auto object-center  rounded-2xl mb-6"
        />
      </div>
    </div>
  );
}

export default EyeTest;
