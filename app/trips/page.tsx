import { auth } from "@/auth";
import { Button } from "@/ui/Button";
import Link from "next/link";

export default async function Trips() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex justify-center items-center h-screen ">
        <h1 className="text-slate-800 text-2xl">Sign In to see your trips</h1>
      </div>
    );
  return (
    <div className=" space-y-6 conatiner mx-auto px-4 py-8">
      <div>
        <h1>Dashboard</h1>
        <Link href="/trips/new">
          <Button Children={"New Trip"} />
        </Link>
      </div>
    </div>
  );
}
