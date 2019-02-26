db = connect("localhost:27017/admin", adminUsername, adminPwd)
db = db.getSiblingDB(username);
db.dropUser(username);
db.createUser({
    user: username,
    pwd: pwd,
    roles: [
        {
            role: "readWrite",
            db: username
        }
    ]
})