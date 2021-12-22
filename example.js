const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://jake:5242@cluster0.buwc6.mongodb.net/m3?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('m3Labs');
    const movies = database.collection('movies');

    const docs = [
        { Title: 'Happy Gilmore', Year: 1996, Rating: 7, Genre: 'comedy', Language: 'english'},
        { Title: 'Bad Boys for Life', Year: 2020, Rating: 6.5, Genre: 'action', Language: 'english'},
        { Title: 'Hamilton', Year: 2020, Rating: 8.4, Genre: 'drama', Language: 'english'},
        { Title: 'Roads to Olympia', Year: 2019, Rating: 9.6, Genre: 'drama', Language: 'spanish'},
        { Title: 'The Grinch', Year: 2018, Rating: 6.4, Genre: 'animation', Language: 'english'},
        { Title: 'The Movie With Bliss', Year: 2015, Rating: 9.2, Genre: 'adventure', Language: 'french'},
    ];

    const options = { ordered: true};

    const result = await movies.insertMany(docs, options);

    console.log(result.insertedCount);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);