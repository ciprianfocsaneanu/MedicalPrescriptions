export interface ILoginUser {
    username: string;
    password: string;
}
export interface IRegisterUser {
    email: string;
    password: string;
    age: number;
    fullName: string;
}

export interface IUser {
    email: string;
    fullName: string;
    age: number;

    password?: string;
}

export class UserModel implements IUser {
    private m_email = '';
    private m_fullName = '';
    private m_password = '';
    private m_age: number = null;

    constructor(user?: IUser) {
        if (user) {
            this.m_email = user.email;
            this.m_fullName = user.fullName;
            this.m_password = user.password;
            this.m_age = user.age;
        }
    }

    public get age(): number {
        return this.m_age;
    }
    public set age(value: number) {
        this.m_age = value;
    }
    public get email(): string {
        return this.m_email;
    }
    public set email(value: string) {
        this.m_email = value;
    }
    public get fullName(): string {
        return this.m_fullName;
    }
    public set fullName(value: string) {
        this.m_fullName = value;
    }
    public get password(): string {
        return this.m_password;
    }
    public set password(value: string) {
        this.m_password = value;
    }
}
