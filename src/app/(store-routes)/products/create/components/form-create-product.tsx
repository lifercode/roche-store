'use client'

import { createId } from '@paralleldrive/cuid2';
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyInput } from 'react-currency-mask';
import { useRouter } from "next/navigation";
import { ChevronLeft, ImageIcon, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useShopStore } from "@/store/shop";
import Link from 'next/link';
import Image from 'next/image';
import { ImageObject, MediaGallery } from './media-gallery';
import { useState } from 'react';
import { medias } from '@/config/mock';

const accountFormSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string().optional(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function FormCreateProduct() {
  const router = useRouter();
  const { actions: { addProduct } } = useShopStore();
  const [image, setImage] = useState<ImageObject | null>(null);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      price: 0,
      description: ''
    }
  });

  function onSubmit(data: AccountFormValues) {
    addProduct({
      id: createId(),
      title: data?.title,
      price: data?.price || 0,
      description: data?.description || '',
      image: image ? image.url : ''
    })

    toast("Product registered successfully.", {
      description: data.title,
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      }
    });
    router.push('/store');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="mb-10">
          <h2 className="font-bold text-4xl">New Product</h2>
          <p className="">
            
          </p>
        </div>

        <h3 className="font-bold">Product info</h3>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Title</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Price</FormLabel>
              <FormControl>
                <CurrencyInput
                  {...field}
                  currency="USD"
                  locale="en-us"
                  defaultValue="0"
                  onChangeValue={(_, originalValue) => {
                    form.setValue('price', Number(originalValue))
                  }}
                  InputElement={<Input />}
                />
              </FormControl>
              {!Boolean(form.watch('price')) && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className="text-primary">
            <span>Image</span>
          </FormLabel>
          <div className="pt-2">
            <div className="w-full">
              <MediaGallery resources={medias} image={image} setImage={setImage}>
                <Button className="w-32 h-32 p-0 overflow-hidden bg-gray-100 border hover:bg-gray-200">
                  {!image ? (
                    <ImageIcon size={50} className="text-gray-500" />
                  ) : (
                    <Image src={image.url} alt="upload-image-icon" width={100} height={100} className="w-full" />
                  )}
                </Button>
              </MediaGallery>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between pt-5">
          <Button variant="link" className="px-0 text-blue-500 text-sm space-x-2" asChild>
            <Link href="/store">
              <ChevronLeft size={18} />
              <span>Back to store</span>
            </Link>
          </Button>
          <Button type="submit">
            Create the product
          </Button>
        </div>
      </form>
    </Form>
  )
}
