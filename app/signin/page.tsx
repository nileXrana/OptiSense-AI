import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'
import UserLogger from '@/components/userLogger'
import { BlurFade } from '@/src/components/magicui/blur-fade'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const page = () => {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <BlurFade delay={0.1}>
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-5 w-5" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* AI Assistant Robot Head */}
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                      {/* Robot eyes */}
                      <div className="flex gap-1 mb-0.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full flex items-center justify-center">
                          <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full"></div>
                        </div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full flex items-center justify-center">
                          <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full"></div>
                        </div>
                      </div>
                      {/* Robot mouth */}
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* Assistant indicator */}
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Helper
                </span>
              </div>
            </Link>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <ModeToggle />
          </BlurFade>
        </header>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Welcome Content */}
            <BlurFade delay={0.3}>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back to AI Helper
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Sign in to access your personal AI assistants and continue your productivity journey.
                </p>
                
                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Access 10+ specialized AI assistants</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Create custom AI assistants</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Secure and private conversations</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Sign in to get 100K free credits</span>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Right Side - Sign In Card */}
            <BlurFade delay={0.5}>
              <div className="w-full max-w-md mx-auto">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-100 dark:border-purple-800">
                  
                  {/* Logo and Title */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        {/* AI Assistant Robot Head */}
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                          <div className="flex flex-col items-center">
                            {/* Robot eyes */}
                            <div className="flex gap-2 mb-1">
                              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                              </div>
                              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                              </div>
                            </div>
                            {/* Robot mouth */}
                            <div className="w-6 h-1 bg-white rounded-full"></div>
                          </div>
                        </div>
                        {/* Assistant indicator */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Sign In to AI Helper</h2>
                    <p className="text-gray-600 dark:text-gray-400">Choose your preferred sign-in method</p>
                  </div>

                  {/* Sign In Buttons */}
                  <div className="space-y-4">
                    <SignedOut>
                      <div className="space-y-3">
                        <SignInButton mode="modal">
                          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                            Sign In
                          </Button>
                        </SignInButton>
                        
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          <span>Don't have an account?</span>
                        </div>
                        
                        <SignUpButton mode="modal">
                          <Button variant="outline" className="w-full border-2 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 py-3 text-lg font-semibold rounded-xl transition-all duration-300">
                            Create Account
                          </Button>
                        </SignUpButton>
                      </div>
                    </SignedOut>
                    
                    <SignedIn>
                      <div className="text-center">
                        <p className="text-green-600 dark:text-green-400 mb-4 font-medium">✅ You're signed in!</p>
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "w-12 h-12"
                            }
                          }}
                        />
                        <div className="mt-4">
                          <Link href="/dashboard">
                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-xl">
                              Go to Dashboard
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </SignedIn>
                  </div>

                  {/* Security Note */}
                  <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    <p className="text-sm text-indigo-700 dark:text-indigo-300 text-center">
                      🔒 Your data is secure and encrypted. We never store your personal conversations.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>

        <UserLogger/>
      </div>
    </ClerkProvider>
  )
}

export default page
