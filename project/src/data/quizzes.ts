import { Quiz } from '../types/quiz';

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Internet Safety Basics',
    description: 'Learn about staying safe online',
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        question: 'What should you do if a stranger sends you a message online?',
        options: [
          'Reply immediately',
          'Share personal information',
          'Ignore and tell a trusted adult',
          'Click on any links they send'
        ],
        correctAnswer: 2,
        explanation: 'Always ignore messages from strangers and tell a trusted adult about it.'
      },
      {
        id: 'q2',
        question: 'Which password is the strongest?',
        options: [
          'password123',
          'birthday',
          'P@ssw0rd!2023',
          'qwerty'
        ],
        correctAnswer: 2,
        explanation: 'Strong passwords contain a mix of uppercase, lowercase, numbers, and symbols.'
      },
      // Add more questions...
    ]
  },
  {
    id: '2',
    title: 'Password Security',
    description: 'Learn how to create and manage strong passwords',
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        question: 'Which of these is NOT a good password practice?',
        options: [
          'Using different passwords for each account',
          'Writing passwords on a sticky note',
          'Using a password manager',
          'Including special characters'
        ],
        correctAnswer: 1,
        explanation: 'Writing passwords down where others can see them is unsafe. Use a password manager instead!'
      },
      {
        id: 'q2',
        question: 'How often should you change your important passwords?',
        options: [
          'Never',
          'Every day',
          'Every 3-6 months',
          'Only when compromised'
        ],
        correctAnswer: 2,
        explanation: 'Changing passwords every 3-6 months helps maintain security while being manageable.'
      },
      {
        id: 'q3',
        question: 'What makes a password strong?',
        options: [
          'Using your birthday',
          'Using common words',
          'Using "password123"',
          'Mix of letters, numbers, and symbols'
        ],
        correctAnswer: 3,
        explanation: 'Strong passwords use a combination of different character types.'
      },
      {
        id: 'q4',
        question: 'What should you do if your password is leaked?',
        options: [
          'Keep using it anyway',
          'Change it immediately',
          'Tell everyone about it',
          'Wait a few days'
        ],
        correctAnswer: 1,
        explanation: 'Always change compromised passwords immediately to protect your accounts.'
      }
    ]
  },
  {
    id: '3',
    title: 'Digital Footprint',
    description: 'Understanding your online presence',
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        question: 'What is a digital footprint?',
        options: [
          'A computer mouse',
          'Traces you leave online',
          'A type of password',
          'A computer virus'
        ],
        correctAnswer: 1,
        explanation: 'Your digital footprint is the trail of data you create while using the internet.'
      },
      {
        id: 'q2',
        question: 'Which activity does NOT contribute to your digital footprint?',
        options: [
          'Posting on social media',
          'Searching the web',
          'Reading a paper book',
          'Sending emails'
        ],
        correctAnswer: 2,
        explanation: 'Reading physical books doesn\'t leave any digital traces.'
      },
      {
        id: 'q3',
        question: 'How long do things posted online typically last?',
        options: [
          'One day',
          'One week',
          'One year',
          'Forever'
        ],
        correctAnswer: 3,
        explanation: 'Information posted online can potentially last forever, even if deleted.'
      },
      {
        id: 'q4',
        question: 'What should you check before posting online?',
        options: [
          'The weather',
          'Your privacy settings',
          'The time',
          'Your email'
        ],
        correctAnswer: 1,
        explanation: 'Always check privacy settings to control who can see your posts.'
      }
    ]
  },
  {
    id: '4',
    title: 'Cyber Bullying Prevention',
    description: 'Learn how to identify and prevent cyber bullying',
    totalPoints: 100,
    questions: [
      {
        id: 'q1',
        question: 'What should you do if you witness cyber bullying?',
        options: [
          'Join in',
          'Ignore it',
          'Tell a trusted adult',
          'Share it with friends'
        ],
        correctAnswer: 2,
        explanation: 'Always report cyber bullying to a trusted adult who can help address the situation.'
      },
      {
        id: 'q2',
        question: 'Which is an example of cyber bullying?',
        options: [
          'Sending a friendly message',
          'Sharing mean comments',
          'Liking a photo',
          'Playing online games'
        ],
        correctAnswer: 1,
        explanation: 'Posting mean or hurtful comments is a form of cyber bullying.'
      },
      {
        id: 'q3',
        question: 'How can you protect yourself from cyber bullying?',
        options: [
          'Share your password',
          'Keep your accounts private',
          'Accept all friend requests',
          'Post personal information'
        ],
        correctAnswer: 1,
        explanation: 'Keeping your accounts private helps control who can interact with you.'
      },
      {
        id: 'q4',
        question: 'What is NOT a good response to cyber bullying?',
        options: [
          'Block the bully',
          'Save the evidence',
          'Retaliate online',
          'Tell a teacher'
        ],
        correctAnswer: 2,
        explanation: 'Retaliating can make the situation worse and get you in trouble too.'
      }
    ]
  },
  {
    id: 'password-safety-advanced',
    title: 'Password Safety Master',
    description: 'Test your knowledge about creating and managing secure passwords',
    totalPoints: 100,
    questions: [
      {
        id: 'psm-q1',
        question: "What makes a password strong?",
        options: [
          "Using your birthday",
          "Using the same password everywhere",
          "Mixing letters, numbers, and symbols",
          "Using simple words"
        ],
        correctAnswer: 2,
        explanation: "Strong passwords combine uppercase, lowercase, numbers, and special characters."
      },
      {
        id: 'psm-q2',
        question: "How often should you change important passwords?",
        options: [
          "Never",
          "Every few years",
          "Every 3-6 months",
          "Every day"
        ],
        correctAnswer: 2,
        explanation: "Regular password changes help maintain security."
      },
      {
        id: 'psm-q3',
        question: "What should you do if a website asks for your password through email?",
        options: [
          "Send it right away",
          "Never share it - legitimate sites won't ask",
          "Share it if it looks official",
          "Ask your friends what to do"
        ],
        correctAnswer: 1,
        explanation: "Legitimate websites never ask for passwords via email."
      },
      {
        id: 'psm-q4',
        question: "Which is the safest way to store passwords?",
        options: [
          "In a text file on your computer",
          "Using a secure password manager",
          "Writing them in a notebook",
          "Using the same password everywhere"
        ],
        correctAnswer: 1,
        explanation: "Password managers securely encrypt and store your passwords."
      },
      {
        id: 'psm-q5',
        question: "What should you do if your account gets hacked?",
        options: [
          "Do nothing",
          "Only tell your friends",
          "Use the same password again",
          "Change passwords and enable two-factor authentication"
        ],
        correctAnswer: 3,
        explanation: "Quick action and enhanced security help protect your accounts."
      }
    ]
  },
  {
    id: 'mobile-security',
    title: 'Mobile Device Safety',
    description: 'Test your knowledge about keeping your mobile devices secure',
    totalPoints: 100,
    questions: [
      {
        id: 'mob-q1',
        question: "What should you do before downloading a new app?",
        options: [
          "Download it immediately if it's free",
          "Check reviews and permissions it requires",
          "Share it with all your friends",
          "Give it all permissions it asks for"
        ],
        correctAnswer: 1,
        explanation: "Always verify app authenticity and check what permissions it needs."
      },
      {
        id: 'mob-q2',
        question: "Which is the safest way to unlock your phone?",
        options: [
          "No lock at all - it's faster",
          "Simple pattern that's easy to remember",
          "Biometric (fingerprint/face) + PIN backup",
          "Using 'swipe to unlock'"
        ],
        correctAnswer: 2,
        explanation: "Biometric authentication with a PIN backup provides strong security."
      },
      {
        id: 'mob-q3',
        question: "What should you do if you lose your phone?",
        options: [
          "Wait to see if someone returns it",
          "Use 'Find My Device' and lock it remotely",
          "Do nothing, it's just a phone",
          "Only call your phone"
        ],
        correctAnswer: 1,
        explanation: "Remote tracking and locking helps protect your data if your device is lost."
      },
      {
        id: 'mob-q4',
        question: "Which Wi-Fi network is safest to use?",
        options: [
          "Any free public Wi-Fi",
          "Your home's secured network",
          "Unlocked networks named 'Free Wi-Fi'",
          "Your neighbor's unsecured network"
        ],
        correctAnswer: 1,
        explanation: "Secured home networks are much safer than public or unknown networks."
      },
      {
        id: 'mob-q5',
        question: "How often should you update your apps?",
        options: [
          "Never - updates waste space",
          "When the app stops working",
          "As soon as updates are available",
          "Only gaming apps need updates"
        ],
        correctAnswer: 2,
        explanation: "Regular updates fix security issues and protect your device."
      }
    ]
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering Tricks',
    description: 'Learn to spot and avoid social engineering attacks',
    totalPoints: 100,
    questions: [
      {
        id: 'se-q1',
        question: "What is social engineering?",
        options: [
          "Making friends online",
          "Tricking people to get information",
          "Building social media apps",
          "Engineering social robots"
        ],
        correctAnswer: 1,
        explanation: "Social engineering uses tricks to manipulate people into sharing sensitive information."
      },
      {
        id: 'se-q2',
        question: "Your friend sends a message asking for your password. What should you do?",
        options: [
          "Share it - they're your friend",
          "Ask why they need it",
          "Never share it - verify their identity first",
          "Share it only this once"
        ],
        correctAnswer: 2,
        explanation: "Never share passwords, even if the request seems to come from a friend."
      },
      {
        id: 'se-q3',
        question: "Which is a sign of a social engineering attack?",
        options: [
          "Messages from known friends",
          "Creating strong passwords",
          "Urgent requests for personal info",
          "Regular software updates"
        ],
        correctAnswer: 2,
        explanation: "Urgency and pressure to share information are common social engineering tactics."
      },
      {
        id: 'se-q4',
        question: "Someone calls claiming to be tech support. What's your first step?",
        options: [
          "Give them remote access",
          "Share your password",
          "Hang up and verify independently",
          "Download their suggested software"
        ],
        correctAnswer: 2,
        explanation: "Always verify support requests through official channels you trust."
      },
      {
        id: 'se-q5',
        question: "What's 'baiting' in social engineering?",
        options: [
          "Fishing with friends",
          "Offering free gifts to trick people",
          "Making new friends",
          "Playing online games"
        ],
        correctAnswer: 1,
        explanation: "Baiting uses tempting offers to lure people into security traps."
      }
    ]
  }
]; 