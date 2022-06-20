export class Comment {
    comment: string = '';
    username: string = '';
}

export class Post {
    _id: string = '';
    username: string = '';
    title: string = '';
    content: string = '';
    image: string;
    links: string[] = [];
    like: string[] = []; // usernames that liked
    dislike: string[] = []; // usernames that disliked
    comments: Comment[] = [];
    date: Date = new Date();
}