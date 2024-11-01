# DAT250-project

### Run servers
Run the whole springboot application with `./gradlew bootRun` from root repository. The server starts at `localhost:8080`.

Run only svelte frontend with `cd frontend && npm run dev` to start server at `localhost:5173`.

### Backend JPA
Create database
1. Delete potential previous db files and previous source.
2. Run JPA program (sets up tables etc)
3. Connect to db source and DB files are created.
4. DB updates when user, polls, votes and vos are created.
5. DB updates when polls/votes/vos are removed.
6. DB updates on modifications (change in vote).
7. DB starts with stored data.