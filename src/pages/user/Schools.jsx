import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import AddModal from "../../components/user-components/schoolComponents/AddModal";

const Schools = () => {
  const maintenance = true;

  return (
    <div className="py-20 flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-full max-w-5xl">
        {maintenance ? (
          <div className="alert alert-info shadow-lg mb-8 flex items-center gap-3 bg-gray-100 border border-gray-300">
            <FaInfoCircle className="text-gray-500" size={24} />
            <span className="text-lg font-medium text-gray-700">Page is currently under development.</span>
          </div>
        ) : (
          <>
            <AddModal />
            <div className="card bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Schools</h2>
                <button
                  className="btn btn-neutral btn-sm px-6 rounded-full shadow-md transition-transform hover:scale-105"
                  onClick={() =>
                    document.getElementById("addCampus_Modal").showModal()
                  }
                >
                  + Add Campus
                </button>
              </div>
              <div className="divider mt-2 mb-6"></div>
              {/* table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50">
                <table className="table table-zebra w-full">
                  <thead className="bg-gray-200 text-gray-900">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Contact Details</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr className="hover:bg-gray-100 transition">
                      <td className="py-3 px-4 font-semibold text-gray-800">Test Campus</td>
                      <td className="py-3 px-4 text-gray-700">Commonwealth Ave. Quezon City.</td>
                      <td className="py-3 px-4">
                        <div className="text-left">
                          <h3 className="font-bold text-gray-700">Gilda S. Familara</h3>
                          <p className="text-sm text-gray-600">09989918827</p>
                          <p className="underline text-gray-500 text-sm">
                            gsfamilara@earist.ph.education
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">—</td>
                      <td className="py-3 px-4 flex justify-center">
                        <button className="btn btn-circle bg-gray-100 hover:bg-gray-200 transition">
                          <FaInfoCircle size={"20px"} className="text-gray-700" />
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
    </div>
  );
};

export default Schools;
