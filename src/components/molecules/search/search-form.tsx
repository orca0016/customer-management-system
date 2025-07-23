import { useContext, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useSearchParams } from "react-router";
import { useDebounce } from "../../../hooks/use-debounce";
import { SearchContext } from "../../../providers/search";
import { updateQuery } from "../../../utils/handle-change-query";
import {
  searchFormSchema,
  type searchFormSchemaType,
} from "../../../validations/search-form-validation";
import { Input } from "../../atom/input";

export const SearchForm: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 600);
  const context = useContext(SearchContext);

  useEffect(() => {
    context.setSearch(debounceSearch);
  }, [context, debounceSearch]);

  return (
    <div>
      <Input onChange={(e) => setSearch(e.target.value)} placeholder="search" />
    </div>
  );
};

export const SearchForm2: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm<searchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
  });
  const debounceSearch = useDebounce(form.watch("search") || "", 600);

  useEffect(() => {
    const initialValue = searchParams.get("s") || "";
    form.setValue("search", initialValue);
  }, []);

  useEffect(() => {
    if (form.formState.errors?.search)
      return updateQuery({
        key: "s",
        value: "",
        searchParams,
        setSearchParams,
      });


    updateQuery({
      key: "s",
      value: debounceSearch,
      searchParams,
      setSearchParams,
    });
  }, [
    debounceSearch,
    searchParams,
    setSearchParams,
    form.formState.errors?.search,
  ]);

  return (
    <div>
      <Controller
        control={form.control}
        name="search"
        render={({ field, fieldState: { error } }) => (
          <Input {...field} error={error?.message} placeholder="search" />
        )}
      />
    </div>
  );
};
