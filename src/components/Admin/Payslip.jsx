import { useParams, useLocation } from "react-router-dom";
import HeaderSection from "../../components/HeaderSection";

const Payslip = () => {
  const { state } = useLocation();
  const payslip = state?.payslipData; // 👈 Yahi data use karenge

  const { month, year } = useParams();

  // Agar data nahi mila
  if (!payslip) return <h3>No Payslip Data Found</h3>;

  // Date Format: DD/MM/YYYY
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const e = payslip; // shortcut

const sendPayslipEmail = async () => {
  try {
    const response = await fetch(
      `https://nextviewpayrollbackendmern.onrender.com/api/payslip/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeID: e.employeeID,
          month,
          year,
        }),
      }
    );
    const data = await response.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Error sending payslip email");
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
        <h4 className="text-center mb-3">NextTech Group Pvt. Ltd.</h4>

        <div className="row mb-4">
          <div className="col-md-6">
            <strong>Employee Name:</strong> {e.name}<br />
            <strong>Email:</strong> {e.email}<br />
            <strong>Month:</strong> {month}/{year}
          </div>
          <div className="col-md-6 text-right">
            <strong>Company:</strong> NextTech Group<br />
            <strong>Website:</strong> nexttechgroup.com<br />
            <strong>Date:</strong> {formattedDate}
          </div>
        </div>

        <h5>Earnings</h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Gross Salary</td>
              <td>₹{e.earnings?.gross?.toFixed(2)}</td>
            </tr>

            <tr>
              <td>Per Day Salary</td>
              <td>₹{e.perDaySalary?.toFixed(2)}</td>
            </tr>

            <tr>
              <td>Present Days</td>
              <td>{e.presentDays}</td>
            </tr>

            <tr>
              <td>Till Date Salary</td>
              <td>₹{e.tillDateSalary?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <h5>Deductions</h5>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>PF</td>
              <td>₹{e.deductions?.pfEmployee?.toFixed(2)}</td>
            </tr>

            <tr>
              <td>ESI</td>
              <td>₹{e.deductions?.esiEmployee?.toFixed(2)}</td>
            </tr>

            <tr>
              <td>TDS</td>
              <td>₹{e.deductions?.tdsMonthly?.toFixed(2)}</td>
            </tr>

            <tr>
              <td>Other Deductions</td>
              <td>₹{e.deductions?.professionalTax?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

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
