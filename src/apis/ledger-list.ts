import axios from "axios";

export type sortType =
  | "ASC_DATE"
  | "DESC_DATE"
  | "ASC_DEBIT"
  | "DESC_DEBIT"
  | "ASC_CREDIT"
  | "DESC_CREDIT";

interface IQuerySearch {
  search?: string;
  cid?: number;
  page?: number;
  limit?: number;
  sort?: sortType;
}

export const getAllLedgers = async ({
  search,
  cid,
  page,
  limit,
  sort,
}: IQuerySearch): Promise<ILedgerResponse> => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (cid) params.append("cid", cid.toString());
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (sort) params.append("sort", sort);

  const response = await axios.get(
    `http://localhost:3000/transactions/ledger`,
    {
      params,
    }
  );

  return response.data;
};

export const deleteLedgerCustomer = (ledgerId: number) => {
  return axios.delete(`http://localhost:3000/transactions/${ledgerId}`);
};
export const addLedgerCustomer = ({
  data,
}: {
  data: Partial<ILedgerType & { customerId: number }>;
}) => {
  return axios.post(`http://localhost:3000/transactions`, data);
};
