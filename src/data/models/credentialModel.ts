class Credential {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    static clone(credential: Credential) {
        return new Credential(
            credential.email,
            credential.password
        );
    }

    static empty() {
        return new Credential("", "");
    }
}

export default Credential;