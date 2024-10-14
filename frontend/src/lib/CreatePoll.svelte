<script>
    import user from "../store/user.js";
    import poll from "../store/poll.js";

    let username = $user.username;
    let question = '';
    let validUntil = null;
    let isPublic = false;

    let numVOs = 0;

    let voteOptions = [
        {"caption": "", "presentationOrder": 0},
        {"caption": "", "presentationOrder": 1},
    ];

    let currentError = null;

    const formatDate = (validUntil) => {
        if (validUntil) {
            return new Date(validUntil).toISOString();
        }
        return null
    }

    const addVoteOption = () => {
        voteOptions = [
            ...voteOptions,
            {"caption": "", "presentationOrder": voteOptions.length + 1}
        ];
        numVOs ++;
    }

    const createPoll = () => {
        const formattedDate = formatDate(validUntil);

        if (voteOptions.length < 2) {
            console.error("Need at least 2 options.")
            return;
        }

        fetch("http://localhost:8080/polls", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:username, question: question, validUntil: formattedDate, isPublic: isPublic, voteOptions: voteOptions
            })
        })
            .then((res) => {
                if (res.status < 299) return res.json()
                if (res.status > 299) currentError = "Something wrong with server response";
            })
            .then((data) => {
                if (data) poll.set(data)
            })
            .catch((err) => {
                currentError = err;
                console.log("Error creating poll: ", err)
            })
    }
</script>

<form on:submit|preventDefault={createPoll}>
    <div>
        <label for="question">Question</label>
        <input type="text" id="question" bind:value={question}/>
    </div>
    {#each voteOptions as vo, i}
        <div>
            <label for="vo{vo.presentationOrder}">Option {i+1}</label>
            <input type="text" id="vo{vo.presentationOrder}" bind:value={vo.caption}/>
        </div>
    {/each}
    <button type="button" on:click={addVoteOption}>Add option</button>
    <div>
        <label for="validUntil">Deadline for poll</label>
        <input type="datetime-local" id="validUntil" bind:value={validUntil}/>
    </div>
    <button type="submit">Create poll</button>
</form>