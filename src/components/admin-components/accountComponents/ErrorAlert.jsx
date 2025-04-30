import React from "react";
import { IoIosWarning } from "react-icons/io";
import { MdError } from "react-icons/md";

const ErrorAlert = ({ message, type }) => {
  return (
    <>
      {type === 400 ? (
        <div className="flex items-center gap-2 text-orange-600">
          <IoIosWarning size={"20px"} />
          <p>{message}</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-600">
          <MdError size={"20px"} />
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default ErrorAlert;
