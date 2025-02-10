import { useState } from 'react';

interface StoryChoice {
  text: string;
  nextScene: string;
  outcome?: string;
}

interface StoryScene {
  text: string;
  choices: StoryChoice[];
}

interface Story {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  scenes: Record<string, StoryScene>;
}

const SENTINEL_STORIES: Story[] = [
  {
    id: 'password-protector',
    title: 'The Password Protector',
    thumbnail: '🔒',
    description: 'Help Alex protect their accounts from hackers',
    scenes: {
      start: {
        text: "Alex receives a strange email claiming their account has been compromised. The email asks them to click a link to reset their password. What should Alex do?",
        choices: [
          { text: "Click the link - better safe than sorry!", nextScene: "phishing-fail" },
          { text: "Check the sender's email address carefully", nextScene: "investigate" },
          { text: "Ignore the email completely", nextScene: "verify" }
        ]
      },
      "phishing-fail": {
        text: "Oh no! The link was a phishing scam. Alex's account has been compromised.",
        choices: [
          { text: "Start Over", nextScene: "start" }
        ]
      },
      "investigate": {
        text: "Good thinking! The email address looks suspicious - it's not from the official company domain.",
        choices: [
          { text: "Report the phishing attempt", nextScene: "success" },
          { text: "Delete the email", nextScene: "partial-success" }
        ]
      },
      // Add more scenes...
    }
  },
  {
    id: 'social-savvy',
    title: 'Social Media Savvy',
    thumbnail: '📱',
    description: 'Guide Sam through social media safety challenges',
    scenes: {
      start: {
        text: "Sam receives a friend request from someone claiming to be a friend of a friend. The profile looks new and has few posts. What should Sam do?",
        choices: [
          { text: "Accept the request - they know my friend!", nextScene: "accept-fail" },
          { text: "Message their mutual friend first", nextScene: "verify-friend" },
          { text: "Ignore the request", nextScene: "safe-choice" }
        ]
      },
      "accept-fail": {
        text: "Oh no! The account was fake and now they're spreading scam links using Sam's friend list.",
        choices: [
          { text: "Start Over", nextScene: "start" }
        ]
      },
      "verify-friend": {
        text: "Smart move! The mutual friend says they don't know this person.",
        choices: [
          { text: "Report the fake account", nextScene: "success" },
          { text: "Block the account", nextScene: "partial-success" }
        ]
      },
      "safe-choice": {
        text: "Good decision! Better safe than sorry when it comes to unknown friend requests.",
        choices: [
          { text: "Continue being cautious", nextScene: "success" }
        ]
      }
    }
  },
  {
    id: 'data-defender',
    title: 'The Data Defender',
    thumbnail: '🛡️',
    description: 'Help Jordan protect sensitive information',
    scenes: {
      start: {
        text: "Jordan needs to send important personal documents to their teacher. What's the safest way to do this?",
        choices: [
          { text: "Send via regular email", nextScene: "email-risk" },
          { text: "Use encrypted file sharing", nextScene: "secure-choice" },
          { text: "Share through social media DM", nextScene: "dm-fail" }
        ]
      },
      "email-risk": {
        text: "Regular email isn't very secure for sensitive documents. Try another method!",
        choices: [
          { text: "Try a different approach", nextScene: "start" }
        ]
      },
      "secure-choice": {
        text: "Excellent! Encrypted file sharing is the safest way to send sensitive information.",
        choices: [
          { text: "Add password protection", nextScene: "extra-secure" },
          { text: "Send access link", nextScene: "success" }
        ]
      },
      "extra-secure": {
        text: "Perfect! Using both encryption and password protection is super secure!",
        choices: [
          { text: "Complete the transfer", nextScene: "success" }
        ]
      }
    }
  },
  {
    id: 'cyber-detective',
    title: 'The Cyber Detective',
    thumbnail: '🔍',
    description: 'Join Maya in investigating suspicious online activity',
    scenes: {
      start: {
        text: "Maya notices her friend's gaming account is behaving strangely, posting spam links. What should she do?",
        choices: [
          { text: "Click the links to investigate", nextScene: "click-fail" },
          { text: "Contact friend through different means", nextScene: "investigate" },
          { text: "Report the account immediately", nextScene: "quick-action" }
        ]
      },
      "click-fail": {
        text: "Never click suspicious links, even to investigate! The links contained malware.",
        choices: [
          { text: "Start Over", nextScene: "start" }
        ]
      },
      "investigate": {
        text: "Good thinking! Maya's friend confirms their account was hacked.",
        choices: [
          { text: "Help them recover the account", nextScene: "help-friend" },
          { text: "Warn other friends", nextScene: "spread-awareness" }
        ]
      },
      "help-friend": {
        text: "You helped your friend secure their account and warned others about the hack!",
        choices: [
          { text: "Share security tips", nextScene: "success" }
        ]
      },
      "quick-action": {
        text: "Fast response! Reporting suspicious activity quickly helps protect everyone.",
        choices: [
          { text: "Notify friend", nextScene: "investigate" }
        ]
      }
    }
  },
  {
    id: 'digital-footprint-detective',
    title: 'Digital Footprint Detective',
    thumbnail: '👣',
    description: 'Help Emma understand digital footprints and online privacy',
    scenes: {
      start: {
        text: "Emma wants to share photos from her birthday party online. What's the first thing she should consider?",
        choices: [
          { text: "Share everything - it's just a party!", nextScene: "overshare-fail" },
          { text: "Check privacy settings first", nextScene: "privacy-check" },
          { text: "Ask friends' permission", nextScene: "permission-path" }
        ]
      },
      "privacy-check": {
        text: "Good! Emma checks her privacy settings. She notices they're set to 'Public'. What should she do?",
        choices: [
          { text: "Keep them public - more likes!", nextScene: "public-fail" },
          { text: "Set to 'Friends Only'", nextScene: "friends-setting" },
          { text: "Review each setting carefully", nextScene: "careful-review" }
        ]
      },
      "careful-review": {
        text: "Emma discovers location tracking is enabled on her photos. What's the best action?",
        choices: [
          { text: "Disable location tracking", nextScene: "location-safe" },
          { text: "Leave it on - it's cool!", nextScene: "location-risk" }
        ]
      },
      "location-safe": {
        text: "Great choice! Now Emma's friends want to tag her in their photos. What should she do?",
        choices: [
          { text: "Enable tag review", nextScene: "tag-control" },
          { text: "Allow all tags", nextScene: "tag-risk" }
        ]
      },
      "tag-control": {
        text: "Perfect! Emma has control over her digital footprint. One final choice: should she save these settings for future posts?",
        choices: [
          { text: "Yes, make it default", nextScene: "success" },
          { text: "No, decide each time", nextScene: "partial-success" }
        ]
      },
      "success": {
        text: "Congratulations! Emma has learned to manage her digital footprint safely!",
        choices: [
          { text: "Complete Story", nextScene: "END" }
        ]
      }
    }
  },
  {
    id: 'online-gaming-guardian',
    title: 'The Online Gaming Guardian',
    thumbnail: '��',
    description: 'Help Alex navigate the challenges of online gaming safely',
    scenes: {
      start: {
        text: "Alex is excited to play a new online game. While creating an account, another player named 'ProGamer123' messages: 'Hey! I can give you rare items if you share your account details!' What should Alex do?",
        choices: [
          { text: "Share account details to get the items", nextScene: "account-compromised" },
          { text: "Ignore and report the suspicious message", nextScene: "safe-choice" },
          { text: "Ask for more information first", nextScene: "scammer-persistence" }
        ]
      },
      "account-compromised": {
        text: "Oh no! 'ProGamer123' was a scammer. They've taken control of Alex's account and stolen all the in-game items. Other players are now getting similar messages from Alex's account!",
        choices: [
          { text: "Create a new account and forget about it", nextScene: "partial-recovery" },
          { text: "Contact game support immediately", nextScene: "support-contact" },
          { text: "Tell parents about the situation", nextScene: "parent-help" }
        ]
      },
      "safe-choice": {
        text: "Good thinking! Alex reports the suspicious message. The game moderators investigate and find that 'ProGamer123' has been trying to scam many players. They want Alex's help to warn others.",
        choices: [
          { text: "Create a warning post on the game forum", nextScene: "community-helper" },
          { text: "Share the experience with friends", nextScene: "friend-awareness" },
          { text: "Learn more about gaming security", nextScene: "security-learning" }
        ]
      },
      "scammer-persistence": {
        text: "'ProGamer123' becomes more insistent, now offering even more valuable items and claiming to be a game moderator. They send a link to a 'special game website' to prove it.",
        choices: [
          { text: "Click the link to check", nextScene: "malware-threat" },
          { text: "Block and report the user", nextScene: "safe-choice" },
          { text: "Ask a parent for advice", nextScene: "parent-guidance" }
        ]
      },
      "support-contact": {
        text: "Game support responds quickly! They help recover Alex's account and add extra security features. They also share important safety tips for the future.",
        choices: [
          { text: "Enable two-factor authentication", nextScene: "security-enhanced" },
          { text: "Keep using the same settings", nextScene: "risk-remains" }
        ]
      },
      "parent-help": {
        text: "Alex's parents help contact support and learn about gaming safety together. They discover many useful tools and settings to prevent future problems.",
        choices: [
          { text: "Set up family safety features", nextScene: "family-protection" },
          { text: "Create safety guidelines together", nextScene: "safety-planning" }
        ]
      },
      "security-enhanced": {
        text: "With new security measures in place, Alex feels much safer. The game moderators even give Alex a special 'Security Champion' badge for handling the situation well!",
        choices: [
          { text: "Share security tips with friends", nextScene: "community-helper" },
          { text: "Continue playing safely", nextScene: "success" }
        ]
      },
      "community-helper": {
        text: "Alex's warning helps many other players avoid similar scams. The game community recognizes Alex as a helpful member who makes gaming safer for everyone!",
        choices: [
          { text: "Complete the adventure", nextScene: "END" }
        ]
      },
      "malware-threat": {
        text: "The link was dangerous! Alex's computer now has malware. Quick action is needed to protect personal information and the computer.",
        choices: [
          { text: "Run antivirus software", nextScene: "virus-cleanup" },
          { text: "Ignore the warning signs", nextScene: "bigger-problems" }
        ]
      },
      "virus-cleanup": {
        text: "The antivirus removes the malware, but it's a good reminder about link safety. Alex learns to never click suspicious links, even if they seem interesting.",
        choices: [
          { text: "Learn more about online safety", nextScene: "security-learning" },
          { text: "Share the experience", nextScene: "community-helper" }
        ]
      },
      "security-learning": {
        text: "Alex becomes knowledgeable about online gaming safety, learning about secure passwords, two-factor authentication, and how to spot scammers.",
        choices: [
          { text: "Become a safety advocate", nextScene: "success" }
        ]
      },
      "success": {
        text: "Congratulations! Alex has become a true Online Gaming Guardian, helping make the gaming community safer for everyone while having fun!",
        choices: [
          { text: "Complete Story", nextScene: "END" }
        ]
      }
    }
  }
];

interface SentinelStoriesProps {
  onComplete?: () => void;
}

export const SentinelStories: React.FC<SentinelStoriesProps> = ({ onComplete }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentScene, setCurrentScene] = useState('start');

  const handleChoice = (nextStep: string) => {
    if (nextStep === 'END' || !selectedStory?.scenes[nextStep]) {
      // Story is complete, redirect to stories section
      onComplete?.();
      return;
    }
    setCurrentScene(nextStep);
  };

  if (selectedStory) {
    const scene = selectedStory.scenes[currentScene];
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <button 
          onClick={() => {
            setSelectedStory(null);
            setCurrentScene('start');
          }}
          className="mb-4 text-purple-600 hover:text-purple-700"
        >
          ← Back to Stories
        </button>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-lg mb-6">{scene.text}</p>
          
          <div className="space-y-3">
            {scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full p-4 text-left rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-4">
      {SENTINEL_STORIES.map((story) => (
        <div
          key={story.id}
          onClick={() => setSelectedStory(story)}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{story.thumbnail}</span>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{story.title}</h3>
              <p className="text-gray-600">{story.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};