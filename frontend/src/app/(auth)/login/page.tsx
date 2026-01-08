"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api";
import { loginSchema } from "@/lib/validators/login-schema";
import { useAuth } from "@/store/use-auth";
import { useCart } from "@/store/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from 'react-hook-form';
import { toast } from "sonner";
import * as z from 'zod';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { syncWithServer } = useCart();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await loginUser(data);
      login(res.access_token, res.user);

      await syncWithServer();

      toast('Welcome back');
      router.push('/');
    } catch(e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
        form.reset();
      } else {
        toast.error('Something went wrong');
      }
    }
  }

  return (
    <div className="w-2/3 border-2 shadow-md rounded-lg font-body py-4">
      <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)} className="p-5">
        <FieldTitle>
          <FieldTitle className="text-2xl font-heading">
            Login
          </FieldTitle>
        </FieldTitle>
        <FieldGroup className="h-100 flex flex-col items-center justify-center">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="-mb-2 ml-2 text-muted-foreground font-semibold">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  name="email"
                  type="email"
                  className="h-10 rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="-mb-2 ml-2 text-muted-foreground font-semibold">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  name="password"
                  type="password"
                  className="h-10 rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field className="w-70 pt-10">
            <Button type="submit" className="h-10 rounded-full">
              Login
            </Button>
          </Field>
        </FieldGroup>
        <Field className="pt-10">
          <p className="text-sm text-center">Don&apos;t have an account?
            <Link href='/signup' className="text-primary"> Signup here</Link>
          </p>
        </Field>
      </form>
    </div>
  )
}