import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSearchParams } from "react-router";
import { TrendingDownIcon, TrendingUpIcon } from "../../assets/icons";
import { updateQuery } from "../../utils/handle-change-query";

export type optionType = "DATE" | "DEBIT" | "CREDIT";
const SelectSortInput = ({
  title,
  optionType,
}: {
  title: string;
  optionType: optionType;
}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (duration: "ASC" | "DESC") => {
    updateQuery({
      key: "sort",
      value: `${duration}_${optionType}`,
      searchParams,
      setSearchParams,
    });
  };
  return (
    <div>
      <Menu>
        <MenuButton>{title}</MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-slate-300 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 space-y-3"
        >
          <MenuItem>
            <p
              onClick={() => handleSortChange("ASC")}
              className="inline-flex items-center gap-2 rounded-md bg-slate-200  w-full px-3  text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700 py-3 cursor-pointer"
            >
              Sort ascending <TrendingUpIcon />
            </p>
          </MenuItem>
          <MenuItem>
            <p
              onClick={() => handleSortChange("DESC")}
              className="inline-flex items-center gap-2 rounded-md bg-slate-200  w-full px-3  text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700 py-3 cursor-pointer"
            >
              Sort Descending <TrendingDownIcon />
            </p>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default SelectSortInput;
