export interface UserModel {
    id: number,
    email: string,
    password?: string,
    roles?: [],
    createdAt: Date,
}