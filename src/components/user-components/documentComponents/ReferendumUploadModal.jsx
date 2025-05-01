import React from "react";

const ReferendumUploadModal = () => {
  return (
    <dialog id="addMember_Modal" className="modal">
      <div className="modal-box w-full max-w-3xl">
        <h3 className="font-bold text-lg mb-5">Add Board Member</h3>

        {/* Body */}
        <form onSubmit={handleAddAccount} ref={formRef}>
          <div className="flex justify-center items-center gap-2 mb-5">
            {/* Image Preview */}
            <img
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : "https://via.placeholder.com/200"
              } // Use the image file or a placeholder
              className="w-[200px] h-[200px] border-2 rounded-lg"
              alt="Preview"
            />
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <p className="label-text font-semibold">
                  Upload Picture <span className="text-red-900">*</span>
                </p>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                required
                onChange={handleImageUpload} // Handle file upload
                accept="image/*" // Only accept image files
              />
            </label>
          </div>

          {/* Fullname */}
          <div className="grid grid-cols-1 gap-2">
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Fullname<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullname: e.target.value }))
                }
                required
              />
            </label>
          </div>

          {/* Office */}
          <div className="grid grid-cols-2 gap-2">
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Office<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={formData.office}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, office: e.target.value }))
                }
                required
              />
            </label>

            {/* Position */}
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Position<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={formData.positionOnBoard}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    positionOnBoard: e.target.value,
                  }))
                }
                required
              />
            </label>
          </div>

          {/* Date Appointed */}
          <label className="form-control w-full">
            <div className="label">
              <p className="block text-sm font-medium text-gray-700">
                Appointed Date<span className="text-red-900"> *</span>
              </p>
            </div>
            <input
              type="date"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.dateOfAppointment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dateOfAppointment: e.target.value,
                }))
              }
              required
            />
          </label>

          {/* Duration */}
          <label className="form-control w-full">
            <div className="label">
              <p className="block text-sm font-medium text-gray-700">
                Duration<span className="text-red-900"> *</span>
              </p>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.durationOfTerm}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  durationOfTerm: e.target.value,
                }))
              }
              required
            />
          </label>

          {/* Term End */}
          <label className="form-control w-full">
            <div className="label">
              <p className="block text-sm font-medium text-gray-700">
                End Term<span className="text-red-900"> *</span>
              </p>
            </div>
            <input
              type="date"
              placeholder=""
              className="input input-bordered w-full"
              value={formData.expirationOfTerm}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expirationOfTerm: e.target.value,
                }))
              }
              required
            />
          </label>
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
          >
            Add
          </button>
          <form method="dialog">
            <button className="btn btn-neutral">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ReferendumUploadModal;
