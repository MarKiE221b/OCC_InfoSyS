import React, { useRef, useState } from "react";

const UpdateSUCModal = ({ setUpdateValues, updateValues, handleAction }) => {
  const formRef = useRef(null);

  return (
    <dialog id="updateSUCModal" className="modal">
      <div className="modal-box">
        {/* body */}
        <div>
          <h3 className="font-bold text-lg mb-5">Update SUC</h3>

          <form ref={formRef} onSubmit={handleAction}>
            <div className="flex flex-col w-full gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Region</span>
                </div>
                <input
                  value={updateValues.region}
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setUpdateValues((prev) => ({
                      ...prev,
                      region: e.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">SUC Name</span>
                </div>
                <input
                  value={updateValues.name}
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setUpdateValues((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                <input
                  value={updateValues.address}
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setUpdateValues((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  required
                />
              </label>

            <div className="flex flex-row gap-2">

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Latitude</span>
                </div>
                <input
                  value={updateValues.latitude}
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setUpdateValues((prev) => ({
                      ...prev,
                      latitude: e.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Longitude</span>
                </div>
                <input
                  value={updateValues.longitude}
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setUpdateValues((prev) => ({
                      ...prev,
                      longitude: e.target.value,
                    }))
                  }
                  required
                />
              </label>

            </div>

            </div>
          </form>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-outline btn-success text-green-800"
            onClick={() => {
              if (formRef.current.checkValidity()) {
                handleAction(
                  new Event("submit", { bubbles: true, cancelable: true })
                );
              } else {
                formRef.current.reportValidity();
              }
            }}
          >
            Update
          </button>

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateSUCModal;
