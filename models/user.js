const {JsonDB} = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig")

var db = new JsonDB(new Config("db", true, true, '/'));

class User {
    constructor(obj){
        this.name = obj.name
        this.id = obj.id
        this.online = obj.online
    }

    save(){
        const dbUser = db.push("/users[]", this)
        return this
    }

    login(){
        this.online = true
        const userIndex = db.getIndex('/users', this.id)
        db.push(`/users[${userIndex}]`, this)
    }

    static findOrCreate(obj){
        const userIndex = db.getIndex(`/users`, obj.id)
        if(userIndex !== -1){
            const userObj = db.getData(`/users[${userIndex}]`)
            return new this(userObj)
        }else {
            
            const user = new this(obj)
            return user.save()
        }
    }
}


module.exports = User