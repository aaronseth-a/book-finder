// import user model
const { User, Book, BookInfo } = require('../models');
// import sign token function from auth
const { signToken, AuthenticationError } = require('../utils/auth');



const resolvers = {

  Query:{
    me: async(parent, {userId})=>{
      return User.findOne({_id:userId});
    }
  },
  Mutation:{
    login: async(parent, {email, password})=>{
      const user = await User.findOne({email});
      
      if(!user){
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if(!correctPw){
        throw AuthenticationError;
      }

      const token = signToken(user);
      return {token, user};
    },
    addUser: async(parent, {username, email, password})=>{
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return {token, user};
    },
    saveBook: async(parent, {bookInfo}, context)=>{
      if(context.user){
        context.user.bookCount += 1;

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { 
            $addToSet: {savedBooks: bookInfo},
            $set: { bookCount: context.user.bookCount} 
          },
          { new: true }
        );
      }
      throw AuthenticationError;

    },
    removeBook: async(parent,{bookId},context)=>{
      if(context.user){
        context.user.bookCount -=1;

        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {savedBooks: {bookId: bookId} },
            $set: { bookCount: context.user.bookCount }
          },
          { new: true }
        )
      }
      throw AuthenticationError;
    }

  },

}

module.exports = resolvers;
//{ 
  // // get a single user by either their id or their username
  // async getSingleUser({ user = null, params }, res) {
  //   const foundUser = await User.findOne({
  //     $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
  //   });

  //   if (!foundUser) {
  //     return res.status(400).json({ message: 'Cannot find a user with this id!' });
  //   }

  //   res.json(foundUser);
  // },
  // // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  // async createUser({ body }, res) {
  //   const user = await User.create(body);

  //   if (!user) {
  //     return res.status(400).json({ message: 'Something is wrong!' });
  //   }
  //   const token = signToken(user);
  //   res.json({ token, user });
  // },
  // // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // // {body} is destructured req.body
  // async login({ body }, res) {
  //   const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
  //   if (!user) {
  //     return res.status(400).json({ message: "Can't find this user" });
  //   }

  //   const correctPw = await user.isCorrectPassword(body.password);

  //   if (!correctPw) {
  //     return res.status(400).json({ message: 'Wrong password!' });
  //   }
  //   const token = signToken(user);
  //   res.json({ token, user });
  // },
  // // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // // user comes from `req.user` created in the auth middleware function
  // async saveBook({ user, body }, res) {
  //   console.log(user);
  //   try {
  //     const updatedUser = await User.findOneAndUpdate(
  //       { _id: user._id },
  //       { $addToSet: { savedBooks: body } },
  //       { new: true, runValidators: true }
  //     );
  //     return res.json(updatedUser);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json(err);
  //   }
  // },
  // // remove a book from `savedBooks`
  // async deleteBook({ user, params }, res) {
  //   const updatedUser = await User.findOneAndUpdate(
  //     { _id: user._id },
  //     { $pull: { savedBooks: { bookId: params.bookId } } },
  //     { new: true }
  //   );
  //   if (!updatedUser) {
  //     return res.status(404).json({ message: "Couldn't find user with this id!" });
  //   }
  //   return res.json(updatedUser);
  // },
//};
