import React, { useState } from "react";

const PhoneNumberInput = ({ formData, setFormData }) => {
  const [error, setError] = useState("");

  // Validate Philippine phone number (starts with 09 and has 11 digits)
  const phoneRegex = /^09\d{9}$/;

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, contact_number: value }));

    if (phoneRegex.test(value)) {
      setError("");
    } else {
      setError("Please enter a valid Philippine phone number.");
    }
  };

  return (
    <div className="mt-2">
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        Philippine Phone Number
      </label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.contact_number}
        onChange={handleChange}
        maxLength="11"
        placeholder="0917XXXXXXX"
        className={`input input-bordered w-full mt-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required
      />
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
