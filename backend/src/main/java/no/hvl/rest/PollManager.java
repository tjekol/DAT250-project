package no.hvl.rest;

import no.hvl.rest.components.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PollManager {
    private final Map<String, User> users = HashMap.newHashMap(2);
    private final Map<UUID, Poll> polls = HashMap.newHashMap(2);
    private final Map<UUID, Vote> votes = HashMap.newHashMap(2);

    private final Map<UUID, User> userPolls = HashMap.newHashMap(2);
    private final Map<UUID, Set<Vote>> pollVotes = HashMap.newHashMap(2);

    private final UserRepository userRepository;
    private final PollRepository pollRepository;
    private final VoteRepository voteRepository;
    private final VoteOptionRepository voRepository;
    private final VoteOptionRepository voteOptionRepository;

    @Autowired
    public PollManager(UserRepository userRepository, PollRepository pollRepository, VoteRepository voteRepository, VoteOptionRepository voRepository, VoteOptionRepository voteOptionRepository) {
        this.userRepository = userRepository;
        this.pollRepository = pollRepository;
        this.voteRepository = voteRepository;
        this.voRepository = voRepository;
        this.voteOptionRepository = voteOptionRepository;
    }

    public Set<User> getUsers() {
        return new HashSet<>(users.values());
    }

    public Set<Poll> getPolls() {
        return new HashSet<>(polls.values());
    }

    public Set<Vote> getVotes() {
        return new HashSet<>(votes.values());
    }

    public Set<VoteOption> getVoteOptions() {
        Set<VoteOption> vos = new HashSet<>();
        for (Poll poll : polls.values()) {
            vos.addAll(poll.getVoteOptions());
        }
        return vos;
    }

    public Set<VoteOption> getVoteOptions(UUID pollID) {
        return getPollByID(pollID).getVoteOptions();
    }

    // always check if user/poll exist before getting them
    public boolean userExists(String username) {
        return users.containsKey(username);
    }

    public boolean pollExists(UUID pollID) {
        return polls.containsKey(pollID);
    }

    public User getUserByUsername(String username) {
        return users.get(username);
    }

    public Poll getPollByID(UUID id) {
        return polls.get(id);
    }

    public boolean createUser(User user) {
        if (userExists(user.getUsername())) {
            return false; // user already exists, not created
        } else {
            users.put(user.getUsername(), user);
            userRepository.save(user);
            return true; // user is created
        }
    }

    public boolean createPoll(Poll poll, String username) {
        if (username.equals("") || username == null || poll == null) {
            return false;
        }
        pollRepository.save(poll);

        User creator = getUserByUsername(username);
        UUID pollID = poll.getPollID();

        if (creator == null) {
            return false;
        }

        if (userExists(creator.getUsername())) {
            // all polls are unique, therefore no conflicts
            polls.put(pollID, poll);
            userPolls.put(pollID, creator);
            pollVotes.put(pollID, new HashSet<>());

            poll.setPollCreator(creator);
            for (VoteOption vo : poll.getVoteOptions()) {
                vo.setOwningPoll(poll);
                voRepository.save(vo);
            }

            return true;
        } else {
            return false;
        }
    }

    public boolean deletePoll(UUID pollID) {
        if (pollExists(pollID)) {
            Poll poll = getPollByID(pollID);
            pollRepository.delete(poll);

            polls.remove(pollID);
            userPolls.remove(pollID);
            pollVotes.remove(pollID);

            for (Vote vote : votes.values()) {
                if (vote.getPollID().equals(pollID)) {
                    voteRepository.delete(vote);
                    UUID voteID = vote.getId();
                    votes.remove(voteID);
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public boolean deleteAllPolls() {
        polls.clear();
        votes.clear();
        userPolls.clear();
        pollVotes.clear();
        pollRepository.deleteAll();
        voteRepository.deleteAll();
        voteOptionRepository.deleteAll();
        return true;
    }

    public boolean castVote(Vote vote) {
        voteRepository.save(vote);
        if (vote.getPollID() == null) {
            return false;
        }
        UUID votePollID = vote.getPollID();
        if (!pollExists(votePollID)) {
            return false;
        }
        Poll poll = getPollByID(votePollID);

        if (poll.isPublic()) { // public poll
            String voter = vote.getVoterUsername();
            if (voter.equals("")) {
                voter = UUID.randomUUID().toString(); // anonymous voter
                vote.setVoter(voter);
            }
            votes.put(vote.getId(), vote);
            pollVotes.get(votePollID).add(vote);
            poll.getVoteOption(vote.getVoteOption()).addVote();

            return true;
        } else { // private poll
            Set<Vote> pollVoteSet = pollVotes.get(votePollID); // gets all votes from the same poll
            if (pollVoteSet == null) {
                pollVoteSet = new HashSet<>();
                pollVotes.put(votePollID, pollVoteSet);
            }
            userHasVoted(vote, pollVoteSet, poll);
            User user = getUserByUsername(vote.getVoterUsername());
            vote.setVoterUser(user);

            votes.put(vote.getId(), vote);
            pollVoteSet.add(vote);
            pollVotes.put(votePollID, pollVoteSet);
            poll.getVoteOption(vote.getVoteOption()).addVote();
        }
        return true; // vote was cast or updated
    }

    // the user has already voted, remove the old vote
    private void userHasVoted(Vote vote, Set<Vote> pollVoteSet, Poll poll) {
        Vote existingVote = null;
        for (Vote pollVote : pollVoteSet) {
            if (pollVote.getVoterUsername().equals(vote.getVoterUsername())) {
                existingVote = pollVote;
                break;
            }
        }

        if (existingVote != null) { // user has voted before
            votes.remove(existingVote.getId()); // remove old vote from the map
            pollVoteSet.remove(existingVote); // remove old vote from the set
            poll.getVoteOption(existingVote.getVoteOption()).removeVote();
        }
    }

    public boolean login(String username, String password) {
        if (userExists(username)) {
            User user = getUserByUsername(username);
            if (user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }
}
