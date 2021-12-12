export interface IUser {
  email: string
  password: string
}

export interface IRegUser extends IUser {
  name: string
  number: string
  address: string
  passwordRepeat: string
}
