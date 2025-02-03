"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
export default function Home() {
  const { signIn } = useAuthActions();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to Donut</h1>
        <p className="text-xl mb-8">Your platform for seamless donations and alerts.</p>
        <Button onClick={() => signIn("google")} className="bg-blue-600 hover:bg-blue-700">
          Sign in with Google
        </Button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get instant notifications for donations.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Easy Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Integrate with your streaming platform effortlessly.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customizable Widgets</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Personalize your donation alerts and widgets.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="mb-8">Join Donut today and enhance your streaming experience.</p>
          <Button onClick={() => signIn("google")} className="bg-green-500 hover:bg-green-600">
            Get Started
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Donut. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
