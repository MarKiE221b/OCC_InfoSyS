import React from "react";

import sill from "../assets/sillhouete.png";

import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router";

const SucTable = () => {
  const navigate = useNavigate();

  const handleSearchParams = (url) => {
    navigate(`/suc?page=${url}`);
  };

  return (
    <div className="h-full w-full overflow-x-auto pb-6 bg-base-100">
      <div className=""></div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Region</th>
            <th>SUC</th>
            <th>Board Secretary</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="hover">
            <td>NCR</td>
            <td>
              Eulogio "Amang" Rodriguez Institute of Science and Technology
            </td>
            <td>
              <div className="text-left p-2">
                <h3 className="font-bold">Gilda S. Familara</h3>
                <p>09989918827</p>
                <p className="underline">gsfamilara@earist.ph.education</p>
              </div>
            </td>
            <td>(02) 7738 5059</td>
            <td>
              <button className="btn btn-circle bg-base-100">
                <FaInfoCircle size={"20px"} />
              </button>
            </td>
          </tr>

          <tr className="hover">
            <td>Region 3</td>
            <td>Bulacan Agricultural State College</td>
            <td>
              <div className="text-left p-2">
                <h3 className="font-bold">Bea T. Vinculado</h3>
                <p>09173172729</p>
                <p className="underline">beavinculado@basc.edu.ph</p>
              </div>
            </td>
            <td>(044) 762 1427</td>
            <td>
              <button
                className="btn btn-circle bg-base-100"
                onClick={() =>
                  handleSearchParams("bulacan-agricultural-state-college")
                }
              >
                <FaInfoCircle size={"20px"} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const BoardListTable = () => {
  return (
    <div className="h-full max-h-[450px] overflow-x-auto pb-6 bg-base-100 grid lg:grid-cols-2  gap-5">
      <div className="flex justify-center">
        <div className="card bg-base-200 w-[400px] flex flex-col p-2">
          <figure>
            <img src={sill} alt="Shoes" />
          </figure>

          <div className="card-body text-left">
            <h2 className="font-semibold">Hon. Jameson H. Tan</h2>
            <div className="text-xs">
              <p>
                Office:{" "}
                <span className="font-semibold">SUC President III, BASC</span>
              </p>
              <p>
                Position: <span className="font-semibold">Vice President</span>
              </p>
              <p className="">
                Date Appointed:{" "}
                <span className="font-semibold">February 01, 2023</span>
              </p>
              <p>
                Duration: <span className="font-semibold">4 years</span>
              </p>
              <p>
                Term End:{" "}
                <span className="font-semibold">January 31, 2027</span>
              </p>
              <div className="badge badge-success mt-2  text-center text-green-900 bg-green-400 text-xs">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="card bg-base-200 w-[400px] flex flex-col p-2">
          <figure>
            <img src={sill} alt="Shoes" />
          </figure>

          <div className="card-body text-left">
            <h2 className="font-semibold">Hon. Alan Peter S. Cayetano</h2>
            <div className="text-xs">
              <p>
                Office:{" "}
                <span className="font-semibold">
                  Chairperson, Commitee on Higher, Technical and Vocational
                  Education of Senate
                </span>
              </p>
              <p>
                Position: <span className="font-semibold">Member</span>
              </p>
              <p className="">
                Date Appointed:{" "}
                <span className="font-semibold">November 06, 2023</span>
              </p>
              <p>
                Duration:{" "}
                <span className="font-semibold">
                  Ex-officio member, no fixed term
                </span>
              </p>
              <p>
                Term End: <span className="font-semibold"></span>
              </p>
              <div className="badge badge-success mt-2  text-center text-green-900 bg-green-400 text-xs">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="card bg-base-200 w-[400px] flex flex-col p-2">
          <figure>
            <img src={sill} alt="Shoes" />
          </figure>

          <div className="card-body text-left">
            <h2 className="font-semibold">Hon. Joel Villanueva</h2>
            <div className="text-xs">
              <p>
                Office:{" "}
                <span className="font-semibold">
                  Chairperson, Commitee on Higher, Technical and Vocational
                  Education of Senate
                </span>
              </p>
              <p>
                Position: <span className="font-semibold">Member</span>
              </p>
              <p className="">
                Date Appointed:{" "}
                <span className="font-semibold">February 01, 2023</span>
              </p>
              <p>
                Duration: <span className="font-semibold">4 years</span>
              </p>
              <p>
                Term End:{" "}
                <span className="font-semibold">January 31, 2027</span>
              </p>
              <p>
                Remarks:{" "}
                <span className="font-semibold">
                  Representee for Hon. Alan Peter S. Cayetano
                </span>
              </p>
              <div className="badge badge-success mt-2  text-center text-green-900 bg-green-400 text-xs">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="card bg-base-200 w-[400px] flex flex-col p-2">
          <figure>
            <img src={sill} alt="Shoes" />
          </figure>

          <div className="card-body text-left">
            <h2 className="font-semibold">Hon. Mark O. Go</h2>
            <div className="text-xs">
              <p>
                Chairperson, Commitee on Higher and Technical Education of the
                House of Representatives
              </p>
              <p>Member</p>
              <p className="">
                Date Appointed:{" "}
                <span className="font-semibold">August 18, 2022</span>
              </p>
              <p>
                Duration: <span className="font-semibold">3 years</span>
              </p>
              <p>
                Term End: <span className="font-semibold">June 30, 2025</span>
              </p>
              <div className="badge badge-success mt-2  text-center text-green-900 bg-green-400 text-xs">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="card bg-base-200 w-[400px] flex flex-col p-2">
          <figure>
            <img src={sill} alt="Shoes" />
          </figure>

          <div className="card-body text-left">
            <h2 className="font-semibold">Hon. Lorna C. Silverio</h2>
            <div className="text-xs">
              <p>
                Office:{" "}
                <span className="font-semibold">
                  Chairperson, Commitee on Higher and Technical Education of the
                  House of Representatives
                </span>
              </p>
              <p className="">
                Position: <span className="font-semibold">Member</span>
              </p>
              <p className="">
                Date Appointed:{" "}
                <span className="font-semibold">August 18, 2022</span>
              </p>
              <p>
                Duration: <span className="font-semibold">3 years</span>
              </p>
              <p>
                Term End: <span className="font-semibold">June 30, 2025</span>
              </p>
              <p>
                Remarks:{" "}
                <span className="font-semibold">
                  Representee for Hon. Mark O. Go
                </span>
              </p>
              <div className="badge badge-success mt-2  text-center text-green-900 bg-green-400 text-xs">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListOfSuc = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">
      <div className="text-xl font-semibold inline-block">
        {page ? "Board of Regents" : "List of SUC's"}

        <div className="inline-block float-right">
          <div className="inline-block float-right">
            {/* <button className="btn px-6 btn-sm normal-case btn-primary">
              Add New
            </button> */}
          </div>
        </div>
      </div>

      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/suc"}>SUC's</Link>
          </li>
          <li>{page}</li>
        </ul>
      </div>

      <div className="divider mt-2"></div>

      {/* List of SUC's */}
      {page && page === "bulacan-agricultural-state-college" ? (
        <BoardListTable />
      ) : (
        <SucTable />
      )}
    </div>
  );
};

export default ListOfSuc;
