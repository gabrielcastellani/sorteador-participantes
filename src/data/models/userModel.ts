class UserModel {
    uid: string;
    email: string;
    displayName: string;

    constructor(uid: string, email: string, displayName: string) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
    }

    static clone(user: UserModel) {
        return new UserModel(
            user.uid,
            user.email,
            user.displayName
        );
    }

    static empty() {
        return new UserModel("", "", "");
    }
}

export default UserModel;