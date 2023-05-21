router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    //following yourself
    if (id === currentUserId){
        res.status(403).json("Error, Action Forbidden")
    } else {
        try {
            const followUser =  UserModel.findById(id)
            const followingUser =  UserModel.findById(currentUserId)
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