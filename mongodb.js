// CRUD create read update delete

const { MongoClient, ObjectId} = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager-app';

//We can generate IDs but needless code.
// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())

const client = new MongoClient(connectionURL);

// async function main() {
    // try{
    //     await client.connect();
    //     console.log('connected successfully');
        // const db = client.db(databaseName);
        // const collection = db.collection('users'); //create a document named users
        // const collection = db.collection('tasks')
        // const result = await collection.insertMany([
        //     {
        //         name: 'Mukesh',
        //         age: 23
        //     },
        //     {
        //         name: 'Kowalski',
        //         age : 29
        //     }
        // ]);
        
        // const result = await collection.insertMany([
        //     {
        //         description : 'kys',
        //         completed : true
        //     },
        //     {
        //         description : 'try again',
        //         completed : true
        //     },
        //     {
        //         description : 'tired',
        //         completed : true
        //     }
        // ])

    //     console.log('User inserted:', result.insertedIds); // Log the result of the insertion
    // } catch (error) {
    //     console.error('An error occurred:', error);
    // } 
    // finally {
    //     await client.close(); // Ensure the client is closed after the operation
    // }
// }

// async function main(){
//     try{
//         await client.connect();
//         console.log('connected successfully')
//         const db = client.db(databaseName)
//         const collection = db.collection('tasks');

//         const result = await collection.find({completed : true}).toArray()
//         console.log(result)
//     }
//     catch(error){
//         console.log('Error occurred', error)
//     }
//     finally{
//         await client.close();
//     }
// }


async function updateValue(){
    try{
        await client.connect();
        console.log('connected successfully')
        const db = client.db(databaseName)
        const collection = db.collection('users');
        const result = await collection.updateMany({
            _id: new ObjectId('66c0de3735a0dfdf9ef0c3aa'),
            // _id: new ObjectId('66c0de3735a0dfdf9ef0c3a9')
        },{
            $set: {name: 'Logan', age: 31},
            // $set: {name : 'Wade', age: 28}
        })
        console.log(result)
    }
    catch(error){
        console.log('Error occurred', error)
    }
    finally{
        await client.close();
    }
}

async function deleteValue(){
    await client.connect()
    console.log('connected successfully')
    const db = client.db(databaseName)
    const collection = db.collection('users')
    const result = await collection.deleteMany({
        age: 28,
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log('Error encountered', error)
    })
}

deleteValue()
// updateValue()

// MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
//     if (error) {
//         console.log(error)
//         return console.log('Unable to connect to database!')
        
//     }

//     console.log('Connected correctly!');
//     const db = client.db(databaseName);
//     db.collection('users').insertOne({
//         name: 'Sid',
//         age: 20
//     }, (err, result) => {
//         if (err) {
//             return console.log('Unable to insert user');
//         }
//         console.log('User inserted:', result.ops);
//     });
// });
