import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/myContext";
import Swal from "sweetalert2";
const Home = () => {
  const { addLoan, loan, loader, handleRepayment } = useContext(userContext);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ amount, term });
    await addLoan({ amount, term });
    Swal.fire("Request is sent to the client");
    setTerm("");
    setAmount("");
  };
  const handlePaid = async (s, re) => {
    if (s?.status === "pending") {
      Swal.fire("Your Loan is not approved please wait...");
      return;
    }

    if (s?.status === "rejected") {
      Swal.fire("Your loan application is rejected.");
      return;
    }

    if (re?.status === "paid") {
      Swal.fire("Already Paid");
      return;
    }

    if (s?.status === "approved") {
      await handleRepayment(re, s._id);
      return;
    }
  };

  const handleCheck = (g, k, repayment) => {
    console.log(g?.repayments);
    const due = g?.repayments;
    for (let i = 0; i < due.length; i++) {
      if (due[i]?.status === "pending") {
        return i;
      }
    }
    return;
  };
  return (
    <div className="uploadGallery">
      <form className="row" onSubmit={handleSubmit}>
        <div className="child">
          <div className="row my-2">
            <h1>Apply for Loan </h1>
          </div>
          <div className="row mt-2">
            <input
              className="form-control me-2"
              type="number"
              value={amount}
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="row my-2">
            <input
              className="form-control me-2"
              type="number"
              value={term}
              placeholder="term"
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <button className="btn btn-success w-25">
              {loader ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <div className="LoanData">
        <div></div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">S.No</th>
              <th scope="col">Amount</th>
              <th scope="col">Term</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {loan?.length > 0 ? (
              loan?.map((g, i) => (
                <>
                  <tr
                    key={g._id}
                    className={`${
                      g?.status === "pending" ? "table-danger" : "table-success"
                    }`}
                  >
                    <th scope="row">{i + 1}</th>
                    <td>₹{g?.amount}</td>
                    <td>{g?.term}</td>
                    <td>{g?.status}</td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <table className="table mx-5">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Repayment Date</th>
                            <th scope="col">
                              Repayment <br /> Amount
                            </th>
                            <th scope="col">status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {g.repayments.map((repayment, j) => (
                            <tr
                              key={j}
                              className={`${
                                repayment?.status === "pending"
                                  ? "table-danger"
                                  : "table-success"
                              }`}
                              style={{
                                textDecoration:
                                  repayment?.status === "paid" && "underline",
                              }}
                            >
                              <th scope="row">{j + 1}</th>
                              <td>
                                {new Date(repayment.date).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(repayment.date).toLocaleTimeString()}
                              </td>
                              <td>
                                <span className="">
                                  ₹ {Math.floor(repayment.amount)}
                                </span>
                              </td>
                              <td>
                                <span>{repayment.status}</span>
                              </td>
                              <td>
                                {j === handleCheck(g, i, repayment) ? (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handlePaid(g, repayment)}
                                  >
                                    {repayment.status === "pending"
                                      ? "PAY"
                                      : "PAID"}
                                  </button>
                                ) : (
                                  repayment.status === "paid" && (
                                    <button
                                      className="btn btn-success"
                                      onClick={() => handlePaid(g, repayment)}
                                    >
                                      PAID
                                    </button>
                                  )
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <h5>You have not Applied</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
