const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/', (req, res, next) => {
  res.json('user is good in here');
});


//getting user from database
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const userC = await UserModel.findById(id);
      if (userC) {
        const {password, ...otherInfo} = userC._doc
        res.status(200).json(otherInfo);
      } else {
        res.status(404).json({ message: 'User doesnt exist, please try again' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //Update user to database
  router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId, password } = req.body;
    if (id === currentUserId) {
      try {
        if(password){
            const salt = await bcrypt.genSaltSync(saltRounds);
            req.body.password = await bcrypt.hash(password, salt)
        }
        const userC = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(userC);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json({ message: 'Access Denied, Please update only your profile' });
    }
  });

  //delete user from database
  router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (id === currentUserId) {
      try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("User Successfully Deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json({ message: 'Access Denied, Please delete only your profile' });
    }
  });

  //following a user
  router.put('/:id/follow', async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    //following yourself
    if (id === currentUserId){
        res.status(403).json("Can't UnifyU this User")
    } else {
        try {
            const followUser =  await UserModel.findById(id)
            const followingUser =  await UserModel.findById(currentUserId)
            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push : {followers: currentUserId}})
                await followingUser.updateOne({$push : {following: id}})
                res.status(200).json("UnifyU User Followed!")
            } else {
                res.status(403).json("User Already UnifyU-ed ")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
  });

  //unfollowing a user
  router.put('/:id/unfollow', async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    //unfollowing yourself
    if (id === currentUserId){
        res.status(403).json("Can't UnifyU this User")
    } else {
        try {
            const followUser =  await UserModel.findById(id)
            const followingUser =  await UserModel.findById(currentUserId)
            if(followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$pull : {followers: currentUserId}})
                await followingUser.updateOne({$pull : {following: id}})
                res.status(200).json("UnifyU User Unfollowed!")
            } else {
                res.status(403).json("User Is Not UnifyU-ed!")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
  });


module.exports = router;
