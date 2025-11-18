"use client";

import { signIn } from "next-auth/react";
import { Flex, Box, Card, Text, TextField, Button } from "@radix-ui/themes";
import { FaBug } from "react-icons/fa";
import { useState } from "react";
export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = () => {
    signIn();
  };
  const handleSignUp = () => {
    // signUp();
    console.log("Sign Up");
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 w-full">
      <Card className="w-full max-w-sm shadow-2xl">
        <Flex direction="column" gap="4">
          <Flex
            direction="column"
            align="center"
            justify="center"
            className="text-center"
            p="4"
          >
            <Text as="div">
              <FaBug className="text-4xl text-blue-600 mb-4" />
            </Text>
            <Text as="div" size="5" weight="bold" mb="2">
              Buggy Track
            </Text>
            <Text color="gray" size="2">
              {isSignUp ? "Sign up to your account" : "Sign in to your account"}
            </Text>
          </Flex>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" weight="medium" mb="1">
                Email
              </Text>
              <TextField.Root
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              <Text as="div" size="2" weight="medium" mb="1">
                Password
              </Text>
              <TextField.Root type="password" placeholder="••••••••" required />
            </label>
            {isSignUp && (
              <label>
                <Text as="div" size="2" weight="medium" mb="1">
                  Confirm Password
                </Text>
                <TextField.Root
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </label>
            )}
            <Button
              mt="2"
              onClick={isSignUp ? handleSignUp : handleSignIn}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </Flex>
          <Flex justify="center" align="center" gap="1" mt="2">
            <Text size="2" color="gray">
              Not a member?
            </Text>
            <Button
              size="1"
              variant="ghost"
              color="blue"
              className="cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}
