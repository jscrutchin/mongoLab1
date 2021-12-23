const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://jake:5242@cluster0.buwc6.mongodb.net/m3Labs?retryWrites=true&w=majority";

const client = new MongoClient(uri);

function check(cursor) {
  if ((cursor.count()) === 0) {
    console.log("No documents found!");
  }
}

async function run() {
  try {
    await client.connect();

    const database = client.db('m3Labs');
    const movies = database.collection('movies');

    

  } finally {
    await client.close();
  }
}
run().catch(console.dir);