export type User = {
  username: string;
  email: string;
  password: string;
};

export type Users = User[];

export type PollOption = {
  voteOptionId: string;
  presentationOrder: number;
  caption: string;
  voteCount: number;
};

export type PollOptionCreate = {
  caption: string;
  presentationOrder: number;
};

export type PollOptions = PollOption[];

export type VoteDetail = {
  voteId: string;
  voter: string;
  selectedOption: PollOption;
  voteTime: string;
};

export type PollVotes = {
  [voterId: string]: VoteDetail;
};

export type Poll = {
  pollId: string;
  question: string;
  options: PollOption[];
  creatorId: string;
  votes: PollVotes;
  createdAt: string;
  closesAt: string;
};

export type Polls = Poll[];
