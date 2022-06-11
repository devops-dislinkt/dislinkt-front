export class Profile {
    id: number;
    username: string;
    email:  string;
    firstName:  string;
    lastName:  string;
    role: 'admin' | 'user';
    private: boolean;
}