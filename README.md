![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

## Project Title
UnifyU
<br>
<hr>

## Project Description
UnifyU is an innovative social media platform designed to foster meaningful connections, inspire creativity, and empower individuals to share their stories with the world. Our platform aims to unite people from diverse backgrounds, cultures, and interests, providing a safe and inclusive space where users can express themselves, engage in meaningful conversations, and discover new perspectives.
<br>
<hr>

## MVP
- Create and read a profile.
- Share posts, update and comment them.
- Delete you post, if you don`t like him.
<br>
<hr>

## Backlog
- Implement user registration functionality
- Develop user login and authentication system
- Create user profile pages with customizable fields
- Enable users to edit and update their profiles
- Implement a post creation feature for text, images
- Implement post sharing functionality with customizable privacy settings
- Implement encryption protocols for secure data transmission
<br>
<hr>


## Data Structure
- router.get()
- router.post()
- router.put()
- router.delete()
- cookies
- session
- authentication
- app.use
<br>
<hr>

## Models
User
```{
  email: { type: String, unique: true, required: true, ref: "Post" },
  password: { type: String, required: true },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  profilePicture: { type: String },
  coverPicture: { type: String },
  followers: [] ,
  following: [],
},
  {timestamps: true}
```
 Post
 ```{
     userId: { type: Schema.Types.ObjectId, ref: "User"},
     firstName: { type: String},
     lastName: { type: String},
     location: String,
     description: String,
     picture: String,
     userPicturePath: String,
     likes: [],
     comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
      },
      { timestamps: true }
    );
 ```   
Comment
 ``` {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User"  },
    comment: { type: String },
  },
  { timestamps: true }
);
```
## 🚀 About us
We are full stack developer...


## App link
[Click here to access](https://animeuni.adaptable.app/)
<br>
<hr>

## Git
[Click here to access the Git link](https://github.com/ahmedsauce7/UnifyU-backend.git)
<br>
<hr>

## Slides 
[Click here to access the slides](https://docs.google.com/presentation/d/1UJT3IR1RaIi-86EaepUcC1dzieG6XmSRXx0fFj9dX3o/edit#slide=id.g23e6cfc0529_1_28)
