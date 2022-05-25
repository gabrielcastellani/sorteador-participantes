import ChangeType from "../enums/ChangeType";
import ResponseModel from "../models/ResponseModel";

interface IService<T> {
    processRequest(changeType: ChangeType, data: T): Promise<ResponseModel<T>>
    getAll(): Promise<T[]>
}

export default IService;