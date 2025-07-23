interface ILedgerResponse {
  list: ILedgerType[];
  total: number;
  totalPages: number;
}
interface ILedgerType {
  id: number;
  description: string;
  date: string;
  debit: number;
  credit: number;
}
