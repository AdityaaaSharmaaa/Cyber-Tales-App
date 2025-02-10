import { Story } from '../types/story';

export const stories: Story[] = [
  {
    id: '1',
    title: 'The Digital Dragon',
    description: 'Learn about internet safety with friendly dragon Tim!',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
    startingPageId: 'page1',
    pages: {
      page1: {
        id: 'page1',
        content: "Once upon a time, there was a friendly dragon named Tim who loved to explore the internet. One day, while browsing his favorite websites, he received a mysterious message...",
        backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
        choices: [
          {
            id: 'choice1',
            text: 'Open the message',
            nextPageId: 'page2a'
          },
          {
            id: 'choice2',
            text: 'Ignore the message',
            nextPageId: 'page2b'
          }
        ]
      },
      page2a: {
        id: 'page2a',
        content: "Oh no! The message was from a trickster troll! Tim's computer started showing lots of pop-ups...",
        backgroundImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
        choices: [
          {
            id: 'choice3',
            text: 'Ask for help',
            nextPageId: 'page3a'
          },
          {
            id: 'choice4',
            text: 'Try to fix it alone',
            nextPageId: 'page3b'
          }
        ]
      },
      page2b: {
        id: 'page2b',
        content: "Good choice! Tim remembered what he learned about not opening messages from strangers. He decided to tell his friend about it...",
        backgroundImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
        choices: [
          {
            id: 'choice5',
            text: 'Share with more friends',
            nextPageId: 'ending1'
          }
        ]
      },
      ending1: {
        id: 'ending1',
        content: "Congratulations! Tim learned an important lesson about internet safety. By being careful with unknown messages, he kept himself safe online!",
        backgroundImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
        isEnding: true
      }
    }
  },
  {
    id: '2',
    title: 'Password Protectors',
    description: 'Join the Password Protection Squad on their mission!',
    thumbnail: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
    startingPageId: 'start',
    pages: {
      'start': {
        id: 'start',
        content: "Meet the Password Protection Squad! They're a group of cyber heroes who help keep everyone's passwords safe. One day, they received an urgent message...",
        backgroundImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
        choices: [
          {
            id: 'c1',
            text: 'Check the message',
            nextPageId: 'mission'
          },
          {
            id: 'c2',
            text: 'Prepare the team first',
            nextPageId: 'prepare'
          }
        ]
      },
      'mission': {
        id: 'mission',
        content: "The message reveals that someone is using weak passwords! The squad needs to act fast...",
        backgroundImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
        choices: [
          {
            id: 'c3',
            text: 'Create a strong password guide',
            nextPageId: 'success'
          },
          {
            id: 'c4',
            text: 'Rush to help immediately',
            nextPageId: 'hurry'
          }
        ]
      },
      'success': {
        id: 'success',
        content: "Great choice! The squad created an amazing guide that helped everyone create strong passwords. Mission accomplished!",
        backgroundImage: 'https://images.unsplash.com/photo-1633265486064-086b219458ec',
        isEnding: true
      }
    }
  },
  {
    id: '3',
    title: 'Cyber Space Explorer',
    description: 'Explore the digital universe safely!',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    startingPageId: 'begin',
    pages: {
      'begin': {
        id: 'begin',
        content: "Welcome aboard the Cyber Spaceship! As a new explorer, you're about to venture into the vast digital universe. But first, you need to prepare...",
        backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        choices: [
          {
            id: 'c1',
            text: 'Check safety protocols',
            nextPageId: 'safety'
          },
          {
            id: 'c2',
            text: 'Launch immediately',
            nextPageId: 'danger'
          }
        ]
      },
      'safety': {
        id: 'safety',
        content: "Smart move! You review the safety protocols: always use protection, verify destinations, and maintain communication...",
        backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        choices: [
          {
            id: 'c3',
            text: 'Start the journey',
            nextPageId: 'victory'
          }
        ]
      },
      'victory': {
        id: 'victory',
        content: "Congratulations! Your careful preparation paid off. You're now ready to explore the cyber universe safely!",
        backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        isEnding: true
      }
    }
  },
  {
    id: '4',
    title: 'Digital Detective',
    description: 'Solve the mystery of the missing data!',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    startingPageId: 'case1',
    pages: {
      'case1': {
        id: 'case1',
        content: "A mysterious case has landed on your desk: important files have gone missing! As a Digital Detective, you need to solve this cyber mystery...",
        backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
        choices: [
          {
            id: 'c1',
            text: 'Check the backup system',
            nextPageId: 'backup'
          },
          {
            id: 'c2',
            text: 'Look for suspicious activity',
            nextPageId: 'investigate'
          }
        ]
      },
      'backup': {
        id: 'backup',
        content: "Good thinking! You discover the files were accidentally moved to the backup folder. Now to prevent this from happening again...",
        backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
        choices: [
          {
            id: 'c3',
            text: 'Set up automatic backups',
            nextPageId: 'solved'
          }
        ]
      },
      'solved': {
        id: 'solved',
        content: "Case closed! You not only found the missing files but also implemented a better system to prevent future incidents. Well done, detective!",
        backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
        isEnding: true
      }
    }
  }
]; 