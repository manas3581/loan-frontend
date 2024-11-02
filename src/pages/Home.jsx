import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../context/myContext";
import Swal from "sweetalert2";
import { FaInfoCircle } from "react-icons/fa";
import Info from "../model/Info";
const Home = () => {
  const { addLoan, loan, loader, handleRepayment } = useContext(userContext);
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("1");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [interestRate, setInterestRate] = useState([
    {
      type: "Home Loan",
      rate: "10%",
      id:"1"
    },
    {
      type: "Personal Loan",
      rate: "12%",
      id:"2"
    },
    {
      type: "Business Loan",
      rate: "11%",
      id:"3"
    },
    {
      type: "Education Loan",
      rate: "9%",
      id:"4"
    },
    {
      type: "Car Loan",
      rate: "10%",
      id:"5"
    },
    {
      type: "Gold Loan",
      rate: "8%",
      id:"6"
    },
    {
      type: "IT Equipment Loan",
      rate: "8.5%",
      id:"7"
    },
    {
      type: "Startup Business Loan",
      rate: "10%",
      id:"8"
    },
    {
      type: "Technology Development Loan",
      rate: "7%",
      id:"9"
    },
    {
      type: "Software Development Loan",
      rate: "9.5%",
      id:"10"
    },
    {
      type: "E-commerce Business Loan",
      rate: "9%",
      id:"11"
    },
    {
      type: "Marketing and Advertising Loan",
      rate: "10.5%",
      id:"12"
    },
    {
      type: "Franchise Loan",
      rate: "9%",
      id:"13"
    },
    {
      type: "Research and Development Loan",
      rate: "6.5%",
      id:"14"
    }
  ]);


  const calculateTotalAmount = (amount,term) => {
    console.log()
  const rateExt=interestRate.find((i)=>i.id===rate);
console.log(rateExt)
    const newRate = rateExt?.rate?.split("%")[0];
console.log(newRate)

    const P = amount;
    const r = newRate / 100; 
    const n = 1; 
    const t = term;
    return Math.floor(P * Math.pow((1 + r / n), n * t));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  const newAmount=  calculateTotalAmount(amount,term);
console.log(newAmount)
const rateExt=interestRate.find((i)=>i.id===rate);

const newRate = rateExt?.rate?.split("%")[0];
const loanType=interestRate.find((i)=>i.id===rate)?.type
console.log("bjdwe",newRate,loanType)
    await addLoan({amount: newAmount, term ,type:loanType,rate:newRate});
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
    // console.log(g?.repayments);
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
          <div className=" my-2"
          style={{
            display: "flex",justifyContent:"start",alignItems:"center"}}
          >
            <h1 className="mx-2">Apply for Loan </h1>
            <FaInfoCircle fontSize={20} style={{cursor:"pointer"}} onClick={handleOpen}/>
          </div>
          <div className="row mt-2">
           

            <select name="interestRate" 
              className="form-control me-2"
            onChange={(e) => setRate(e.target.value)}
            value={rate}
            required
            >

              {
                interestRate?.map((i, index) => (
                  <option key={index} value={i.id}>
                    {i.type} - {i.rate}
                    
                    </option>
                ))
              }
            </select>
          </div>
          <div className="row mt-2">
            <input
              className="form-control me-2"
              type="number"
              value={amount}
              placeholder="Loan Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="row my-2">
            <input
              className="form-control me-2"
              type="number"
              value={term}
              placeholder="Term In Years"
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
              <th scope="col">Loan Type</th>
              <th scope="col">Rate</th>

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
                    <td>{g?.type}</td>
                    <td>{g?.rate}</td>

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
                                  ₹ {

                                  parseFloat((repayment.amount.toFixed(2)))

                                  }
                                 
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
      <Info handleClose={handleClose} open={open}/>
    </div>
  );
};

export default Home;
