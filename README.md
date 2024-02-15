# embeddings-experiment

Experiment generating and using embeddings for semantic search. This codebase is designed to work with a set of hotel reviews, generating embeddings for each review using OpenAI's API, and then allowing users to query these reviews based on a question. The main libraries used are `openai` for generating embeddings and lancedb for storing and querying the embeddings.

## Main Entry Points

### index-reviews.js

This script is responsible for generating embeddings for each hotel review and storing them in a database. It first connects to the database, then generates embeddings for each review using the `getEmbeddings` function from `get-embedding.js`. These embeddings are then written to a JSON file and stored in a table in the database.

To run this script from the command line, use the following command:

```sh
node --env-file=.env ./src/scripts/index-reviews.js 
```

### find-similar-lancedb.js

This script allows users to semantically query the reviews based on a phrase. It takes a question as a command line argument, generates an embedding for the question, and then queries lancedb for the five most similar reviews.

The 5 printed reviews will be the same as those printed by `find-similar-simple.js`.

To run this script from the command line, use the following command:

```sh
node --env-file=.env ./src/scripts/find-similar-lance-db.js "tell me about the location"
```

Replace `"tell me about the location"` with your actual question.

### find-similar-simple.js

This script allows users to semantically query the reviews based on a phrase. It takes a question as a command line argument, generates an embedding for the question. Then it calculates the cosine similarity of each review to the question and prints the top 5. 

The 5 printed reviews will be the same as those printed by `find-similar-lancedb.js`.

To run this script from the command line, use the following command:

```sh
node --env-file=.env ./src/scripts/find-similar-lance-db.js "tell me about the location"
```

Replace `"tell me about the location"` with your actual question.

