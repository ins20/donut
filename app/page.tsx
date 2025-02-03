"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const { signIn } = useAuthActions();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-2xl font-bold">Donut</h1>
        <Button 
          onClick={() => signIn("google")}
          className="bg-black text-white hover:bg-gray-800"
        >
          Get Started
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-4">Revolutionize Your Stream Donations</h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl">
          Donut offers the most flexible and creator-friendly donation system with 
          zero platform fees and instant payouts.
        </p>
        <div className="flex gap-4">
          <Button className="bg-black text-white hover:bg-gray-800">Start Free</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Donut?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardTitle className="mb-4">Donut vs Others</CardTitle>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span>Transaction Fees</span>
                  <span>0% vs 5-10%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Payout Speed</span>
                  <span>Instant vs 3-7 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Customization</span>
                  <span>Full vs Limited</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <CardTitle className="mb-4">Key Features</CardTitle>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  Multi-platform Support
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  Advanced Analytics
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  Chargeback Protection
                </li>
              </ul>
            </Card>

        
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Connect your streaming account</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Customize</h3>
              <p className="text-gray-600">Design your donation widgets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Go Live</h3>
              <p className="text-gray-600">Start receiving donations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Withdraw</h3>
              <p className="text-gray-600">Instant payouts to your bank</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6">
              <CardTitle>Is there any fee?</CardTitle>
              <CardDescription className="mt-2">
                Donut charges 0% platform fees. We only deduct standard payment processing fees.
              </CardDescription>
            </Card>
            <Card className="p-6">
              <CardTitle>Can I use custom alerts?</CardTitle>
              <CardDescription className="mt-2">
                Yes, our widget editor allows full customization of alerts, sounds, and visuals.
              </CardDescription>
            </Card>
            <Card className="p-6">
              <CardTitle>How fast are payouts?</CardTitle>
              <CardDescription className="mt-2">
                All withdrawals are processed instantly to your connected payment method.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Donut. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
