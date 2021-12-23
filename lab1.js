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

    let cursor1 = movies.find();

    console.log("\nMovie List:");
    check(cursor1);
    await cursor1.forEach((movie) => console.log(movie));

    //****************************************************************

    const cursor2 = movies.find(
      { Year: 2020 }
    );

    console.log("\n2020 Movie List:");
    check(cursor2);
    await cursor2.forEach((movie) => console.log(movie));

    //****************************************************************

    const cursor3 = await movies.findOne(
      { Language: 'english', Year: 2020 }
    );

    console.log("\n2020 and English Find One Movie:");
    console.log(cursor3);

    //****************************************************************

    const query = { Rating: { $gte: 9 } };
    const options = {
      projection: {Title: 1, Rating: 1 },
    };

    const cursor4 = movies.find(query, options);

    console.log("\nMovie List 9+ Rating:");
    check(cursor4);
    await cursor4.forEach((movie) => console.log(movie));

    //****************************************************************


    const cursor5 = movies.find(
      { Rating: { $gte: 7, $lte: 9 } },
      { sort: { Rating: -1 } }
    );

    console.log("\nMovie List 7-9 Rating:");
    check(cursor5);
    await cursor5.forEach((movie) => console.log(movie));

    //****************************************************************

    let cursor6 = movies.find(
      { Rating: { $gte: 0, $lte: 10 } },
      { sort: { Rating: -1 } }
    ).limit(3);

    console.log("\nMovie List TOP 3:");
    check(cursor6);
    await cursor6.forEach((movie) => console.log(movie));

    //****************************************************************

    let cursor7 = movies.find(
      { Year: { $gte: 2018, $lte: 2021 } },
      { sort: { Year: -1 } }
    );

    console.log("\nMovie List 2018-2021:");
    check(cursor7);
    await cursor7.forEach((movie) => console.log(movie));

    //****************************************************************

    let cursor8 = movies.find(
      {Title: {$regex: 'Bliss'}}
    );

    console.log("\nMovie List with Bliss:");
    check(cursor8);
    await cursor8.forEach((movie) => console.log(movie));

  } finally {
    await client.close();
  }
}
run().catch(console.dir);