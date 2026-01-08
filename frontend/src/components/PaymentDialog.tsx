import z from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { paymentSchema } from "@/lib/validators/payment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { LoaderCircle } from "lucide-react";
import { SetStateAction } from "react";

interface PaymentDialogProps {
  handlePlaceOrder: (transactionId: string) => Promise<void>;
  isLoadingPayment: boolean;
  isPaymentDialogOpen: boolean;
  setIsPaymentDialogOpen: (value: SetStateAction<boolean>) => void;
}

export default function PaymentDialog({
  handlePlaceOrder,
  isLoadingPayment,
  isPaymentDialogOpen,
  setIsPaymentDialogOpen,
}: PaymentDialogProps) {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      transactionId: '',
    }
  });

  const handleSubmit = (data: z.infer<typeof paymentSchema>) => {
    handlePlaceOrder(data.transactionId);
  }

  return (
    <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsPaymentDialogOpen(true)} className="w-3/4 mx-auto block cursor-pointer h-10 rounded-[8px]" >Place Your Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Window</DialogTitle>
        </DialogHeader>
        <h1>Please Pay and enter your Transaction ID</h1>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Controller
            name="transactionId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="tx-id-input">Transaction ID</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  name="transactionId"
                  type="text"
                  id="tx-id-input"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field className="my-5">
            <Button type="submit">
              {isLoadingPayment
                ? (<LoaderCircle className="animate-spin" />)
                : ("Confirm Payment")}
              </Button>
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  )
}