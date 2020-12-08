const users = require('../data/index');
// If I want to use sampleUser
const sampleUser = require('../data/sampleUser');

// GET USERS
const listUsers = (req, res) => {
    res.json(users)
};

// GET USER BY ID
const showUser = (req, res) => {
    const userId = req.params.id
    for(let user of users){
        if (user.id === parseInt(userId)){
            res.json(user)
        } else{
            return res.status(400).json({ msg:`No user with the id of ${userId}` })
        }
    }
};

// POST USER
const createUser = (req, res) => {
    const lastUser = users[users.length - 1].id
    const count = lastUser + 1;
    // Manual Way
    const newUser = {
        id: count,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }

    // Using Sample User

    // const newUser = {
    //     ...sampleUser
    // }
    // newUser.id = count;

    if(!newUser.name || !newUser.username || !newUser.email){
        return res.status(400).json({ msg:"Please enter name, username and email." })
    }


    users.push(newUser)
    res.json(users)
};

// PUT/ UPDATE USER
const updateUser = (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
  
    if(found){
      const updUser = req.body;
      users.forEach(user => {
          if(user.id === parseInt(req.params.id)){
          user.name = updUser.name ? updUser.name : user.name;
          user.username = updUser.username ? updUser.username : user.username;
          user.email = updUser.email ? updUser.email : user.email;
           
          res.json({ msg: "User Updated", user })
        }
      });
    } else{
      res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
    }
  
  };

// DELETE USER
const deleteUser = (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
  
    if(found){
        const userId = parseInt(req.params.id)
        users.splice(userId-1, 1)
        res.json({ msg: `Deleted user with id of ${userId}`, users})
    }else {
      res.status(400).json({ msg: `no member with id of ${req.params.id}` })
    }
  };

  module.exports = {
    listUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
  };