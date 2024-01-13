'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Upload } from "lucide-react"
import Image from "next/image"
import React from "react"

export interface ImageObject {
  id: string;
  url: string;
}

interface MediaGalleryProps {
  children: React.ReactNode;
  resources: ImageObject[];
  image: ImageObject | null;
  setImage: (image: ImageObject) => void;
}

export function MediaGallery({ children, resources, image, setImage }: MediaGalleryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Media gallery</DialogTitle>
          <DialogDescription>
            {`Select an image from the gallery to use on your product.`}
          </DialogDescription>
        </DialogHeader>

        <div className="px-2 h-[400px] overflow-y-auto">
          <div className="grid gap-4 grid-cols-3 py-4">
            {resources?.map((item) => (
              <div key={item.id} className="">
                <Button type="button" onClick={() => setImage(item)} className={`w-full h-auto p-0 m-0 overflow-hidden border ${item.id === image?.id ? 'ring-primary ring-2 ring-offset-2' : 'hover:ring-primary hover:ring-2 hover:ring-offset-2'}`}>
                  <Image src={item.url} alt={item.id} width={100} height={100} className="w-full" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>

          <Tooltip>
            <TooltipTrigger disabled>
              <Button disabled variant="outline" type="button" className="space-x-2">
                <Upload size={20} />
                <span>Upload file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This function is not yet available, try soon.</p>
            </TooltipContent>
          </Tooltip>

          <DialogTrigger disabled={!image}>
            <Button type="button" disabled={!image}>Save changes</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
