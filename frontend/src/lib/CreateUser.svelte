<script>
    import user from "../store/user.js";
    let username = '';
    let password = '';

    let newUsername = '';
    let newPassword = '';
    let email = '';
    let currentError = null;

    const login = () => {
        fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username, password:password})
        })
            .then((res) => {
                if (res.status < 299) return res.json()
                if (res.status > 299) currentError = "Something wrong with server response";
            })
            .then((data) => {
                if (data) user.set(data)
            })
            .catch((err) => {
                currentError = err;
                console.log("Error login in: ", err)
            })
    }

    const createUser = () => {
        fetch("http://localhost:8080/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:newUsername, password:newPassword, email:email})
        })
            .then((res) => {
                if (res.status < 299) return res.json()
                if (res.status > 299) currentError = "Something wrong with server response";
            })
            .then((data) => {
                if (data) user.set(data)
            })
            .catch((err) => {
                currentError = err;
                console.log("Error login in: ", err)
            })
    }
</script>
<div class="content">
    <form on:submit|preventDefault={login}>
        <p>Log in with username and password</p>
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={username}/>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password}/>
        </div>
        <button type="submit">Log in</button>
    </form>
    <form on:submit|preventDefault={createUser}>
        <p>Create a user if you don't have one</p>
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" bind:value={newUsername}/>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={newPassword}/>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" bind:value={email}/>
        </div>
        <button type="submit">Create user</button>
    </form>
</div>