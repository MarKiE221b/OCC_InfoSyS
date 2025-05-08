import React, { useMemo } from "react";
import Loading from "../../components/loading-components/Loading";
import AddModal from "../../components/user-components/programComponents/AddModal";

import ReusableTable from "../../components/user-components/tableComponents/ReusableTable";
import { useFetchSUCPrograms } from "../../hooks/useProgram";

const Programs = () => {
  const userDetails = JSON.parse(localStorage.getItem("USER_DETAILS"));

  const { data: responseData, isPending: loading } = useFetchSUCPrograms({
    suc_id: userDetails.suc_id,
  });

  const data = responseData?.data || [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "programName",
        header: "Program",
      },
      {
        accessorKey: "major",
        header: "Major",
      },
      {
        accessorKey: "copc",
        header: "With COPC",
      },
      {
        accessorKey: "chedAccreditation",
        header: "Agency Accreditation",
      },
      {
        accessorKey: "serialNumber",
        header: "Serial Number",
      },
      {
        accessorKey: "dateIssued",
        header: "Date Issued",
      },
      {
        accessorKey: "accredLevel",
        header: "Accreditation Level",
      },
    ],
    []
  );

  return (
    <div className="py-20">
      <AddModal />
      <div className="card bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-semibold inline-block">Programs</h2>
        <div className="flex justify-end">
          <button
            className="btn btn-outline"
            onClick={() =>
              document.getElementById("addProgram_Modal").showModal()
            }
          >
            Add Program
          </button>
        </div>
        <div className="divider mt-2"></div>

        {/* table */}
        <div>
          {false ? (
            <Loading />
          ) : (
            <ReusableTable data={data} columns={columns} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
