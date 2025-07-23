import { useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router";
import { updateQuery } from "../../utils/handle-change-query";
import { Button } from "./button";

interface IPaginationProps {
  queryKey: string;
  totalPages: number;
  disabled?: boolean;
}

export const Pagination: React.FC<IPaginationProps> = ({
  queryKey,
  totalPages,
  disabled = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    return Number(searchParams.get(queryKey)) || 1;
  }, [searchParams, queryKey]);

  return (
    <div className="flex w-full items-center justify-between">
      <Button
        disabled={page <= 1 || disabled}
        variant="ghost"
        className="!px-1 !py-1"
        onClick={() =>
          updateQuery({
            key: "page",
            value: String(page - 1),
            searchParams,
            setSearchParams,
          })
        }
      >
        <IoIosArrowBack className="w-6 h-6 text-slate-800" />
      </Button>
      <div className="flex justify-center items-center w-7 h-7 border border-slate-300 rounded-lg">
        <p>{page}</p>
      </div>
      <Button
        disabled={page >= totalPages || disabled}
        variant="ghost"
        className="!px-1 !py-1"
        onClick={() => updateQuery({
            key: "page",
            value: String(page + 1),
            searchParams,
            setSearchParams,
          })}
      >
        <IoIosArrowForward className="w-6 h-6 text-slate-800" />
      </Button>
    </div>
  );
};
