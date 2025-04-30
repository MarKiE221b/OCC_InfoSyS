import React, { useRef, useState } from "react";
import { regionList } from "../../../api/list.js";
import PhoneNumberInput from "../PhoneNumberInput.jsx";

const AddModal = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    contact_number: "",
  });

  const handleAddAccount = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <dialog id="addSuc_Modal" className="modal">
      <div className="modal-box w-full max-w-2xl">
        <h3 className="font-bold text-lg">Add S.U.C.</h3>

        {/* body */}
        {/* select */}
        <form onSubmit={handleAddAccount} ref={formRef}>
          <label className="form-control w-full">
            <div className="label">
              <p className="block text-sm font-medium text-gray-700">
                Select Region<span className="text-red-900"> *</span>
              </p>
            </div>
            <select
              className="select select-bordered"
              value={formData.region}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, region: e.target.value }))
              }
              required
            >
              <option></option>
              {regionList.map((list, key) => (
                <option key={key} value={list.region}>
                  {list.region}
                </option>
              ))}
            </select>
          </label>
          {/* name input */}
          <label className="form-control w-full">
            <div className="label">
              <p className="block text-sm font-medium text-gray-700">
                S.U.C.'s Name<span className="text-red-900"> *</span>
              </p>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </label>
          {/* number input*/}
          <PhoneNumberInput formData={formData} setFormData={setFormData} />
        </form>
        {/* footer */}
        <div className="modal-action">
          <button
            className="btn btn-outline btn-success text-green-800"
            onClick={() => {
              if (formRef.current.checkValidity()) {
                handleAddAccount(
                  new Event("submit", { bubbles: true, cancelable: true })
                );
              } else {
                formRef.current.reportValidity();
              }
            }}
          >
            Add
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-neutral">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddModal;
