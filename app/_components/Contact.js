'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust according to your UI library
import { Label } from "@/components/ui/label"; // Adjust according to your UI library

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError(""); // Clear error message
    setSuccessMessage("Your message has been sent successfully!"); // Simulate success
    // Here you can add logic to send the form data to your backend
  };

  return (
    <div className="bg-brand py-6 px-4  mt-14 md:mt-16 " id="contact">
    <div className="md:max-w-2xl max-w-auto mx-auto my-10 p-6 bg-[#FEF7FF] shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Get in Touch
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brand"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brand"
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="2"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brand"
            required
          ></textarea>
        </div>
        <Button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2 rounded-md transition duration-200">
          Send Message
        </Button>
      </form>
    </div>
    </div>
  );
};

export default Contact;
