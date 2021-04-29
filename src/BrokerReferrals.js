import ClientsTable from "./ClientsTable";
import "./BrokerReferrals.scss";

function BrokerReferrals() {
  //TODO: Stop hardcoding the values
  return (
    <div className="broker-referrals">
      <div className="referrals-info">
        <div className="referrals-info-item">
          <label>Email sent</label>
          <p>9 999</p>
        </div>
        <div className="referrals-info-item">
          <label>Conversions</label>
          <p>199</p>
        </div>
        <div className="referrals-info-item">
          <label>Your earnigs</label>
          <p>250K+</p>
        </div>
      </div>
      <ClientsTable />
    </div>
  );
}
export default BrokerReferrals;
