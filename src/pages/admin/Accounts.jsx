import React, { useState } from "react";
import AddModal from "../../components/admin-components/accountComponents/AddModal";
import { useDeleteAccount, useFetchAllAccounts } from "../../hooks/useAccount";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

const ListOfMembers = () => {
  const { data: fetchAllAccounts } = useFetchAllAccounts();
  const { mutateAsync: mutateDeleteUser } = useDeleteAccount();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("fullname");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteUser = async (id) => {
    await mutateDeleteUser({ id });
  };

  // Improved global search
  const filteredMembers = fetchAllAccounts
    ? fetchAllAccounts?.data.filter((member) =>
        Object.values(member)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  // Enhanced sorting based on dynamic sortBy
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const valA = a[sortBy]?.toString().toLowerCase() || "";
    const valB = b[sortBy]?.toString().toLowerCase() || "";
    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const paginatedUser = sortedMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-20">
      <AddModal />
      <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
        <div className="text-xl font-semibold inline-block">
          <p>Accounts</p>
          <div className="flex justify-end">
            <button
              className="btn btn-outline btn-xs sm:btn-sm md:btn-md"
              onClick={() =>
                document.getElementById("addAccount_Modal").showModal()
              }
              type="button"
            >
              Add Account
            </button>
          </div>

          <div className="divider mt-2"></div>

          <div className="p-4 bg-base-100 rounded shadow">
            {/* Search and Sort */}
            <div className="mb-4 flex justify-between items-center">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-2">
                <select
                  className="select select-bordered"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="fullname">Fullname</option>
                  <option value="status">Status</option>
                  <option value="username">Username</option>
                  <option value="access">Access</option>
                </select>
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Sort ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fullname</th>
                    <th>Status</th>
                    <th>Username</th>
                    <th>Access</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUser?.map((data, index) => (
                    <tr key={index} className="hover">
                      <td>{data.member_id?.fullname}</td>
                      <td>{data.member_id?.status}</td>
                      <td>{data.username}</td>
                      <td>{data.access ? "True" : "False"}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-circle bg-base-100">
                            <FaInfoCircle size="20px" />
                          </button>
                          <button
                            className="btn btn-circle bg-red-400"
                            onClick={() => handleDeleteUser(data._id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-5 mt-4">
              <button
                className="btn btn-sm btn-outline mx-1"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-base">Page {currentPage}</span>
              <button
                className="btn btn-sm btn-outline mx-1"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage * itemsPerPage >= sortedMembers.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfMembers;
