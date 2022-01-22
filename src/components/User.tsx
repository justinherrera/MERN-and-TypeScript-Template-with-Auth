import React from 'react'
import { useQuery, UseQueryResult } from "react-query"
import { getUser } from "../api/useQuery"
import { useParams } from "react-router-dom";

const User: React.FC = () => {

    let { id } = useParams();

    const { isFetching, error, data }: UseQueryResult<User, Error> = useQuery<User, Error>("user", async (): Promise<any> => {
        const token = localStorage.getItem('token')
        return await getUser(`${process.env.REACT_APP_SERVER}/users/${id}`, {
            headers: { 
                'Authorization': `Bearer ${token}` 
            }
        },
        (response) => {
            console.log(response)
            return response.data.user
        })
    })

    
    if (isFetching) return <h2>Loading...</h2>

    if (error) return <h2>{error.message}</h2>

    if (data) {

        return (
            <div>
                {data.id} - {data.name}
            </div>
        )
    } 

    return <p>No User Found</p>
}

export default User
