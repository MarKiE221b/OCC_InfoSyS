import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useFetchSUC, useMutateUpdateSuc } from "../../hooks/useSuc";
import { useFetchMember } from "../../hooks/userMember";

import sill from "../../assets/sillhouete.png";

import { FaInfoCircle, FaPen, FaTrash } from "react-icons/fa";

import Loading from "../../components/loading-components/Loading.jsx";

import AddModal from "../../components/admin-components/sucComponents/AddModal";
import ReusableTable from "../../components/admin-components/tableComponents/ReusableTable.jsx";
import UpdateSUCModal from "../../components/admin-components/sucComponents/UpdateSUCModal.jsx";
import SchoolMap from "../../components/admin-components/sucComponents/SchoolMap.jsx";
import { useFetchSUCPrograms } from "../../hooks/useProgram.js";

const BoardListTable = ({ name }) => {
  const { mutateAsync: fetchSucMembers } = useFetchMember();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    const fetchFunction = async () => {
      const resposeData = await fetchSucMembers({ id: page });
      setMembers(resposeData?.data);
    };

    fetchFunction();
  }, [page]);

  const filteredMembers = members?.filter((member) =>
    member.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase() || "";
    const valB = b[sortBy]?.toString().toLowerCase() || "";
    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const paginatedMembers = sortedMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 bg-base-100 ">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Office</th>
                <th>Position</th>
                <th>Date Appointed</th>
                <th>Duration</th>
                <th>Term End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {paginatedMembers.map((member, key) => (
                <tr key={key}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={member.image || sill}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{member.fullname}</div>
                        <div className="text-sm opacity-50"></div>
                      </div>
                    </div>
                  </td>
                  <td>{member.office}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {member.positionOnBoard}
                      </span>
                      <span> {member.email}</span>
                      <span> {member.phoneNumber}</span>
                    </div>
                  </td>
                  <td>{member.dateOfAppointment?.split("T")[0]}</td>
                  <td>{member.durationOfTerm}</td>
                  <td>{member.expirationOfTerm?.split("T")[0]}</td>
                  <td>
                    {member.status === "Active" && (
                      <div className="badge badge-accent badge-outline">
                        {member.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-sm btn-outline mx-1"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="p-2">Page {currentPage}</span>
        <button
          className="btn btn-sm btn-outline mx-1"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= sortedMembers.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ProgramsTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { data: fetchedProgramsData, isFetching: fetchLoading } =
    useFetchSUCPrograms({ suc_id: page });

  const data = fetchedProgramsData?.data || [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "programName",
        header: "Program Name",
      },
      {
        accessorKey: "major",
        header: "Major",
      },
      {
        accessorKey: "copc",
        header: "COPC",
      },
      {
        accessorKey: "dateIssued",
        header: "Date Issued",
      },
      {
        accessorKey: "chedAccreditation",
        header: "CHED Agency Accreditation",
      },
      {
        accessorKey: "serialNumber",
        header: "Serial Number",
      },
    ],
    []
  );

  return (
    <div>
      <h2 className="font-semibold text-lg">List of Programs</h2>
      <div className="divider"></div>
      {fetchLoading ? (
        <Loading />
      ) : (
        <ReusableTable data={data} columns={columns} />
      )}
    </div>
  );
};

const ListOfSuc = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const name = searchParams.get("name");
  const region = searchParams.get("region");
  const address = searchParams.get("address");
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");

  const navigate = useNavigate();

  const [updateValues, setUpdateValues] = useState({
    _id: "",
    name: "",
    region: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const { data: fetchedSUCData, isFetching: fetchLoading } = useFetchSUC();
  const { mutateAsync: mutateUpdateSUC, isFetching: isFetchingMutation } =
    useMutateUpdateSuc();

  const handleSearchParams = (url, name, row) => {
    navigate(
      `/suc?page=${url}&name=${name}&region=${row.region}&address=${row.address}&latitude=${row.latitude}&longitude=${row.longitude}`
    );
  };

  const viewUpdateModal = (row) => {
    document.getElementById("updateSUCModal").showModal();
    setUpdateValues({
      _id: row._id,
      name: row.name,
      region: row.region,
      address: !row.address ? "" : row.address,
      latitude: !row.latitude ? "" : row.latitude,
      longitude: !row.longitude ? "" : row.longitude,
    });
  };

  const handleUpdateAction = async (e) => {
    e.preventDefault();

    await mutateUpdateSUC(updateValues);
  };

  // columns and data
  const data =
    fetchedSUCData?.data.map((suc) => ({
      _id: suc._id,
      name: suc.name,
      region: suc.region,
      address: suc.address,
      latitude: suc.coordinates[0],
      longitude: suc.coordinates[1],
    })) || [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "region",
        header: "Region",
      },
      {
        accessorKey: "name",
        header: "SUC",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="btn btn-circle bg-base-100"
              type="button"
              onClick={() =>
                handleSearchParams(
                  row.original._id,
                  row.original.name,
                  row.original
                )
              }
            >
              <FaInfoCircle size={"15px"} />
            </button>
            <button
              className="btn btn-circle bg-base-100"
              onClick={() => {
                viewUpdateModal(row.original);
              }}
            >
              <FaPen size={"15px"} />
            </button>
            <button
              className="btn btn-circle bg-red-400"
              type="button"
              onClick={() =>
                handleSearchParams(row.original._id, row.original.name)
              }
            >
              <FaTrash size={"15px"} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="py-20">
      <AddModal />
      <UpdateSUCModal
        setUpdateValues={setUpdateValues}
        updateValues={updateValues}
        handleAction={handleUpdateAction}
      />
      {/* breadcrumbs */}
      <div className="card w-full py-2 px-6 bg-base-100 mt-2 shadow-md">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to={"/suc"}>SUCs</Link>
            </li>
            <li>{page ? name : ""}</li>
          </ul>
        </div>
      </div>

      <div className="card w-full p-6 bg-base-100 mt-2 shadow-md">
        {/* tab */}
        {page ? (
          <div role="tablist" className="tabs tabs-lifted">
            {/* members */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="List of Members"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <div>
                <div className="text-xl font-semibold inline-block">
                  {page ? "Board Members" : "List of SUCs"}
                </div>

                {/* button add  */}
                {!page && (
                  <div className="flex justify-end">
                    <button
                      className="btn btn-outline btn-xs sm:btn-sm md:btn-md"
                      onClick={() =>
                        document.getElementById("addSuc_Modal").showModal()
                      }
                      type="button"
                    >
                      Add S.U.C.
                    </button>
                  </div>
                )}

                <div className="divider mt-2"></div>

                <BoardListTable name={name} />
              </div>
            </div>
            {/* program lists */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="List of Programs"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <ProgramsTab />
            </div>
            {/* map */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="Map"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <div>
                <SchoolMap
                  sucDetails={[
                    {
                      region,
                      name,
                      address,
                      coordinates: [latitude, longitude],
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        ) : fetchLoading ? (
          <Loading />
        ) : (
          <>
            <div>
              <h2 className="font-semibold text-lg">List of SUCs</h2>
            </div>
            <div className="divider"></div>
            <ReusableTable data={data} columns={columns} />
          </>
        )}
      </div>
    </div>
  );
};

export default ListOfSuc;
