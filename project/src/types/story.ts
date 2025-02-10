export interface StoryChoice {
  id: string;
  text: string;
  nextPageId: string;
}

export interface StoryPage {
  id: string;
  content: string;
  backgroundImage: string;
  choices?: StoryChoice[];
  isEnding?: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  pages: Record<string, StoryPage>;
  startingPageId: string;
} 