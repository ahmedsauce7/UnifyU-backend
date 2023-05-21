router.post('/', async (req, res, next) => {
    const id = req.params.id
    const {userId} = req.body
    try {
        const likePost = await PostModel.findById(id);
        if(!likePost.likes.includes(userId)){
            await likePost.updateOne({$push: {lieks: userId}})
            res.status(200).json("UnifyU Post Liked")
        }
    } catch (error) {
      res.status(500).json(error);
    }
  });

