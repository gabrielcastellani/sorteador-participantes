import ChangeType from "../enums/ChangeType";

class ResponseModel<T> {
    changeType: ChangeType;
    data: T;
    
    constructor(changeType: ChangeType, data: T) {
        this.changeType = changeType;
        this.data = data;
    }
}

export default ResponseModel;