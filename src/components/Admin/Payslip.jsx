import React from "react";
import { useParams, useLocation } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";
import { toast } from "react-toastify";
import api from "../../http"; // your axios instance


const Payslip = () => {
  const { state } = useLocation();
  const payslip = state?.payslipData;

  const { month, year } = useParams();

  if (!payslip) return <h3>No Payslip Data Found</h3>;

  const e = payslip;

const sendPayslipEmail = async () => {
  try {
    const data = await api.post("/admin/payslip/send-email", {
      employeeID: e.employeeID,
      month,
      year
    });
    toast.success(data.message);
  } catch (err) {
    console.error(err);
    toast.error("Error sending payslip PDF");
  }
};


  return (
    <div className="main-content">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h4>Employee Payslip</h4>
          </div>
        </div>

        <div className="card p-4">
          {/* ... rest of your payslip display ... */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="text-success mb-0">
              Net Pay: ₹{e.totalPay?.toFixed(2)}
            </h4>
            <button className="btn btn-primary" onClick={sendPayslipEmail}>
              Send Payslip to Email
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payslip;
