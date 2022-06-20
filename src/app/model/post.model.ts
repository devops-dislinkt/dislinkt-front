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
    like: [] = [];
    dislike: [] = [];
    comments: Comment[] = [];
    date: Date = new Date();
}