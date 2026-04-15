import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import TitleBar from "../components/TitleBar";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Failed to log in. Please try again.");
        return;
      }

      setUser({
        id: data.userId,
        fullName: data.fullName,
        isAdmin: data.isAdmin,
      });

      router.push("/dashboard");
    } catch (err) {
      setError("Failed to log in. Please try again.");
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
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full mb-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D21312] outline-none py-2 text-[clamp(16px,2vw,22px)]"
                placeholder="Email"
              />
            </div>

            <div className="w-full mb-14">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-[#D21312] outline-none py-2 text-[clamp(16px,2vw,22px)]"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#cf2f24] text-white font-semibold py-4 text-[clamp(18px,2.5vw,28px)] hover:opacity-90 hover:cursor-pointer"
            >
              Log in
            </button>
          </form>

          <p className="mt-10 text-[#2f2f2f] text-center text-[clamp(14px,2vw,22px)]">
            Don't have an account?{" "}
            <Link href="/create-account" className="font-bold text-black">
              Sign up
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
