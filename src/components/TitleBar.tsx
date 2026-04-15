import Link from "next/link";
import Image from "next/image";

export default function TitleBar() {
  return (
    <header className="w-full px-[5%] pt-2 pb-2 bg-white shadow-sm">
      <Link href="/" className="inline-flex items-center gap-4">
        <Image
          src="/images/appLogo.png"
          alt="App Logo"
          width={50}
          height={50}
          className="object-contain"
        />

        <span className="text-[clamp(32px,4vw,48px)] font-bold text-black tracking-tight">
          Progress
        </span>
      </Link>
    </header>
  );
}
