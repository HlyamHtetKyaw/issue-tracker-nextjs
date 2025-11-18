"use client";

import { signIn } from "next-auth/react";
import { Flex, Card, Text, TextField, Button } from "@radix-ui/themes";
import { FaBug } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const router = useRouter();

  // ---------------------------
  // SIGN UP HANDLER
  // ---------------------------
  const handleSignUp = async () => {
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Account created successfully!");
      setIsSignUp(false);
    } else {
      alert("Sign Up failed");
    }
  };

  // ---------------------------
  // SIGN IN HANDLER
  // ---------------------------
  const handleSignIn = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      alert(result.error);
    } else {
      router.push("/dashboard"); // redirect after login
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full">
      <Card className="w-full max-w-sm shadow-2xl">
        <Flex direction="column" gap="4">
          {/* HEADER */}
          <Flex direction="column" align="center" justify="center" p="4">
            <FaBug className="text-4xl text-blue-600 mb-4" />
            <Text size="5" weight="bold">
              Buggy Track
            </Text>
            <Text color="gray" size="2">
              {isSignUp ? "Create a new account" : "Sign in to your account"}
            </Text>
          </Flex>

          {/* FORM INPUTS */}
          <Flex direction="column" gap="3">
            {/* Email */}
            <label>
              <Text size="2" weight="medium" mb="1">
                Email
              </Text>
              <TextField.Root
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            {/* Password */}
            <label>
              <Text size="2" weight="medium" mb="1">
                Password
              </Text>
              <TextField.Root
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            {/* Confirm Password for Sign Up */}
            {isSignUp && (
              <label>
                <Text size="2" weight="medium" mb="1">
                  Confirm Password
                </Text>
                <TextField.Root
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </label>
            )}

            {/* BUTTON */}
            <Button
              mt="2"
              onClick={isSignUp ? handleSignUp : handleSignIn}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </Flex>

          {/* TOGGLE SIGN IN / SIGN UP */}
          <Flex justify="center" align="center" gap="1" mt="2">
            <Text size="2" color="gray">
              {isSignUp ? "Already have an account?" : "Not a member?"}
            </Text>
            <Button
              size="1"
              variant="ghost"
              color="blue"
              onClick={() => setIsSignUp(!isSignUp)}
              className="cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
