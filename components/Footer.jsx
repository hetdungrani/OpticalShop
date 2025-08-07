import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1a3c5a] text-[#cdd6e0] py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3">
            <h5 className="text-white text-lg font-medium border-b-2 border-lime-400 inline-block mb-6 pb-2">
              Our Service
            </h5>
            <p className="text-sm leading-relaxed">
              We offer complimentary eye check-ups in-store and at home. Our
              brand guarantees quality lenses and stylish frames, complete with
              a warranty and replacement policy.
            </p>
          </div>

          <div className="md:w-1/3">
            <h5 className="text-white text-lg font-medium border-b-2 border-lime-400 inline-block mb-6 pb-2">
              Quick Links
            </h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/aboutus"
                  className="text-sm hover:text-white transition-colors"
                >
                  Sale
                </a>
              </li>
              <li>
                <a
                  href="/eyetest"
                  className="text-sm hover:text-white transition-colors"
                >
                  Eye-Test
                </a>
              </li>
              <li>
                <a
                  href="/contactus"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="md:w-1/3">
            <h5 className="text-white text-lg font-medium border-b-2 border-lime-400 inline-block mb-6 pb-2">
              Have a Question?
            </h5>
            <div className="space-y-4">
              <p className="flex items-start text-sm">
                <i className="fas fa-map-marker-alt text-lime-400 w-5 mr-3 pt-1">
                  <FaLocationDot />
                </i>
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
              <p className="flex items-start text-sm">
                <i className="fas fa-phone-alt text-lime-400 w-5 mr-3 pt-1">
                  <FaPhoneFlip />
                </i>
                +1 234 567 890
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
