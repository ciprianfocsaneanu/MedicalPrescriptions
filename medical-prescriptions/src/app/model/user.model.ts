export interface IUser {
    email: string;
    firstname: string;
    lastname: string;

    password?: string;
}

export class UserModel implements IUser {
    private m_email = '';
    private m_firstname = '';
    private m_lastname = '';
    private m_password = '';

    constructor(user?: IUser) {
        if (user) {
            this.m_email = user.email;
            this.m_firstname = user.firstname;
            this.m_lastname = user.lastname;
            this.m_password = user.password;
        }
    }

    public get email(): string {
        return this.m_email;
    }
    public set email(value: string) {
        this.m_email = value;
    }
    public get firstname(): string {
        return this.m_firstname;
    }
    public set firstname(value: string) {
        this.m_firstname = value;
    }
    public get lastname(): string {
        return this.m_lastname;
    }
    public set lastname(value: string) {
        this.m_lastname = value;
    }
    public get password(): string {
        return this.m_password;
    }
    public set password(value: string) {
        this.m_password = value;
    }
}
