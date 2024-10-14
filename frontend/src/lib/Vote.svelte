<script>
import user from "../store/user.js";
import vote from "../store/vote.js";

export let pollID;
let username = $user.username;
let currentError = null;

const result = fetch("http://localhost:8080/voteops/"+pollID).then((response) => response.json())

const castVote = (vo) => {
    console.log(pollID, username, vo)
    fetch("http://localhost:8080/votes", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pollID: pollID, username: username, voteOption: vo})
    })
        .then((res) => {
            if (res.status < 299) return res.json()
            if (res.status > 299) currentError = "Something wrong with server response";
        })
        .then((data) => {
            if (data) vote.set(data)
        })
        .catch((err) => {
            currentError = err;
            console.log("Error login in: ", err)
        })
}
</script>

<ul class="vos">
    {#await result}
        its loading…
    {:then ready}
        {#each ready as vo}
            <li>{vo.caption}
                <div class="vote-details">
                    <button on:click={() => {
                                castVote(vo.presentationOrder);
                            }}>Vote</button>
                    <p>{vo.votes} Votes</p>
                </div>
            </li>
        {/each}
    {:catch error}
        {error}
    {/await}
</ul>

<style>
.vos {
    list-style: none;
    padding-inline-start: 0;
}
.vos li {
    border: 0.18rem solid dimgrey;
    border-radius: 0.4rem;
    margin: 0.5rem 0 0.5rem 0;
    padding: 0.5rem 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.vote-details {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
</style>