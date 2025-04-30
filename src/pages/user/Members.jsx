import React, { useEffect, useMemo } from "react";
import { useFetchMember } from "../../hooks/userMember";
import AddModal from "../../components/user-components/memberComponents/AddModal";
import ReusableTable from "../../components/user-components/tableComponents/ReusableTable";
import Loading from "../../components/loading-components/Loading";

import { IoIosPhonePortrait, IoIosMail } from "react-icons/io";
import ViewMemberModal from "../../components/user-components/memberComponents/ViewMemberModal";

const Members = () => {
  const {
    mutateAsync: fetchedMembers,
    data: responseData,
    isPending: loading,
  } = useFetchMember();

  const userDetails = JSON.parse(localStorage.getItem("USER_DETAILS"));

  useEffect(() => {
    const fetchMutation = async (_id) => {
      await fetchedMembers({ id: _id });
    };

    fetchMutation(userDetails.suc_id);
  }, []);

  const data = responseData?.data || [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullname",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <img
              src={row.original.profilePicture}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span>{row.original.fullname}</span>
          </div>
        ),
      },
      {
        accessorKey: "office",
        header: "Office",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <h3 className="">{row.original.office}</h3>
          </div>
        ),
      },
      {
        accessorKey: "positionOnBoard",
        header: "Position",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <h3 className="font-bold">{row.original.positionOnBoard}</h3>
            <p>{row.original.email}</p>
            <p>{row.original.phoneNumber}</p>
          </div>
        ),
      },
      {
        accessorKey: "dateOfAppointment",
        header: "Date of Appointment",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <h3>{row.original.dateOfAppointment?.split("T")[0]}</h3>
          </div>
        ),
      },
      {
        accessorKey: "expirationOfTerm",
        header: "Expiration of Term",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <h3>{row.original.expirationOfTerm?.split("T")[0]}</h3>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) =>
          row.original.status === "Active" ? (
            <div className="text-left p-2">
              <h3 className="badge badge-accent badge-outline">
                {row.original.status}
              </h3>
            </div>
          ) : (
            <div className="text-left p-2">
              <h3 className="badge badge-error badge-outline">
                {row.original.status}
              </h3>
            </div>
          ),
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <div className="">
              <button className="btn join-item">View</button>
              <button className="btn join-item">Delete</button>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="py-20">
      <ViewMemberModal />
      <AddModal />
      <div className="card bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-semibold inline-block">Members</h2>
        <div className="flex justify-end">
          <button
            className="btn btn-outline"
            onClick={() =>
              document.getElementById("addMember_Modal").showModal()
            }
          >
            Add Member
          </button>
        </div>
        <div className="divider mt-2"></div>

        {/* table */}
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <ReusableTable data={data} columns={columns} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
