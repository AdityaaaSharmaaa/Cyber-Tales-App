import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { stories } from '../data/stories';
import { StoryReader } from './StoryReader';
import { Story } from '../types/story';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const StoryScreen = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [completedStories, setCompletedStories] = useState<string[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const storiesRef = collection(db, `users/${auth.currentUser.uid}/completedStories`);
    const unsubscribe = onSnapshot(storiesRef, (snapshot) => {
      const completed = snapshot.docs.map(doc => doc.id);
      setCompletedStories(completed);
    });

    return () => unsubscribe();
  }, []);

  if (selectedStory) {
    return <StoryReader story={selectedStory} onClose={() => setSelectedStory(null)} />;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">Stories</h2>
      
      <div className="space-y-4">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden flex hover:shadow-lg transition-shadow"
          >
            {completedStories.includes(story.id) && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Completed
              </div>
            )}
            <img
              src={story.thumbnail}
              alt={story.title}
              className="w-24 h-24 object-cover"
            />
            <div className="p-4 flex-1 flex justify-between items-center">
              <div className="text-left">
                <h3 className="font-bold text-gray-800">{story.title}</h3>
                <p className="text-sm text-gray-600">{story.description}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-purple-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};