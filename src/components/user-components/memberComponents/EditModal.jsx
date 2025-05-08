import React, { useRef, useState } from "react";
import { useUpdateMemberDetails } from "../../../hooks/userMember";
import { useEffect } from "react";

const EditModal = ({ details }) => {
  const formRef = useRef(null);

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  };

  const initialFormState = (details) => ({
    _id: details?._id || "",
    fullname: details?.fullname || "",
    office: details?.office || "",
    positionOnBoard: details?.positionOnBoard || "",
    dateOfAppointment: formatDateForInput(details?.dateOfAppointment),
    durationOfTerm: details?.durationOfTerm || "",
    expirationOfTerm: formatDateForInput(details?.expirationOfTerm),
    image: null,
    email: details?.email || "",
    phoneNumber: details?.phoneNumber || "",
  });

  const [formData, setFormData] = useState(initialFormState(details));
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    mutateAsync: mutateEditMember,
    isSuccess: mutationSuccess,
    isLoading,
    isError,
    error,
  } = useUpdateMemberDetails();

  useEffect(() => {
    setFormData(initialFormState(details));
  }, [details]);

  useEffect(() => {
    if (mutationSuccess) {
      setShowSuccess(true);
      setShowConfirm(false);
    }
    if (isError) {
      window.alert(
        "Error adding member: " + (error?.message || "Unknown error")
      );
      setShowConfirm(false);
    }
  }, [mutationSuccess, isError, error]);

  const handleAddAccount = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmAdd = async () => {
    setShowConfirm(false);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "image") formDataToSend.append(key, value);
    });
    if (formData.image) formDataToSend.append("image", formData.image);
    try {
      await mutateEditMember(formDataToSend);
    } catch {}
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    document.getElementById("editMember_Modal")?.close?.();
    setFormData(initialFormState(details));
  };

  return (
    <>
      <dialog id="editMember_Modal" className="modal">
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
        <div className="modal-box w-full max-w-3xl z-50 relative">
          {showConfirm && (
            <dialog open className="modal">
              <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
              <div className="modal-box z-50 relative">
                <h3 className="font-bold text-lg mb-4">Confirm Add Member</h3>
                <p>Are you sure you want to add this member?</p>
                <div className="modal-action">
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmAdd}
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Yes, Update"}
                  </button>
                  <button
                    className="btn btn-neutral"
                    onClick={() => setShowConfirm(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </dialog>
          )}

          {showSuccess && (
            <dialog open className="modal">
              <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
              <div className="modal-box z-50 relative">
                <h3 className="font-bold text-lg mb-4">Success</h3>
                <p>Member updated successfully!</p>
                <div className="modal-action">
                  <button className="btn btn-success" onClick={handleSuccessOk}>
                    OK
                  </button>
                </div>
              </div>
            </dialog>
          )}

          <h3 className="font-bold text-lg mb-5">Edit Profile</h3>
          <form onSubmit={handleAddAccount} ref={formRef}>
            <div className="flex justify-center items-center gap-2 mb-5">
              <img
                src={
                  formData.image
                    ? URL.createObjectURL(formData.image)
                    : details?.image
                }
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
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <p className="block text-sm font-medium text-gray-700">
                    Fullname<span className="text-red-900"> *</span>
                  </p>
                </div>
                <input
                  type="text"
                  name="fullname"
                  className="input input-bordered w-full"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <p className="block text-sm font-medium text-gray-700">
                    Office<span className="text-red-900"> *</span>
                  </p>
                </div>
                <input
                  type="text"
                  name="office"
                  className="input input-bordered w-full"
                  value={formData.office}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <p className="block text-sm font-medium text-gray-700">
                    Position<span className="text-red-900"> *</span>
                  </p>
                </div>
                <input
                  type="text"
                  name="positionOnBoard"
                  className="input input-bordered w-full"
                  value={formData.positionOnBoard}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <p className="block text-sm font-medium text-gray-700">
                    Email<span className="text-red-900"> *</span>
                  </p>
                </div>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <p className="block text-sm font-medium text-gray-700">
                    Phone Number<span className="text-red-900"> *</span>
                  </p>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="09XXXXXXXXX"
                  className="input input-bordered w-full"
                  value={formData.phoneNumber}
                  pattern="^(09|\+639)\d{9}$"
                  onChange={handleInputChange}
                  required
                />
                <span className="text-xs text-gray-500 mt-1">
                  Format: 09XXXXXXXXX or +639XXXXXXXXX
                </span>
              </label>
            </div>
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Appointed Date<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="date"
                name="dateOfAppointment"
                className="input input-bordered w-full"
                value={formData.dateOfAppointment}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Duration<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="text"
                name="durationOfTerm"
                className="input input-bordered w-full"
                value={formData.durationOfTerm}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  End Term<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="date"
                name="expirationOfTerm"
                className="input input-bordered w-full"
                value={formData.expirationOfTerm}
                onChange={handleInputChange}
                required
              />
            </label>
          </form>
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
              disabled={isLoading}
            >
              Change
            </button>
            <form method="dialog">
              <button className="btn btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditModal;
