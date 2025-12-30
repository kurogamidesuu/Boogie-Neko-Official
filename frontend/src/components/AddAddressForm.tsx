import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Controller, useForm } from 'react-hook-form';
import { formSchema } from "@/lib/validators/address-schema";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Checkbox } from "./ui/checkbox";

interface AddAddressFormProps {
  onSuccess: () => void
};


export function AddAddressForm({ onSuccess } : AddAddressFormProps) {
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    onSuccess();
  }

  type AddressInput = z.input<typeof formSchema>

  const form = useForm<AddressInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isDefault: false,
      type: 'HOME',
      fullName: '',
      phone: '',
      pincode: '',
      city: '',
      state: '',
      houseNumber: '',
      area: '',
      landmark: '',
    }
  })

  return (
    <>
      <form id="address-form" onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
        <FieldGroup>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller 
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-muted-foreground -mb-2">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      name="full-name"
                      type="text"
                      placeholder="e.g. Kairi Kumar"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="-mt-2" />
                    )}
                  </Field>
                )}
              />
              <Controller 
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-muted-foreground -mb-2">
                      Phone Number
                    </FieldLabel>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50 text-gray-500 text-sm font-medium">+91</span>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        name="phone"
                        type="tel"
                        placeholder="98765 43210"
                        maxLength={10}
                        className="rounded-l-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="-mt-2" />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="pincode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-muted-foreground -mb-2">
                      Pincode
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      name="pincode"
                      type="text"
                      maxLength={6}
                      placeholder="110001"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="-mt-2" />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-muted-foreground -mb-2">
                      City
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      name="city"
                      type="text"
                      placeholder="New Delhi"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="-mt-2" />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="state"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-muted-foreground -mb-2">
                      State
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      name="state"
                      type="text"
                      placeholder="Delhi"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} className="-mt-2" />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="houseNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs text-muted-foreground -mb-2">
                    Flat, House no., Building, Company, Apartment
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    name="houseNumber"
                    type="text"
                    placeholder="e.g. Flat 402, Sunshine Heights"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="-mt-2" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="area"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs text-muted-foreground -mb-2">
                    Area, Street, Sector, Village
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    name="area"
                    type="text"
                    placeholder="e.g. Sector 18, MG Road"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="-mt-2" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="landmark"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs text-muted-foreground -mb-2">
                    Landmark (Optional)
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    name="landmark"
                    type="text"
                    placeholder="e.g. Near HDFC Bank ATM"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="-mt-2" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-xs text-muted-foreground -mb-2">
                    Save Address As
                  </FieldLabel>
                  <div 
                    className="flex gap-3"
                  >
                    {['HOME', 'WORK', 'OTHER'].map((type) => {
                      const isSelected = field.value === type;
                      return (
                        <Button
                          key={type}
                          type='button'
                          variant='outline'
                          onClick={() => field.onChange(type)}
                          className={`border rounded-full transition-colors
                            ${isSelected
                              ? 'bg-primary/10 border-primary hover:bg-primary/10'
                              : 'hover:bg-primary/5 hover:border-primary'}
                            `}
                        >
                          {type}
                        </Button>
                      );
                    })}
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="-mt-2" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="isDefault"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id='default-addr'
                      name={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor="default-addr" className="text-sm font-normal text-gray-600">
                      Make this my default address
                    </FieldLabel>
                  </div>
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </form>
      <Field>
        <Button type="submit" form="address-form">
          Add Address
        </Button>
      </Field>
    </>
  )
}