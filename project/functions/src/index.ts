import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import { generateStory } from '../../src/services/storyGenerator';

// Initialize Firebase Admin
admin.initializeApp();

const topics = [
  'Password Safety',
  'Phishing Attacks',
  'Social Media Privacy',
  'Online Bullying',
  'Safe Web Browsing',
  'Data Privacy',
  'Digital Footprint',
  'Email Security',
  'Mobile Device Safety',
  'Internet Scams'
];

export const generateNewStories = functions.pubsub
  .schedule('every 15 minutes')
  .onRun(async (context) => {
    try {
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const db = admin.firestore();
      
      // Generate story content
      const storyData = {
        title: `Cyber Safety: ${randomTopic}`,
        content: `Story about ${randomTopic}...`, // Replace with actual AI generation
        type: Math.random() > 0.5 ? 'ai-generated' : 'real-incident',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        tags: ['cybersecurity', randomTopic.toLowerCase()]
      };

      // Save to Firestore
      await db.collection('ai-stories').add(storyData);
      console.log('New story generated successfully');
      
      return null;
    } catch (error) {
      console.error('Error in story generation:', error);
      return null;
    }
  });