import { useContext } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import {
  convertAvatarToSrc,
  getCustomerInfo,
  removeCustomer,
} from "../../apis/customers.api";
import { DialogContext } from "../../providers/dialog";
import { queryClient } from "../../providers/query";
import { Button } from "../atom/button";
import { Dialog } from "../atom/dialog";
import AddLedgerForm from "../molecules/ladger/add-ledger-form";

interface ICustomerProps {
  id: number;
}
export const CustomerInfo: React.FC<ICustomerProps> = ({ id }) => {
  const navigate = useNavigate();
  const { setOpen } = useContext(DialogContext);
  const query = useQuery({
    queryKey: ["get-customer-info", id],
    queryFn: () => getCustomerInfo(id),
  });

  const deleteCustomer = useMutation({
    mutationKey: ["remove-customer"],
    mutationFn: removeCustomer,
    onSuccess: () => {
      navigate("/customers");
      queryClient.invalidateQueries({ queryKey: ["customers-list"] });
    },
    onError: (e) => console.log(e),
  });

  if (query.isPending || !query.data) return <p>loading...</p>;

  return (
    <div className="flex justify-between items-center sm:flex-nowrap flex-wrap gap-2 w-full border border-slate-300 rounded-md p-5">
      <Dialog purpose="addLedger" title="add new ledger">
        <AddLedgerForm cid={id} />
      </Dialog>
      <div className="flex gap-x-3 items-center">
        <img
          src={convertAvatarToSrc(query.data.avatar)}
          className="w-20 aspect-square"
          alt="avatar"
        />
        <div>
          <p>Name: {query.data.name}</p>
          <p>Email: {query.data.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link to={`/customers/edit/${query.data.id}`}>
          <Button>Edit</Button>
        </Link>
        <Button
          variant="danger"
          onClick={() => deleteCustomer.mutate(query.data.id)}
        >
          Remove
        </Button>
        <Button
          variant="secondary"
          onClick={() => setOpen((prev) => ({ ...prev, addLedger: true }))}
        >
          Add ledger
        </Button>
      </div>
    </div>
  );
};
