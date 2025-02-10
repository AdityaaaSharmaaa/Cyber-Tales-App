import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface StoryPrompt {
  topic: string;
  type: 'ai-generated' | 'real-incident';
}

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

export const generateStory = async (prompt: StoryPrompt) => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{
          role: "system",
          content: "You are a cybersecurity expert who writes engaging stories for children about cyber safety."
        }, {
          role: "user",
          content: `Create a story about ${prompt.topic} that teaches children about cybersecurity. Make it engaging and educational.`
        }]
      })
    });

    const data = await response.json();
    const story = data.choices[0].message.content;

    // Save to Firestore
    await addDoc(collection(db, 'ai-stories'), {
      title: `Cyber Safety: ${prompt.topic}`,
      content: story,
      type: prompt.type,
      timestamp: new Date().toISOString(),
      tags: ['cybersecurity', prompt.topic.toLowerCase()],
    });

    return story;
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};