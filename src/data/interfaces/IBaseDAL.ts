interface IBaseDAL<T> {
    save(data: T): Promise<T>
    update(data: T): Promise<T>
    delete(data: T): Promise<void>
    getAll(): Promise<T[]>
}

export default IBaseDAL;