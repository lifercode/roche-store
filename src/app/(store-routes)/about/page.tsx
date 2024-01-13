import { ArrowRight, KeyRound, Network, PartyPopper, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyStore() {
  return (
    <div className="container max-w-[800px] py-10">
      <div className="mb-20">
        <h2 className=" text-4xl font-semibold mb-5">About Roche</h2>
        <p className="mb-8">
          <span>This project was created to set up an online store for selling test products, using technologies like </span>
          <Link href="https://nextjs.org" target="_blank" className="font-bold">NextJS 13+</Link>
          <span>, </span>
          <Link href="https://tailwindui.com" target="_blank" className="font-bold">TailwindCSS</Link>
          <span>, </span>
          <Link href="https://ui.shadcn.com" target="_blank" className="font-bold">shadcn/ui</Link>
          <span> components, and more.</span>
        </p>
        <video
          className="w-full rounded-lg border-4 border-opacity-50 shadow-md"
          controls
          src="https://fbhdvyqxwzywflaexvol.supabase.co/storage/v1/object/public/shorts/roche-video.mp4"
        />
      </div>
      <div className="mb-20">
        <h2 className="flex items-center space-x-2 text-2xl font-semibold mb-5">
          <KeyRound />
          <span>Access data</span>
          <span className="text-sm italic text-gray-400">(admin)</span>
        </h2>
        <ul className="border rounded shadow p-5">
          <li>
            <span className="font-bold mr-3 w-20 inline-block text-right">email:</span>
            <span>admin@roche.store</span>
          </li>
          <li>
            <span className="font-bold mr-3 w-20 inline-block text-right">password:</span>
            <span>123</span>
          </li>
        </ul>
      </div>
      <div className="mb-20">
        <h2 className="flex items-center space-x-2 text-2xl font-semibold mb-5">
          <Network />
          <span>Site map</span>
        </h2>
        <Image src="/mind-map.png" alt="mind-map" width={800} height={400} className="rounded-lg border-4 border-opacity-50 shadow-md" />
      </div>
      <div className="mb-20">
        <h2 className="flex items-center space-x-2 text-2xl font-semibold mb-5">
          <Network />
          <span>Codebase</span>
        </h2>
        <Image src="/codebase.png" alt="codebase" width={800} height={400} className="rounded-lg border-4 border-opacity-50 shadow-md" />
      </div>
      <div className="mb-20">
        <h2 className="flex items-center space-x-2 text-2xl font-semibold mb-2">
          <Rocket />
          <span>Improvements for the future</span>
        </h2>
        <p className="mb-6 text-gray-600">
          {`If someday I choose to keep working on this project to make it as thorough as can be, I'd likely implement a few enhancements...`}
        </p>
        <ul>
          <li className="flex items-center space-x-2 mb-2">
            <ArrowRight />
            <span>Loading component on pages;</span>
          </li>
          <li className="flex items-center space-x-2 mb-2">
            <ArrowRight />
            <span>Terms of Service and Privacy Policy pages;</span>
          </li>
          <li className="flex items-center space-x-2 mb-2">
            <ArrowRight />
            <span>Complete login form validation;</span>
          </li>
          <li className="flex items-center space-x-2 mb-2">
            <ArrowRight />
            <span>Persist data in sessionStorage;</span>
          </li>
          <li className="flex items-center space-x-2 mb-2">
            <ArrowRight />
            <span>Next Auth Google Provider;</span>
          </li>
        </ul>
      </div>
      <div className="mb-20">
        <h2 className="flex items-center space-x-2 text-2xl font-semibold mb-5">
          <PartyPopper />
          <span>Credits</span>
        </h2>
        <p>
          Developed by <Link href="https://lifercode.dev/" target="_blank" className="font-bold">@lifercode</Link> as part of a job challenge.
        </p>
        <br />
        <p>lifercode@gmail.com</p>
        <p>+5521976783407</p>
        <br />
        <p className="text-5xl">🖖</p>
      </div>
    </div>
  )
}