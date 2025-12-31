"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api";
import { signupSchema } from "@/lib/validators/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from 'react-hook-form';
import { toast } from "sonner";
import * as z from 'zod';

export default function SignupPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      await registerUser({
        ...data,
        role: "USER",
      });
      toast('Signup Successful');
      router.push('/login');
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
      <form id="signup-form" onSubmit={form.handleSubmit(handleSubmit)} className="p-5">
        <FieldTitle>
          <FieldTitle className="text-2xl font-heading mb-5">
            Signup
          </FieldTitle>
        </FieldTitle>
        <FieldGroup className="flex flex-col items-center justify-center gap-4">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="-mb-2 ml-2 text-muted-foreground font-semibold">
                  First Name
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  name="first-name"
                  type="text"
                  className="h-10 rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="-mt-2 text-xs" />
                )}
              </Field>
            )}
          /><Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="-mb-2 ml-2 text-muted-foreground font-semibold">
                  Last Name
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  name="last-name"
                  type="text"
                  className="h-10 rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="-mt-2 text-xs" />
                )}
              </Field>
            )}
          />
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
                  <FieldError errors={[fieldState.error]} className="-mt-2 text-xs" />
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
                  <FieldError errors={[fieldState.error]} className="-mt-2 text-xs" />
                )}
              </Field>
            )}
          />
          <Field className="w-70 pt-10">
            <Button type="submit" className="h-10 rounded-full">
              Signup
            </Button>
          </Field>
        </FieldGroup>
        <Field className="pt-10">
          <p className="text-sm text-center">Already have an account?
            <Link href='/login' className="text-primary"> Login here</Link>
          </p>
        </Field>
      </form>
    </div>
  )
}