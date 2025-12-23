import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NavbarClient } from "./NavbarClient";

// Server component wrapper
export default async function Navbar() {
    const session = await getServerSession(authOptions);
    return <NavbarClient session={session} />;
  }
  