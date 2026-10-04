import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Menu from "./dashboard_components/menu";
import Link from "next/link";
import Image from "next/image";
import DashNavbar from "./dashboard_components/dashNavbar";
import Announcements from "./dashboard_components/announcements"; // New Import

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // getting authenticated user
  const user = await currentUser();
  const { userId } = await auth();
  await auth.protect();

  if (!userId) {
    redirect("/sign-in");
  }

  // fallback user role staff
  const role = (user?.publicMetadata?.role as string) || "staff";

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* SIDEBAR (L) */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] border-r border-slate-100 flex flex-col">
        <Link
          href="/myAMSU"
          className="flex items-center justify-center lg:justify-start gap-2 px-6 py-8"
        >
          <Image
            src="/assets/logo/logo.png"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="hidden lg:inline text-xl font-bold tracking-tighter text-brand_1-900">
            AMSU
          </span>
        </Link>
        <div className="flex-1 overflow-y-auto px-2">
          <Menu role={role} />
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col bg-[#F7F8FA] overflow-hidden">
        <DashNavbar />

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* MAIN CONTENT */}
            <div className="w-full lg:w-[70%] xl:w-[75%]">{children}</div>

            {/* ANNOUNCEMENTS COMPONENT (R) */}
            <div className="w-full lg:w-[30%] xl:w-[25%]">
              <Announcements />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
