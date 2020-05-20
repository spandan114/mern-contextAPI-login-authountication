import React,{useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function Homepage() {

    const {state,dispatch} = useContext(AuthContext)

    return (
        <div>
           <h1>{state?state.name : "loading" } </h1>
           <h1>{state?state.email : "loading" } </h1>
            
        </div>
    )
}
