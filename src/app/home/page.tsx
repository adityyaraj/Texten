import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CreditCard, Send, Plus, TrendingUp, Wallet, History, Settings, Bell } from 'lucide-react'

const HomePage = async () => {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/')
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your transactions and account
          </p>
        </header>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Available Balance</p>
              <p className="text-3xl font-bold">₹12,345.67</p>
            </div>
            <Wallet size={40} className="text-blue-200" />
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-colors">
              Add Money
            </button>
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition-colors">
              Send Money
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Send size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold">Send Money</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Transfer funds to friends & family
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Plus size={20} className="text-green-500" />
              </div>
              <h3 className="font-semibold">Add Money</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Add funds to your wallet
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <CreditCard size={20} className="text-orange-500" />
              </div>
              <h3 className="font-semibold">Pay Bills</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Pay utility bills & recharge
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp size={20} className="text-purple-500" />
              </div>
              <h3 className="font-semibold">Invest</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Start your investment journey
            </p>
          </div>
        </div>

        {/* Recent Activity & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button className="text-primary hover:underline text-sm">
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-full">
                    <Send size={16} className="text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium">Sent to John Doe</p>
                    <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                  </div>
                </div>
                <span className="text-red-500 font-medium">-₹500.00</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Plus size={16} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Money Added</p>
                    <p className="text-sm text-muted-foreground">Yesterday, 4:15 PM</p>
                  </div>
                </div>
                <span className="text-green-500 font-medium">+₹1,000.00</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <CreditCard size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Electricity Bill</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <span className="text-red-500 font-medium">-₹245.50</span>
              </div>
            </div>
          </div>

          {/* Account Overview */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Wallet size={16} className="text-blue-500" />
                  </div>
                  <span>Total Balance</span>
                </div>
                <span className="font-semibold">₹12,345.67</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <TrendingUp size={16} className="text-green-500" />
                  </div>
                  <span>This Month</span>
                </div>
                <span className="font-semibold text-green-500">+₹2,150.00</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-full">
                    <History size={16} className="text-purple-500" />
                  </div>
                  <span>Total Transactions</span>
                </div>
                <span className="font-semibold">47</span>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors">
                    View Statement
                  </button>
                  <button className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded hover:bg-secondary/90 transition-colors">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
