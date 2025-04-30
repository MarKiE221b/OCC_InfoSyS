import React, { useRef, useState } from "react";
import { useAddProgram } from "../../../hooks/useProgram";

const AddModal = () => {
  const formRef = useRef(null);
  const details = JSON.parse(localStorage.getItem("USER_DETAILS"));

  const {
    mutateAsync: addProgram,
    isPending: programIsPending,
    isSuccess: programIsSuccess,
    isError: programIsError,
  } = useAddProgram();

  const [formData, setFormData] = useState({
    suc_id: details.suc_id,
    programName: "",
    major: "",
    copc: "",
    dateIssued: "",
    chedAccreditation: "",
    serialNumber: "",
  });

  // Add this near your other state declarations
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Handle the form submission
  const handleAddAccount = async (e) => {
    e.preventDefault();

    try {
      await addProgram(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      setFormData({
        suc_id: details.suc_id,
        programName: "",
        major: "",
        copc: "",
        dateIssued: "",
        chedAccreditation: "",
        serialNumber: "",
      });
    } catch (error) {
      console.error("Error adding program:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <dialog id="addProgram_Modal" className="modal">
      <div className="modal-box w-full max-w-3xl">
        <h3 className="font-bold text-lg mb-5">Add Program</h3>

        {/* Alert Messages */}
        {showSuccess && programIsSuccess && (
          <div className="alert alert-success mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Program added successfully!</span>
          </div>
        )}

        {showError && programIsError && (
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Failed to add program.</span>
          </div>
        )}

        {/* Loading Overlay */}
        {programIsPending && (
          <div className="absolute inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Body */}
        <form ref={formRef}>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Program Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter program name"
                className="input input-bordered w-full"
                required
                value={formData.programName}
                onChange={(e) =>
                  setFormData({ ...formData, programName: e.target.value })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Major</span>
              </label>
              <input
                type="text"
                placeholder="Enter major"
                className="input input-bordered w-full"
                required
                value={formData.major}
                onChange={(e) =>
                  setFormData({ ...formData, major: e.target.value })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">COPC</span>
              </label>
              <select
                className="select select-bordered w-full"
                required
                value={formData.copc}
                onChange={(e) =>
                  setFormData({ ...formData, copc: e.target.value })
                }
              >
                <option value="" disabled>
                  Select COPC status
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="On-Process">On-Process</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Date Issued</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                required
                value={formData.dateIssued}
                onChange={(e) =>
                  setFormData({ ...formData, dateIssued: e.target.value })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">CHED Agency Accreditation</span>
              </label>
              <input
                type="text"
                placeholder="Enter accreditation"
                className="input input-bordered w-full"
                required
                value={formData.chedAccreditation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    chedAccreditation: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">COPC Serial Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter serial number"
                className="input input-bordered w-full"
                required
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData({ ...formData, serialNumber: e.target.value })
                }
              />
            </div>
          </div>
        </form>

        {/* Footer */}
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
            disabled={programIsPending}
          >
            {programIsPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add"
            )}
          </button>
          <form method="dialog">
            <button className="btn btn-neutral" disabled={programIsPending}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddModal;
