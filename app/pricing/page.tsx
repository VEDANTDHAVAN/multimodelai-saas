import { PricingTable } from '@clerk/nextjs'
import { Check } from "lucide-react";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground text-lg">
          Select the perfect plan for your needs. Upgrade anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Basic AI features</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Limited generations</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Standard support</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>All AI features</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Unlimited generations</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Advanced customization</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        <PricingTable />
      </div>
    </div>
  )
}