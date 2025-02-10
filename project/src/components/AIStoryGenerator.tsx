import { useState, useEffect } from 'react';
import { Book, RefreshCw, Loader } from 'lucide-react';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot, Timestamp, addDoc } from 'firebase/firestore';
import { SentinelStories } from './SentinelStories';
import { Button, Box, Typography, CircularProgress, Alert } from '@mui/material';

interface AIStory {
  id: string;
  title: string;
  content: string;
  type: 'ai-generated' | 'real-incident';
  timestamp: Timestamp;
  tags: string[];
}

const getRandomTopic = () => {
  const topics = ['password safety', 'online privacy', 'phishing awareness', 'social media safety', 'cyberbullying'];
  return topics[Math.floor(Math.random() * topics.length)];
};

const createStoryPrompt = () => `Output format:
Title: ${getRandomTopic()} Adventure

Story:
[Write exactly 3 paragraphs about a child learning about ${getRandomTopic()}. Include a character name, a problem, and a solution.]

Moral:
[One sentence lesson learned]

Note: Output only the above format with no additional text or AI disclaimers.`;

interface AIStoryGeneratorProps {
  onStoryGenerated?: (story: string) => void;
}

const AIStoryGenerator: React.FC<AIStoryGeneratorProps> = ({ onStoryGenerated }) => {
  const [stories, setStories] = useState<AIStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<AIStory | null>(null);
  const [generating, setGenerating] = useState(false);
  const [view, setView] = useState<'ai' | 'real' | 'sentinel'>('ai');
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<string | null>(null);

  useEffect(() => {
    const storiesRef = collection(db, 'ai-stories');
    const q = query(storiesRef, orderBy('timestamp', 'desc'), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newStories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AIStory));
      setStories(newStories);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching stories:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkOllamaConnection = async () => {
      try {
        const response = await fetch('http://localhost:11434/api/tags');
        if (!response.ok) {
          throw new Error('Ollama service not responding');
        }
      } catch (err) {
        console.error('Ollama connection error:', err);
        setError('Cannot connect to Ollama. Please make sure it\'s running on your system.');
      }
    };

    checkOllamaConnection();
  }, []);

  // Add this test function temporarily
  const testOllama = async () => {
    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-coder",
          prompt: "Write a very short test story.",
          stream: false
        }),
      });
      
      const result = await response.json();
      console.log('Ollama test response:', result);
    } catch (err) {
      console.error('Ollama test error:', err);
    }
  };

  // Call it when component mounts
  useEffect(() => {
    testOllama();
  }, []);

  const filteredStories = stories;

  // Update the story generation function
  const generateStory = async () => {
    setLoading(true);
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-coder",
          prompt: createStoryPrompt(),
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.95,
            top_k: 40,
            num_predict: 500,
            stop: ["Note:", "I'm sorry", "As an AI"]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const generatedText = result.response.trim();

      // Process the generated text
      const lines = generatedText.split('\n').filter((line: string) => line.trim());
      const title = lines[0].replace(/^Title:\s*/i, '').trim() || "Cyber Security Story";
      const content = lines.slice(1).join('\n').trim();

      const newStory: Partial<AIStory> = {
        title,
        content: content || generatedText,
        type: 'ai-generated',
        timestamp: Timestamp.now(),
        tags: ['cybersecurity', 'educational']
      };

      await addDoc(collection(db, 'ai-stories'), newStory);
      setStory(content || generatedText);
      
      if (onStoryGenerated) {
        onStoryGenerated(content || generatedText);
      }
    } catch (err) {
      console.error('Story generation error:', err);
      if (err instanceof Error && err.message.includes('Failed to fetch')) {
        setError('Failed to connect to Ollama. Please make sure Ollama is running.');
      } else {
        setError('Failed to generate story. Please try again.');
      }
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  // Add a loading state component
  const LoadingStoryCard = () => (
    <Box sx={{ mt: 2, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </Box>
  );

  const handleSentinelComplete = () => {
    setView('ai');  // Switch back to AI stories view
  };

  if (loading && !generating) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-600">Cyber Stories</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <RefreshCw className="w-4 h-4" />
          <span>New stories every 15 minutes</span>
        </div>
      </div>

      {/* Story Categories */}
      <div className="flex gap-4">
        <button
          onClick={() => setView('ai')}
          className={`px-4 py-2 rounded-full ${
            view === 'ai' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
          }`}
        >
          AI Generated
        </button>
        <button
          onClick={() => setView('real')}
          className={`px-4 py-2 rounded-full ${
            view === 'real' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'
          }`}
        >
          Real Incidents
        </button>
        <button
          onClick={() => setView('sentinel')}
          className={`px-4 py-2 rounded-full ${
            view === 'sentinel' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
          }`}
        >
          Sentinels
        </button>
      </div>

      {/* Content */}
      {view === 'sentinel' ? (
        <SentinelStories onComplete={handleSentinelComplete} />
      ) : (
        <>
          {/* Generate Story Button */}
          <Box sx={{ my: 3 }}>
            <div className="flex flex-col space-y-4">
              <Button
                variant="contained"
                onClick={generateStory}
                disabled={generating}
                startIcon={generating ? <CircularProgress size={20} /> : <Book className="w-5 h-5" />}
                sx={{
                  bgcolor: 'purple.600',
                  '&:hover': { bgcolor: 'purple.700' },
                  py: 1.5,
                  px: 4,
                  borderRadius: 2
                }}
              >
                {generating ? 'Creating Your Story...' : 'Generate New Story'}
              </Button>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 2,
                    '& .MuiAlert-icon': { color: 'red.500' }
                  }}
                  action={
                    <Button color="inherit" size="small" onClick={() => setError(null)}>
                      Dismiss
                    </Button>
                  }
                >
                  {error}
                </Alert>
              )}

              {generating ? (
                <LoadingStoryCard />
              ) : story ? (
                <Box 
                  sx={{ 
                    mt: 2, 
                    p: 4, 
                    bgcolor: 'background.paper', 
                    borderRadius: 2,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 3,
                      fontWeight: 'bold',
                      color: 'purple.700'
                    }}
                  >
                    {story.split('\n')[0]}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    component="div" 
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8,
                      color: 'gray.700'
                    }}
                  >
                    {story.split('\n').slice(1).join('\n')}
                  </Typography>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                      AI Generated
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      Cybersecurity
                    </span>
                  </div>
                </Box>
              ) : null}
            </div>
          </Box>

          {/* Story List */}
          <div className="grid gap-4">
            {filteredStories.map((story) => (
              <div 
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-purple-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-purple-700 mb-3">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 text-lg">
                      {story.content.split('\n')[0]}...
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-purple-600">
                      <Book className="w-4 h-4" />
                      <span className="text-sm">Click to read full story</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Story Reader Modal */}
          {selectedStory && (
            <div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedStory(null)}
            >
              <div 
                className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="prose prose-lg">
                  <h2 className="text-2xl font-bold text-purple-700 mb-4">
                    {selectedStory.title}
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    {selectedStory.content.split('\n').map((paragraph: string, i: number) => (
                      <p key={i} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                      {selectedStory.type === 'ai-generated' ? 'AI Story' : 'Real Story'}
                    </span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      Cybersecurity
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="mt-6 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Close Story
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AIStoryGenerator;