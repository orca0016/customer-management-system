import { Navigate, useParams } from "react-router";
import { CustomerInfo } from "../organisms/customer-info";
import CustomerLedgerList from "../molecules/ladger/customer-ledger-list";

export const CustomerInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cid = Number(id);
  if (isNaN(cid) || cid < 1) return <Navigate to="/not-found" />;
  return (
    <main className="mx-auto  container mt-14 max-w-[1000px]">
      <CustomerInfo id={cid} />
      <CustomerLedgerList cid={cid}/>
      
    </main>
  );
};
