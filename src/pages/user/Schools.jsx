import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import AddModal from "../../components/user-components/schoolComponents/AddModal";

const Schools = () => {
  const maintenance = true;

  return (
    <div className="py-20">
      {maintenance ? (
        <div className="alert alert-info shadow-lg mb-5">
          <div>
            <span>Page is currently under development.</span>
          </div>
        </div>
      ) : (
        <>
          <AddModal />
          <div className="card bg-base-100 shadow-xl p-5">
            <h2 className="text-xl font-semibold inline-block">Schools</h2>
            <div className="flex justify-end">
              <button
                className="btn btn-outline"
                onClick={() =>
                  document.getElementById("addCampus_Modal").showModal()
                }
              >
                Add Campus
              </button>
            </div>
            <div className="divider mt-2"></div>

            {/* table */}
            <div className="h-full w-full overflow-x-auto pb-6 bg-base-100">
              <div className=""></div>
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Contact Details</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="hover">
                    <td>Test Campus</td>
                    <td>Commonwealth Ave. Quezon City.</td>
                    <td>
                      <div className="text-left p-2">
                        <h3 className="font-bold">Gilda S. Familara</h3>
                        <p>09989918827</p>
                        <p className="underline">
                          gsfamilara@earist.ph.education
                        </p>
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <button className="btn btn-circle bg-base-100">
                        <FaInfoCircle size={"20px"} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Schools;
