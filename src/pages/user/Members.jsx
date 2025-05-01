import React, { useEffect, useMemo, useState } from "react";
import { useFetchMember } from "../../hooks/userMember";
import AddModal from "../../components/user-components/memberComponents/AddModal";
import ReusableTable from "../../components/user-components/tableComponents/ReusableTable";
import Loading from "../../components/loading-components/Loading";

import { IoIosPhonePortrait, IoIosMail } from "react-icons/io";
import ViewMemberModal from "../../components/user-components/memberComponents/ViewMemberModal";
import DeleteDialog from "../../components/user-components/memberComponents/DeleteDialog";
import { set } from "ol/transform";

const Members = () => {
  const [memberId, setMemberId] = useState(null);
  const userDetails = useMemo(
    () => JSON.parse(localStorage.getItem("USER_DETAILS")),
    []
  );

  const { data: responseData, isFetching: loading } = useFetchMember({
    id: userDetails?.suc_id,
  });

  const data = responseData ? responseData : [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullname",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.profilePicture}
              alt="profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary object-cover shadow"
            />
            <span className="font-medium text-base break-all">
              {row.original.fullname}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "office",
        header: "Office",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <span className="text-sm text-gray-700 break-all">
              {row.original.office}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "positionOnBoard",
        header: "Position & Contact",
        cell: ({ row }) => (
          <div className="text-left p-2 space-y-1">
            <span className="font-semibold text-primary block">
              {row.original.positionOnBoard}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <IoIosMail className="text-base" />
              <span className="truncate">{row.original.email}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <IoIosPhonePortrait className="text-base" />
              <span className="truncate">{row.original.phoneNumber}</span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "dateOfAppointment",
        header: "Appointment",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <span className="badge badge-info badge-outline text-xs">
              {row.original.dateOfAppointment?.split("T")[0]}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "expirationOfTerm",
        header: "Expiration",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <span className="badge badge-warning badge-outline text-xs">
              {row.original.expirationOfTerm?.split("T")[0]}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="text-left p-2">
            <span
              className={`badge ${
                row.original.status === "Active"
                  ? "badge-success"
                  : "badge-error"
              } badge-outline px-3 py-1 text-xs`}
            >
              {row.original.status}
            </span>
          </div>
        ),
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-center flex-wrap">
            <button
              className="btn btn-xs sm:btn-sm btn-primary btn-outline rounded-full px-3"
              onClick={() =>
                document.getElementById("viewMember_Modal")?.showModal?.()
              }
              aria-label="View Member"
            >
              View
            </button>
            <button
              className="btn btn-xs sm:btn-sm btn-error btn-outline rounded-full px-3"
              onClick={() => {
                setMemberId(row.original._id);
                document.getElementById("deleteMember_Modal")?.showModal?.();
              }}
              aria-label="Delete Member"
            >
              Delete
            </button>
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
      <DeleteDialog id={memberId} />
      <div className="card bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-semibold inline-block">Members</h2>
        <div className="flex justify-end">
          <button
            className="btn btn-outline"
            onClick={() =>
              document.getElementById("addMember_Modal")?.showModal?.()
            }
          >
            Add Member
          </button>
        </div>
        <div className="divider mt-2"></div>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <ReusableTable data={data} columns={columns} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
