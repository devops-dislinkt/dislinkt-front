export class UserDto {
    id: number;
    username: string;
    password:  string;
    email:  string;
    firstName:  string;
    lastName:  string;
    role: { id: number };
}