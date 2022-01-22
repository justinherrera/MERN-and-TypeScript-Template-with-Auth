type Data = {
    userId: number
    id: number
    name: string
    email: string
}

type Users = {
    data: Data[]
    map: (user: any) => any
}

type User = {
    id: number,
    name: string,
}

interface IErrorState {

}
