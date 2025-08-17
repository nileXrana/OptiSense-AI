"use client"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useRouter } from 'next/navigation'
import { BlurFade } from '@/src/components/magicui/blur-fade'
import { RainbowButton } from '@/src/components/magicui/rainbow-button'
import { SparklesText } from '@/src/components/magicui/sparkles-text'
import Image from 'next/image'
import { Bot, MessageSquare, Users, Zap, CheckCircle, Star } from 'lucide-react'

// Add custom CSS for animations
const customStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
`

export default function Home() {
  const router = useRouter();
  const signInPage = () => {
    router.push('/signin')
  }

  const learnMore = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  const assistants = [
    { name: 'Jack', title: 'Fitness Coach', icon: '💪', image: '/fitness-coach.png' },
    { name: 'Emma', title: 'Grammar Fixer', icon: '✍️', image: '/grammer-fixer.jpg' },
    { name: 'Olivia', title: 'Email Writer', icon: '📩', image: '/email-writer.avif' },
    { name: 'Liam', title: 'YouTube Script Writer', icon: '🎬', image: '/youtube-script-writer.jpg' },
    { name: 'Harry', title: 'Code Writer', icon: '💻', image: '/code-writer.jpg' },
    { name: 'James', title: 'Bug Finder', icon: '🐛', image: '/bug-fixer.avif' },
    { name: 'William', title: 'Finance Assistant', icon: '💰', image: '/finanace.avif' },
    { name: 'Ethan', title: 'Personal Tutor', icon: '📚', image: '/personal-tutor.jpg' },
  ]

  const features = [
    { icon: <Bot className="h-8 w-8" />, title: "10+ AI Assistants", description: "Specialized AI companions for every task" },
    { icon: <MessageSquare className="h-8 w-8" />, title: "Smart Conversations", description: "Natural, context-aware interactions" },
    { icon: <Zap className="h-8 w-8" />, title: "Instant Responses", description: "Get answers and solutions in real-time" },
    { icon: <Users className="h-8 w-8" />, title: "Create Custom AI", description: "Build your own personalized assistant" },
  ]

  const benefits = [
    "✨ Boost productivity with AI-powered assistance",
    "🎯 Get expert help for specific tasks and domains",
    "🎨 Create custom AI assistants tailored to your needs",
    "💬 Enjoy natural, human-like conversations",
    "🚀 Access cutting-edge AI technology instantly",
    "📱 Works seamlessly across all devices",
    "🔒 Secure and private interactions"
  ]

  return (
    <>
      <style jsx global>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <BlurFade delay={0.1}>
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* AI Assistant Robot Head */}
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                  {/* Robot eyes - more expressive */}
                  <div className="flex gap-1.5 mb-1">
                    <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                    </div>
                    <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                    </div>
                  </div>
                  {/* Robot mouth - friendly smile */}
                  <div className="w-4 h-1 bg-white rounded-full relative">
                    <div className="absolute inset-0 bg-white rounded-full transform scale-y-50"></div>
                  </div>
                </div>
              </div>
              {/* Assistant indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              OptiSense AI
            </span>
          </div>
        </BlurFade>
        
        <BlurFade delay={0.2}>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button onClick={signInPage} className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Sign In
            </Button>
          </div>
        </BlurFade>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-6xl mx-auto">
        <BlurFade delay={0.3}>
          <SparklesText className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Personal AI Assistant
            </span>
          </SparklesText>
        </BlurFade>
        
        <BlurFade delay={0.5}>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Meet your team of specialized AI assistants ready to help with coding, writing, fitness, finance, and more.
            Can't find what you need? <br />Create your own custom AI assistant with unique personality and expertise.
          </p>
        </BlurFade>

        <BlurFade delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <RainbowButton onClick={signInPage} className="px-8 py-4 text-lg">
              🚀 Get Started Free
            </RainbowButton>
            <Button onClick={learnMore} variant="outline" className="cursor-pointer px-8 py-4 text-lg border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
              📖 Learn More
            </Button>
          </div>
        </BlurFade>

        {/* Stats */}
        <BlurFade delay={0.9}>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Assistants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100K</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Always Available</div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Features Section */}
      <section id="features-section" className="px-6 py-16 max-w-6xl mx-auto">
        <BlurFade delay={0.2}>
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Our AI Assistants?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg">
            Powerful features designed to supercharge your productivity
          </p>
        </BlurFade>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.1}>
              <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-purple-100 dark:border-purple-800">
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* AI Assistants Showcase */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <BlurFade delay={0.2}>
          <h2 className="text-4xl font-bold text-center mb-4">Meet Your AI Team</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 text-lg">
            Specialized assistants for every aspect of your life and work
          </p>
        </BlurFade>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {assistants.map((assistant, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-200 to-purple-100 dark:from-gray-800 dark:to-gray-700 shadow-lg shadow-indigo-400 dark:shadow-gray-600 backdrop-blur-sm p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 dark:border-purple-800">
                  <div className="aspect-square relative mb-3 overflow-hidden rounded-xl">
                    <Image 
                      src={assistant.image} 
                      alt={assistant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg">{assistant.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{assistant.title}</p>
                    <div className="text-2xl mt-2">{assistant.icon}</div>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Custom AI Assistant Creation Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 md:p-12">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-white text-center">
            <BlurFade delay={0.2}>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                  <Bot className="h-12 w-12" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">Create Your Own AI Assistant</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Not finding exactly what you need? Design and customize your own AI assistant with unique personality, 
                expertise, and conversation style tailored to your specific requirements.
              </p>
            </BlurFade>

            <BlurFade delay={0.4}>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl mb-2">🎨</div>
                  <h3 className="font-bold mb-2">Custom Personality</h3>
                  <p className="text-sm opacity-90">Define unique traits, tone, and communication style</p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl mb-2">🧠</div>
                  <h3 className="font-bold mb-2">Specialized Knowledge</h3>
                  <p className="text-sm opacity-90">Train with specific expertise and domain knowledge</p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold mb-2">Instant Deployment</h3>
                  <p className="text-sm opacity-90">Your custom assistant is ready to use immediately</p>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.6}>
              <Button 
                onClick={signInPage}
                className="bg-white text-purple-600 hover:bg-gray-100 cursor-pointer px-8 py-4 text-lg font-semibold rounded-xl"
              >
                 Start Building Your AI Assistant
              </Button>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <BlurFade delay={0.2}>
            <div>
              <h2 className="text-4xl font-bold mb-6">Transform Your Workflow</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Experience the power of AI-driven assistance that adapts to your needs and helps you achieve more.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <BlurFade key={index} delay={0.3 + index * 0.1}>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-400 to-blue-600 p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col justify-center items-center text-white text-center">
                  <Bot className="h-16 w-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
                  <p className="mb-6">Join thousands who are already boosting their productivity</p>
                  <Button 
                    onClick={signInPage}
                    className="bg-white/20 cursor-pointer hover:bg-white/30 backdrop-blur-sm border border-white/30"
                  >
                    Start Your Journey
                  </Button>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <BlurFade delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Meet Your AI Assistants?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Start your journey with personalized AI assistance today. No credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RainbowButton onClick={signInPage} className="px-12 py-4 text-xl">
                🎯 Start Free Now
              </RainbowButton>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>100+ satisfied users</span>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-purple-100 dark:border-purple-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <BlurFade delay={0.2}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                {/* AI Assistant Robot Head */}
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md">
                  <div className="flex flex-col items-center">
                    {/* Robot eyes - more expressive */}
                    <div className="flex gap-1 mb-0.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full"></div>
                      </div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-0.5 h-0.5 bg-indigo-600 rounded-full"></div>
                      </div>
                    </div>
                    {/* Robot mouth - friendly smile */}
                    <div className="w-3 h-0.5 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* Assistant indicator */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse"></div>
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                OptiSense AI
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 OptiSense AI. Your personal AI Assistant companion.
            </p>
          </div>
        </BlurFade>
      </footer>
      </div>
    </>
  );
}
