import { z } from "zod";

export const ledgerFormSchema = z
  .object({
    description: z.string(),
    debit: z.number(),
    credit: z.number(),
    date: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.credit !== 0 && data.debit !== 0) {
      ctx.addIssue({
        path: ["credit"],
        message: "You can't fill both debit and credit.",
        code: "custom",
      });
      ctx.addIssue({
        path: ["debit"],
        message: "You can't fill both debit and credit.",
        code: "custom",
      });
    }
  });

export type ledgerFormSchemaType = z.infer<typeof ledgerFormSchema>;
