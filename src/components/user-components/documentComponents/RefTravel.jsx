import React, { useMemo } from "react";
import ReusableTable from "../tableComponents/ReusableTable";

const RefTravel = () => {
  const data = [];

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullname",
        header: "Name",
      },
    ],
    []
  );

  return (
    <div>
      <ReusableTable data={data} columns={columns} />
    </div>
  );
};

export default RefTravel;
