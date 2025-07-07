import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db';
import React from 'react'
import { Button } from '@/components/ui/button'


async function page() {
    const session = await auth();


    // Check if session exists and user is authenticated
    if (!session || !session.user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Not authenticated</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Please log in to view your profile</p>
                    <a href="/web/front" className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Go to Login
                    </a>
                </div>
            </div>
        )
    }

    const userId = session.user.id;
    
    // Check if userId exists
    if (!userId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">User ID not found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Session does not contain user ID</p>
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-md mx-auto">
                        <p className="text-sm font-medium mb-2">Session data:</p>
                        <pre className="text-xs overflow-auto">{JSON.stringify(session, null, 2)}</pre>
                    </div>
                </div>
            </div>
        )
    }

    const data = await prisma.user.findUnique({where:{id:userId}})

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">User not found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Please log in to view your profile</p>
                </div>
            </div>
        )
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">My Profile</h1>

                    <p className="text-gray-600 dark:text-gray-300">Manage your account information</p>
                </div>

                {/* Main Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 px-8 py-12">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={data.image || '/placeholder-avatar.png'}
                                    alt={data.name || 'User Avatar'}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-white">
                                <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
                                <p className="text-blue-100 text-lg">{data.email}</p>
                                <div className="flex items-center mt-3 space-x-2">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <span className="text-sm font-medium">ID: {data.id.slice(0, 8)}...</span>
                                    </div>
                                    {data.emailVerified && (
                                        <div className="bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-medium">Verified</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Account Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                    Account Information
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Full Name
                                        </label>
                                        <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                            {data.name || 'Not provided'}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                            {data.email}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            {data.emailVerified ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    Not Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            User ID
                                        </label>
                                        <p className="mt-1 text-sm font-mono text-gray-900 dark:text-white break-all">
                                            {data.id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Activity */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                                    Account Activity
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Account Created
                                        </label>
                                      
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {Math.floor((Date.now() - new Date(data.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Last Updated
                                        </label>
                                        
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {Math.floor((Date.now() - new Date(data.updatedAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Email Verification
                                        </label>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-wrap gap-4">
                                <Button variant="default" className="flex-1 sm:flex-none">
                                    Edit Profile
                                </Button>
                                <Button variant="outline" className="flex-1 sm:flex-none">
                                    Change Password
                                </Button>
                                <Button variant="outline" className="flex-1 sm:flex-none">
                                    Download Data
                                </Button>
                                {!data.emailVerified && (
                                    <Button variant="secondary" className="flex-1 sm:flex-none">
                                        Verify Email
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Security</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account security settings</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Verified Account</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your account is verified and secure</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Preferences</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Customize your experience</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page