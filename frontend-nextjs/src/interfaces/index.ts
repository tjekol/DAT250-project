export interface CreateVoteOption {
  caption: string;
  presentationOrder: number;
}
export interface VoteOption extends CreateVoteOption {
  votes: number;
  id: number;
}

export interface CasteVote {
  pollID: string;
  username: string;
  voteOption: string;
}

// Example usage in a Poll:
const voteOptions: VoteOption[] = [
  { id: 1, votes: 0, caption: "Option 1", presentationOrder: 1 },
  { id: 2, votes: 10, caption: "Option 2", presentationOrder: 2 },
];

export interface CreatePoll {
  question: string;
  validUntil: string;
  public: boolean;
  voteOptions: CreateVoteOption[];
}
export interface Poll extends CreatePoll {
  username: string;
  pollID: string;
  voteOptions: VoteOption[];
}

// Example usage in a POST request:
const getPoll: Poll = {
  pollID: "1",
  username: "creatorUsername",
  question: "What's your favorite programming language?",
  validUntil: "2023-12-31T23:59:59Z",
  public: true,
  voteOptions: [
    { id: 1, votes: 0, caption: "Option 1", presentationOrder: 1 },
    { id: 2, votes: 10, caption: "Option 2", presentationOrder: 2 },
  ],
};

export interface User {
  username: string;
  email: string;
  password: string;
  id: string;
}
