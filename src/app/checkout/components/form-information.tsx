'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/store/checkout";

const accountFormSchema = z.object({
  email: z.string().email(),
  country: z.string(),
  firstname: z.string().optional(),
  lastname: z.string(),
  address: z.string(),
  complement: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

function CustomInput(field) {
  return (
    <div className="relative">
      <Input className={`h-12 ${field.value && 'pt-6'}`} placeholder={field.placeholder} {...field} />
      {field.value && (
        <p className=" absolute text-xs top-2 left-3.5 text-gray-500">
          {field.placeholder}
        </p>
      )}
    </div>
  )
}

interface FormInformationProps {
  back: () => void;
  goNextStep: () => void;
}

export function FormInformation({ back, goNextStep }: FormInformationProps) {
  const { state, actions } = useCheckoutStore();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: state.checkoutInformations || {},
  })

  function onSubmit(data: AccountFormValues) {
    actions.setCheckoutInformations(data)
    goNextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <h2 className="font-bold">Contact</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput placeholder="Email or mobile phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-2"></div>
        <h2 className="font-bold">Shipping address</h2>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput placeholder="Country/Region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full space-x-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <CustomInput placeholder="First name (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <CustomInput placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput placeholder="Apartment, suite, etc. (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full space-x-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomInput placeholder="ZIP code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full justify-between pt-5">
          <Button type="button" onClick={back} variant="link" className="px-0 text-blue-500 text-sm space-x-2">
            <ChevronLeft size={18} />
            <span>Back to store</span>
          </Button>
          <Button type="submit">
            Continue to shipping
          </Button>
        </div>
      </form>
    </Form>
  )
}
