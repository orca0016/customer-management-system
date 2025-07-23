import { useContext } from "react";
import { DialogContext } from "../../../providers/dialog";
import SelectSortInput, { type optionType } from "../../atom/select-sort-input";
import { EmptyIcon } from "../../icons/empty";
import { Button } from "../../atom/button";

const columns = [
  {
    header: "ID",
    onclick: () => undefined,
  },

  {
    header: "Description",
    onclick: () => undefined,
  },
  {
    header: "Date",
    onclick: () => undefined,
  },
  {
    header: "Debit",
    onclick: () => undefined,
  },
  {
    header: "Credit",
    onclick: () => undefined,
  },
  {
    header: "Action",
    onclick: () => undefined,
  },
];

const TableLedgerList = ({
  data,
  setCurrentLedger,
}: {
  data: ILedgerResponse | undefined;
  setCurrentLedger: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { setOpen } = useContext(DialogContext);
  return (
    <table className="min-w-full text-sm text-left border border-gray-300 rounded-xl ">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((header, index) => (
            <th onClick={header.onclick} key={index} className="px-4 py-2">
              {["DATE", "CREDIT", "DEBIT"].find(
                (item) => item === header.header.toUpperCase()
              ) ? (
                <SelectSortInput
                  title={header.header}
                  optionType={header.header.toUpperCase() as optionType}
                />
              ) : (
                <>{header.header}</>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!data?.list.length ? (
          <tr>
            <td colSpan={6}>
              <div className="w-full flex justify-center py-8">
                <EmptyIcon className="w-30 h-30" />
              </div>
            </td>
          </tr>
        ) : (
          data?.list.map((row) => (
            <tr key={row.id} className="border-t border-gray-300">
              {Object.values(row)
                .filter((_, index) => index < 1 || index > 2)
                .map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {cell}
                  </td>
                ))}
              <td className="py-2">
                <Button
                  variant="danger"
                  onClick={() => {
                    setOpen((prev) => ({ ...prev, deleteLedger: true }));
                    setCurrentLedger(row.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableLedgerList;
