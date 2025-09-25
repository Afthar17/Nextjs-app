"use client";

import { createTrip } from "@/lib/actions/createTrip";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function page() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" flex flex-col min-w-lg shadow-sm px-4 py-8 border border-gray-200 rounded-lg">
        <h1 className=" text-3xl text-center font-semibold">New Trip</h1>
        <form
          action={(formData: FormData) => {
            if (imageUrl) formData.append("imageUrl", imageUrl);
            startTransition(() => {
              createTrip(formData);
            });
          }}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col my-2">
            <label className="mb-2 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter the name of your trip..."
              className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-2 text-sm font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              id="description"
              required
              placeholder="Enter the name of your trip..."
              className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="flex gap-2 my-2 w-full">
            <div className="flex flex-col mb-2 w-1/2">
              <label className="mb-2 text-sm font-medium" htmlFor="start">
                Start date
              </label>
              <input
                type="date"
                name="start"
                id="start"
                required
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="flex flex-col mb-2 w-1/2">
              <label className="mb-2 text-sm font-medium" htmlFor="end">
                End date
              </label>
              <input
                type="date"
                name="end"
                id="end"
                required
                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-3"
              />
            </div>
          </div>
          <div className="flex flex-col my-4">
            <label className="mb-2 text-sm font-medium" htmlFor="description">
              Trip Image
            </label>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="trip preview"
                width={400}
                height={300}
                className="w-full mb-4 rounded-md max-h-48 object-cover"
              />
            )}
            <UploadButton
              endpoint={"imageUploader"}
              onClientUploadComplete={(res) => {
                if (res && res[0].ufsUrl) {
                  setImageUrl(res[0].ufsUrl);
                }
              }}
              onUploadError={(error: Error) =>
                console.log("uUpload Error:", error)
              }
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="bg-slate-900 text-white text-sm font-semibold py-2 px-4 rounded-2xl hover:bg-slate-800 hover:scale-105 transition duration-300"
          >
            {isPending ? "Creating..." : "Create Trip"}
          </button>
        </form>
      </div>
    </div>
  );
}
