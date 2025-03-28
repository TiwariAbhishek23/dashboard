'use client'
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { SigmaIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@/firebase";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Email is already registered");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters");
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email address");
      } else {
        setError("An error occurred during sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center -mt-16 min-h-screen bg-cover bg-center">
      <div className="relative p-8 shadow-[0px_0px_5px_1px] shadow-gray-600 bg-transparent backdrop-blur-lg rounded-2xl w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Create New Account</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block font-medium mb-1 text-white" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-white" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
              placeholder="Enter your password"
              type="password"
              minLength={6}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-white" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
              placeholder="Confirm your password"
              type="password"
              minLength={6}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            type="submit"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="w-full mt-4">
            <ul className="flex items-center justify-center">
              <li className="text-gray-100"><SigmaIcon/></li>
              <li className="text-gray-100"><SigmaIcon/></li>
              <li className="text-gray-100"><SigmaIcon/></li>
            </ul>
          </div>
        </form>
        <p className="text-sm text-center mt-3 text-gray-300">
          Already have an account? <Link className="text-blue-300 hover:underline" href="/signin">Sign In</Link>
        </p>
      </div>
    </div>
    </>
  );
}
