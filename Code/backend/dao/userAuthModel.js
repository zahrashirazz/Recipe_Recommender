import mongodb from "mongodb";

let usersCollection;
export default class userAuthModel{
    
    static async injectDB(conn){
        if(usersCollection) return;
        try{
            usersCollection = await conn.db(process.env.RECIPES_NS).collection("users")
        }
        catch(e) {
            console.error(
                `Unable to establish a collection handle in userAuthModel: ${e}`
              );
        }
    }

    static getAllUsers(){
        
        try{
            return usersCollection.find().toArray()
            
        }
        catch(err){
            console.log("error in userauthmodel---", err)
        }
    }

    static findUser(user){
        try{
            console.log(user.username);
            return usersCollection.findOne({"credentials.username":user.username});
            
        }
        catch(err){
            console.log("error in userauthmodel---", err)
        }
    }
}