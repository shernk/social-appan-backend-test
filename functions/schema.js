let db = {
  users: [
    {
      userId: "dh23ggj5h32g543j5gf43",
      email: "user@email.com",
      handle: "user",
      createdAt: "2019-03-15T10:59:52.798Z",
      imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
      bio: "Hello, my name is user, nice to meet you",
      website: "https://user.com",
      location: "Lonodn, UK",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "This is a sample scream",
      createdAt: "2019-03-15T10:59:52.798Z",
      likeScreamCount: 5,
      commentScreamCount: 3,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "kdjsfgdksuufhgkdsufky",
      userId: "jasdasdibasdasd",
      body: "nice one mate!",
      createdAt: "2019-03-15T10:59:52.798Z",
      likeCommentCount: 5,
      replyCommentCount: 0,
      userImage: "req.user.imageUrl",
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "kdjsfgdksuufhgkdsufky",
      type: "like | comment",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
};

const userInfo = {
  credentials: {
    userId: "N43KJ5H43KJHREW4J5H3JWMERHB",
    email: "user@email.com",
    handle: "user",
    createdAt: "2019-03-15T10:59:52.798Z",
    imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
    bio: "Hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "Lonodn, UK",
  },
  screams: [
    {
      userId: "N43KJ5H43KJHREW4J5H3JWMERHB",
      screamId: "hh7O5oWfWucVzGbHH2pa",
      userHandle: "user",
    },
    {
      userId: "N43KJ5H43KJHREW4J5H3FGTGHYH",
      screamId: "3IOnFoQexRcofs5OhBXO",
      userHandle: "user2",
    },
  ],
  likes: [
    {
      userHandle: "user2",
      screamId: "hh7O5oWfWucVzGbHH2pa",
    },
    {
      userHandle: "user",
      screamId: "3IOnFoQexRcofs5OhBXO",
    },
  ],
};
