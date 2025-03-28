'use client'
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import { SigmaIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/firebase";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError("Failed to sign in with Google. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("An error occurred during sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex items-center justify-center -mt-16 min-h-screen bg-cover bg-center">
      <div className="relative p-8 shadow-[0px_0px_5px_1px] shadow-gray-600 bg-transparent backdrop-blur-lg rounded-2xl w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSignIn}>
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
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-300 bg-transparent">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <button
            onClick={async () => {
              setLoading(true);
              setError("");
              try {
                const result = await signInAnonymously(auth);
                if (result.user) {
                  router.push("/dashboard");
                }
              } catch (err: any) {
                setError("Failed to sign in anonymously. Please try again.");
                console.error(err);
              } finally {
                setLoading(false);
              }
            }}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue as Guest"}
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
          Don't have an account? <Link className="text-blue-300 hover:underline" href="/signup">Go to Sign Up</Link>
        </p>
      </div>
    </div>
    </>
  );
}
