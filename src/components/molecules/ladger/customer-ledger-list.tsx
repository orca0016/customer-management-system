import { useContext, useMemo, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import {
  deleteLedgerCustomer,
  getAllLedgers,
  type sortType,
} from "../../../apis/ledger-list";
import { DialogContext } from "../../../providers/dialog";
import { queryClient } from "../../../providers/query";
import { Button } from "../../atom/button";
import { Dialog } from "../../atom/dialog";
import { Pagination } from "../../atom/pagination";

import { SearchForm2 } from "../search/search-form";
import TableLedgerList from "./table-ledger-list";

const CustomerLedgerList = ({ cid }: { cid?: number }) => {
  const [currentLedger, setCurrentLedger] = useState<number>(-1);

  const { setOpen } = useContext(DialogContext);
  const [searchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("s")?.trim?.();
  }, [searchParams]);

  const sort = useMemo(() => {
    return searchParams.get("sort")?.trim?.();
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page")) || 1;
  }, [searchParams]);

  const { data, isPending } = useQuery({
    queryKey: ["ledger-customer", cid, search, sort, page],
    queryFn: async () =>
      await getAllLedgers({
        cid,
        search,
        sort: (sort as sortType) || undefined,
        page,
      }),
  });

  const deleteLedger = useMutation({
    mutationFn: () => deleteLedgerCustomer(currentLedger),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ledger-customer"] });
      toast.warning("ledger removed.");
    },
    onError: () => {
      toast.error("some thing went wrong.");
    },
  });
  return (
    <div className="py-10">
      <Dialog purpose="deleteLedger" title="delete this ledger ?">
        <div className="flex w-full pt-6 justify-around gap-4">
          <Button
            variant="primary"
            onClick={() =>
              setOpen((prev) => ({ ...prev, deleteLedger: false }))
            }
            className="w-1/2 text-black"
          >
            cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteLedger.mutate();
              setOpen((prev) => ({ ...prev, deleteLedger: false }));
            }}
            className="w-1/2"
          >
            delete
          </Button>
        </div>
      </Dialog>
      <div className="pb-6">
        <SearchForm2 />
      </div>
      <TableLedgerList setCurrentLedger={setCurrentLedger} data={data} />
      <div className=" my-4">
        <Pagination queryKey="page" totalPages={data?.totalPages || 0} disabled={isPending} />
      </div>
    </div>
  );
};

export default CustomerLedgerList;
