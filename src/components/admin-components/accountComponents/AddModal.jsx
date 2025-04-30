import React, { useRef, useState } from "react";
import { regionList } from "../../../api/list.js";
import { useFetchSUC, useMutateSUC } from "../../../hooks/useSuc.js";
import Spinner from "../../loading-components/Spinner.jsx";
import ErrorAlert from "./ErrorAlert.jsx";
import { useAddAccount } from "../../../hooks/useAccount.js";

const AddModal = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    suc_id: "",
    fullname: "",
    username: "",
    password: "",
    role: "",
  });

  const { data: sucList, isFetching: sucListIsLoading } = useFetchSUC();

  const {
    mutateAsync: mutateAccount,
    isPending: pendingState,
    error: errorData,
    isError: errorState,
  } = useAddAccount();

  const handleAddAccount = async (e) => {
    e.preventDefault();
    await mutateAccount(formData);
    setFormData({
      suc_id: "",
      fullname: "",
      username: "",
      password: "",
      role: "",
    });
  };

  return (
    <dialog id="addAccount_Modal" className="modal">
      <div className="modal-box w-full max-w-2xl">
        <div className="">
          <h3 className="font-bold text-lg">Add Account</h3>

          {/* body */}

          {pendingState && <Spinner />}
          <form onSubmit={handleAddAccount} ref={formRef}>
            {sucListIsLoading ? (
              <div>
                <div className="skeleton h-10 w-full"></div>
              </div>
            ) : (
              <label className="form-control w-full">
                <div className="label">
                  <p className="block text-sm font-medium text-gray-700">
                    Select SUCs<span className="text-red-900"> *</span>
                  </p>
                </div>
                <select
                  className="select select-bordered"
                  value={formData.suc_id}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, suc_id: e.target.value }))
                  }
                  required
                >
                  <option></option>
                  {sucList?.data.map((list, key) => (
                    <option key={key} value={list._id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {/* fullname input */}
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

            {/* username */}
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Username<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                required
              />
            </label>

            {/* username */}
            <label className="form-control w-full">
              <div className="label">
                <p className="block text-sm font-medium text-gray-700">
                  Password<span className="text-red-900"> *</span>
                </p>
              </div>
              <input
                type="password"
                placeholder=""
                className="input input-bordered w-full"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
            </label>
          </form>

          {/* Role */}

          <label className="form-control w-full">
            <div className="label">
              <p className="block text-sm font-medium text-gray-700">
                Select Role<span className="text-red-900"> *</span>
              </p>
            </div>
            <select
              className="select select-bordered"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              required
            >
              <option value=""></option>
              <option value="Admin">School Admin</option>
              <option value="SuperAdmin">Super Admin</option>
            </select>
          </label>
          {/* footer */}
          <div className="modal-action">
            {errorState && (
              <ErrorAlert
                message={errorData?.response.data.message}
                type={errorData?.status}
              />
            )}

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
      </div>
    </dialog>
  );
};

export default AddModal;
