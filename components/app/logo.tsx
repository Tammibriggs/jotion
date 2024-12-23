import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        className="dark:hidden"
        height="40"
        width="40"
        alt="Logo"
      />
      <Image
        src="/logo.svg"
        className="hidden dark:block"
        height="40"
        width="40"
        alt="Logo"
      />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
}

export default Logo;
