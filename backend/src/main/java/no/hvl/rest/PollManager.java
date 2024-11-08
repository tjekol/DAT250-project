package no.hvl.rest;

import no.hvl.rest.components.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class PollManager {
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

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public Iterable<Poll> getPolls() {
        return pollRepository.findAll();
    }

    public Iterable<Vote> getVotes() {
        return voteRepository.findAll();
    }

    public Iterable<VoteOption> getVoteOptions() {
        Set<VoteOption> vos = new HashSet<>();
        for (Poll poll : pollRepository.findAll()) {
            vos.addAll(poll.getVoteOptions());
        }
        return vos;
    }

    public Iterable<VoteOption> getVoteOptions(UUID pollID) {
        return getPollByID(pollID).getVoteOptions();
    }

    // always check if user/poll exist before getting them
    public boolean userExists(String username) {
        return userRepository.findByUsername(username) != null;
    }

    public boolean pollExists(UUID pollID) {
        return pollRepository.findById(pollID) != null;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Poll getPollByID(UUID id) {
        return pollRepository.findById(id);
    }

    public boolean createUser(User user) {
        if (userExists(user.getUsername())) {
            return false; // user already exists, not created
        } else {
            userRepository.save(user);
            return true; // user is created
        }
    }

    public boolean createPoll(Poll poll, String username) {
        if (username.equals("") || username == null || poll == null) {
            return false;
        }
        User creator = getUserByUsername(username);
        if (creator == null) {
            return false;
        }

        if (userExists(creator.getUsername())) {
            pollRepository.save(poll);
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

            for (Vote vote : voteRepository.findAll()) {
                if (vote.getPollID().equals(pollID)) {
                    voteRepository.delete(vote);
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public boolean deleteAllPolls() {
        pollRepository.deleteAll();
        voteRepository.deleteAll();
        voteOptionRepository.deleteAll();
        return true;
    }

    public boolean castVote(Vote vote) {
        if (vote.getPollID() == null) {
            return false;
        }
        UUID votePollID = vote.getPollID();
        if (!pollExists(votePollID)) {
            return false;
        }
        Poll poll = getPollByID(votePollID);

        if (poll.isPublic()) {
            String voter = vote.getVoterUsername();
            if (voter.equals("")) { // no voter then anonymous voter
                voter = UUID.randomUUID().toString();
                vote.setVoterUsername(voter);
            }
            voteRepository.save(vote);
            VoteOption vo = poll.getVoteOption(vote.getVoteOption());
            vo.addVote();
            voteOptionRepository.save(vo);
        } else { // private
            vote.setUser(userRepository.findByUsername(vote.getVoterUsername()));
            voteRepository.save(vote);
            userHasVoted(vote, poll);

            voteRepository.save(vote);
            VoteOption vo = poll.getVoteOption(vote.getVoteOption());
            vo.addVote();
            voteOptionRepository.save(vo);
        }
        return true; // vote was cast or updated
    }

    // the user has already voted, remove the old vote
    private void userHasVoted(Vote vote, Poll poll) {
        List<Vote> userVotes = voteRepository.findByPollIDAndUsername(vote.getPollID(), vote.getVoterUsername());

        if (!userVotes.isEmpty()) {
            Vote existingVote = userVotes.getFirst();
            VoteOption vo = poll.getVoteOption(existingVote.getVoteOption());
            vo.removeVote();
            voteOptionRepository.save(vo);
            voteRepository.delete(existingVote);
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
