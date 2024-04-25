export type VideoType = {
  $id: number;
  title: string;
  thumbnail: string;
  video: string;
  prompt: string;
  creator: {
    username: string;
    avatar: string;
  };
};
