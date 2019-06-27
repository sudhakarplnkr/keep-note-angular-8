export class Login {
    public UserId: string;
    public Password: string;
}

export class User extends Login {
    public Name: string;
    public Contact: string;
}

export class UserClaims {
    public token: string;
    public userId: string;
}