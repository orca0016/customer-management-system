import { zodResolver } from "@hookform/resolvers/zod";
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../atom/button";
import { Input } from "../../atom/input";
import { TextAriaInput } from "../../atom/textarea";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import { addLedgerCustomer } from "../../../apis/ledger-list";
import { DialogContext } from "../../../providers/dialog";
import { queryClient } from "../../../providers/query";
import {
  ledgerFormSchema,
  type ledgerFormSchemaType,
} from "../../../validations/ledger-form-validation";

const AddLedgerForm = ({ cid }: { cid: number }) => {
  const { setOpen } = useContext(DialogContext);

  const { control, handleSubmit } = useForm<ledgerFormSchemaType>({
    resolver: zodResolver(ledgerFormSchema),
  });

  const adCustomer = useMutation({
    mutationKey: ["ledger-customer-add"],
    mutationFn: addLedgerCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ledger-customer"] });
      toast.success("ledger added");
    },
    onError: (e) => {
      console.log(e);
      toast.error("some thing went wrong.");
    },
  });
  const onSubmit = (data: ledgerFormSchemaType) => {
    const isoDate = new Date(data.date).toISOString();
    adCustomer.mutate({
      data: {
        ...data,
        date: isoDate,
        customerId: cid,
      },
    });
    setOpen((prev) => ({ ...prev, addLedger: false }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Controller
          name="debit"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="debit customer"
              error={error?.message}
              value={field.value}
              type="number"
            />
          )}
        />
        or
        <Controller
          name="credit"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              placeholder="credit customer"
              error={error?.message}
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </div>
      <Controller
        name="date"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Flatpickr
              data-enable-time
              placeholder="select a date"
              options={{ enableTime: true, dateFormat: "Y-m-d H:i" }}
              className={`w-full border ${
                !error ? "border-gray-300" : "border-red-500"
              } px-3 py-2 rounded-lg disabled:bg-gray-100`}
              value={field.value}
              onChange={([date]) => field.onChange(date)}
            />
            {error && (
              <p className="text-red-500 mt-1 text-xs font-medium">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextAriaInput
            placeholder="enter a description"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Button variant="secondary" className=" w-full" type="submit">
        add new ledger
      </Button>
    </form>
  );
};

export default AddLedgerForm;
