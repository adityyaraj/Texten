import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Dp from "@/components/dp";
import Uploadertbn from "../web/uploader/page";

const Settings = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/");
  }
  return (
    <div>
      <div className="flex h-screen flex-col">
        <div className="bg-primary w-full">
          <div className="flex items-center justify-center border-b border-gray-500 relative p-2">
            <div className="absolute left-4 block md:hidden text-g1 font-bold text-3xl">
              Texten
            </div>
            <div className="text-primary-foreground font-semibold text-3xl">
              Settings
            </div>
          </div>
        </div>
        {/* User Profile Settings Section */}
        <div className="flex-1 p-6 bg-primary">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Profile Picture Section */}
            <div className="bg-primary-foreground/5 border border-primary-foreground rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary-foreground">Profile Picture</h2>
              <div className="flex items-center gap-6">
                <div className="rounded-full w-24 h-24 overflow-hidden border-2 border-border">
                  <Dp imageUrl={user.profileImage || user.image} name={user.name} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload a new profile picture. Recommended size: 400x400px
                  </p>
                  <div className="w-fit p-3 rounded-md">
                    <Uploadertbn />
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-primary border border-primary-foreground rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary-foreground">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name || ''}
                    className="w-full px-3 py-2 border border-primary-foreground rounded-md bg-primary text-primary-foreground"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-foreground mb-1">Username</label>
                  <input
                    type="text"
                    defaultValue={user.username || ''}
                    className="w-full px-3 py-2 border border-primary-foreground rounded-md bg-primary text-primary-foreground"
                    placeholder="@username"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-foreground mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-primary-foreground rounded-md bg-primary text-primary-foreground"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="bg-primary border border-primary-foreground rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary-foreground">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-primary-foreground">Account Type</h3>
                    <p className="text-sm text-primary-foreground/50">
                      {user.password ? 'Email & Password' : 'Google OAuth'}
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs bg-primary-foreground/10 text-primary-foreground rounded-full">
                    {user.password ? 'Standard' : 'OAuth'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium text-primary-foreground">Member Since</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Settings Section */}
            <div className="bg-primary border border-primary-foreground rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary-foreground">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-primary-foreground">Profile Visibility</h3>
                    <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                  </div>
                  <select className="px-3 py-2 border border-primary-foreground rounded-md bg-primary text-primary-foreground">
                    <option>Public</option>
                    <option>Friends Only</option>
                    <option>Private</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-primary-foreground">Show Online Status</h3>
                    <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 border border-border rounded-md text-primary-foreground hover:bg-muted">
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
