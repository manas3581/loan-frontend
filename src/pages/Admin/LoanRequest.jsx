import React, { useEffect, useContext } from "react";
import { userContext } from "../../context/myContext";
import { useNavigate } from "react-router-dom";

import { Select } from "antd";
const LoanRequest = () => {
  const { handleGetAllLoan, loLogOut, AllLoan, handleStatusUpdate } =
    useContext(userContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await loLogOut();
    if (data.success) {
      navigate("/login");
    }
  };
  useEffect(() => {
    const fetchLoan = async () => {
      await handleGetAllLoan();
    };
    fetchLoan();
  }, []);
  const onChange = async (value, l) => {
    console.log(`selected ${value}`, l);
    await handleStatusUpdate({ status: value }, l?._id);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-9">
            <div className="row">
              <button
                className=" my-3 w-25 btn btn-dark"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
            <div className="row text-center my-2">
              <div className="heading_Loan_Admin">
                <div>LOAN STATUS</div>
              </div>
            </div>
            <div className="row">
              <table class="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">S.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Term</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AllLoan?.map((l, i) => (
                    <tr
                      className={`${
                        l.status === "pending"
                          ? "table-danger"
                          : l.status === "rejected"
                          ? "table-dark"
                          : "table-success"
                      }`}
                    >
                      <th scope="row">{i + 1}</th>
                      <td>{l?.userId?.name}</td>
                      <td>{l?.userId?.email}</td>
                      <td>₹{l?.amount}</td>
                      <td>{l?.term}</td>
                      <td>
                        <Select
                          showSearch
                          placeholder={l?.status}
                          optionFilterProp="children"
                          onChange={(e) => onChange(e, l)}
                          filterOption={filterOption}
                          options={[
                            {
                              value: "pending",
                              label: "pending",
                            },
                            {
                              value: "rejected",
                              label: "rejected",
                            },
                            {
                              value: "approved",
                              label: "approved",
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanRequest;
