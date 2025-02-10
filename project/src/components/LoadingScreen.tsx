import { Brain } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated brain icon */}
        <div className="animate-bounce">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <Brain className="w-12 h-12 text-purple-600" />
          </div>
        </div>
        
        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-24 h-24 border-4 border-white rounded-full animate-ping opacity-75" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20">
          <div className="w-32 h-32 border-4 border-white rounded-full animate-ping opacity-50 animation-delay-200" />
        </div>
      </div>

      {/* Loading text */}
      <div className="mt-8 text-white text-xl font-bold">
        <span className="inline-block animate-pulse">Loading CyberTales...</span>
      </div>

      {/* Loading dots */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}; 