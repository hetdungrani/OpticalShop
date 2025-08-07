import React, { useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";
import toast from "react-hot-toast";


function ContactUs() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pno: "",
    reason: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, pno, reason, message } = formData;

    if (!fname || !lname || !email || !pno || !reason || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        firstname: fname,
        lastname: lname,
        email,
        phonenumber: pno,
        reasonforcontact: reason,
        message,
      });

      if (response.status === 201) {
        toast.success("Your record has been saved successfully!");
        setFormData({
          fname: "",
          lname: "",
          email: "",
          pno: "",
          reason: "",
          message: "",
        });
      } else {
        toast.error("Failed to save the record.");
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Something went wrong while saving your message.");
    }
  };
  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Contact Information
          </h2>
          <hr className="mb-6" />
          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <i className="fas fa-envelope text-xl  text-blue-700 w-6">
                <MdEmail />
              </i>
              <div>
                <b className="block">Email Address</b>
                <span>contact@opticalshope.ae</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="fas fa-phone-alt text-xl text-blue-700 w-6">
                {" "}
                <FaPhoneFlip />{" "}
              </i>
              <div>
                <b className="block">Contact Number</b>
                <span>1000-100-001</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <i className="fas fa-map-marker-alt text-xl text-blue-700 w-6">
                {" "}
                <FaLocationDot />
              </i>
              <div>
                <b className="block">Address</b>
                <span>
                  Optical Shope, G04, AR Mall,Varachha, Surat, Gujarat
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg h-80">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.167951829623!2d72.87919937510115!3d21.2252119804743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f4465373a9f%3A0x8e925c1059f3df3!2sLenskart.com%20at%20Mota%20Varachha%2C%20Surat!5e0!3m2!1sen!2sin!4v1721643445100!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white mt-12 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Get In Touch
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have a question? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="pno"
                value={formData.pno}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Reason for Contact
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g., Order Inquiry, Feedback"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
