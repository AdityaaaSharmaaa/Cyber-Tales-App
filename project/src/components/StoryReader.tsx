import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { Story, StoryPage } from '../types/story';
import { doc, updateDoc, increment, arrayUnion, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface StoryReaderProps {
  story: Story;
  onClose: () => void;
}

export const StoryReader = ({ story, onClose }: StoryReaderProps) => {
  const [currentPageId, setCurrentPageId] = useState(story.startingPageId);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentPage = story.pages[currentPageId];

  const handleChoice = (nextPageId: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPageId(nextPageId);
      setIsAnimating(false);
    }, 500);
  };

  const handleNarration = () => {
    // Placeholder for voice narration
    const utterance = new SpeechSynthesisUtterance(currentPage.content);
    window.speechSynthesis.speak(utterance);
  };

  const handleStoryComplete = async () => {
    if (!auth.currentUser) return;
    
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const storyRef = doc(db, `users/${auth.currentUser.uid}/completedStories`, story.id);
    
    try {
      await updateDoc(userRef, {
        storiesRead: increment(1),
        totalPoints: increment(50), // Points for completing story
        recentActivities: arrayUnion({
          id: Date.now().toString(),
          type: 'story',
          title: story.title,
          completedAt: new Date().toISOString()
        })
      });

      // Mark story as completed
      await setDoc(storyRef, {
        completedAt: new Date().toISOString(),
        title: story.title
      });
    } catch (error) {
      console.error('Error updating completion:', error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div 
        className="relative h-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentPage.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center">
          <button 
            onClick={onClose}
            className="text-white hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={handleNarration}
            className="ml-auto text-white hover:text-purple-300 transition-colors"
          >
            <Volume2 className="w-8 h-8" />
          </button>
        </div>

        <div className={`h-full flex flex-col justify-between p-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mt-16">
            <p className="text-white text-2xl leading-relaxed font-medium max-w-2xl mx-auto">
              {currentPage.content}
            </p>
          </div>

          {!currentPage.isEnding && currentPage.choices && (
            <div className="space-y-4 max-w-md mx-auto w-full mb-8">
              {currentPage.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.nextPageId)}
                  className="w-full p-4 bg-white bg-opacity-90 rounded-xl text-purple-800 font-bold hover:bg-opacity-100 transition-all transform hover:scale-105"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {currentPage.isEnding && (
            <button
              onClick={handleStoryComplete}
              className="mx-auto mb-8 px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
            >
              Finish Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 