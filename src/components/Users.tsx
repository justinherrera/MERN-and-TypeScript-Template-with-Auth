import { useQuery, UseQueryResult } from "react-query"
import { getUsers, logout } from "../api/useQuery"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"


const Users: React.FC = () => {

    const navigate = useNavigate ()

    const fetchUsers = async (): Promise<any> => {
        const token = localStorage.getItem('token')
        return await getUsers(`${process.env.REACT_APP_SERVER}/users`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        }, (response) => {
            return response.data.users
        })
    }

    const logoutUser = async () => {
        return await logout(`${process.env.REACT_APP_SERVER}/users/logout`, (response) => {
            if(response.data.status === 'success') {
                localStorage.removeItem('token')
                navigate('/login')
                return response
            }
        })
    }


    const { isFetching, error, data }: UseQueryResult<Users, Error> = useQuery<Users, Error>("users", fetchUsers)
    
    if(localStorage.getItem('token') == null) {
        return <h2>You are not logged in</h2>
    }

    if (isFetching) return <h2>Loading...</h2>

    if (error) return <h2>Error: {error.message}</h2>
    

    if (data) {

        return (
            <div>
                <button onClick={logoutUser}>Logout</button>
                <h2>Users</h2>
                {
                    data.map((user: any) => {
                        return (
                            <Link 
                                to={`/users/${user._id}`} 
                                key={user._id}>
                                    {user.name}
                            </Link>
                        )
                    })
                }
            </div>
        )
    } 

    return <p>No Data Found</p>
}

export default Users
