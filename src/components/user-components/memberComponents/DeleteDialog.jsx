import React from "react";
import { useDeleteMember } from "../../../hooks/userMember";

const DeleteDialog = ({ id }) => {
  const { mutateAsync: deleteMutation, isPending: pendingDelete } =
    useDeleteMember();

  const handleDelete = async () => {
    try {
      await deleteMutation(id);
      const modal = document.getElementById("deleteMember_Modal");
      modal.close();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <dialog id="deleteMember_Modal" className="modal">
      <div className="modal-box w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 rounded-full p-3 mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-xl text-red-700 mb-2">Delete Member</h3>
          <p className="text-center text-gray-700 mb-6">
            Are you sure you want to delete this member? <br />
            <span className="font-semibold text-red-600">
              This action cannot be undone.
            </span>
          </p>
        </div>
        <div className="modal-action flex justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={() => handleDelete()}
            disabled={pendingDelete}
            className="btn btn-error px-6"
          >
            Delete
          </button>
          <form method="dialog">
            <button className="btn btn-outline btn-neutral px-6">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteDialog;
