import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import TitleBar from "@/components/TitleBar";
import Image from "next/image";

export default function CreateAccountPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useUser();

  async function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          admin: isAdmin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Failed to create account.");
        return;
      }

      setUser({
        id: data.userId,
        fullName: data.fullName,
        isAdmin: data.isAdmin,
      });

      router.push("/dashboard");
    } catch (err) {
      setError("Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <TitleBar />
      <section className="flex-1 flex flex-col items-center justify-center relative px-[5%]">
        <div className="w-full max-w-[600px] flex flex-col items-center">
          <h2 className="font-bold text-black mb-12 text-[clamp(36px,6vw,64px)]">
            Create Account
          </h2>

          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleCreateAccount}
          >
            <div className="w-full mb-10">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D21312] outline-none py-2 text-[clamp(16px,2vw,22px)]"
                placeholder="Full Name"
              />
            </div>

            <div className="w-full mb-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D21312] outline-none py-2 text-[clamp(16px,2vw,22px)]"
                placeholder="Email"
              />
            </div>

            <div className="w-full mb-10">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D21312] outline-none py-2 text-[clamp(16px,2vw,22px)]"
                placeholder="Password"
              />
            </div>

            <div className="w-full mb-8">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D21312] outline-none py-2 text-[clamp(16px,2vw,22px)]"
                placeholder="Confirm Password"
              />
            </div>

            <div className="w-full mb-10 flex items-center gap-3">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-6 w-6 accent-[#D21312]"
              />
              <label className="text-[clamp(16px,2vw,22px)] text-[#2f2f2f]">
                Admin access
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#cf2f24] text-white font-semibold py-4 text-[clamp(18px,2.5vw,28px)] hover:opacity-90 hover:cursor-pointer"
            >
              Sign up
            </button>
          </form>

          <p className="mt-5 text-[#2f2f2f] text-center text-[clamp(14px,2vw,22px)]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-black">
              Sign in
            </Link>
          </p>
        </div>

        <Image
          src="/images/quarterCircle.png"
          alt="decorative shape"
          width={200}
          height={200}
          className="absolute bottom-0 left-0 w-[clamp(120px,20vw,260px)] h-auto"
        />
      </section>
    </main>
  );
}
