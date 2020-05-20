import React,{useContext,useState,useEffect} from 'react'
import {
    Container, Col,Alert,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'
  import { AuthContext } from '../contexts/AuthContext'

export default function Loginpage() {

    const {state,dispatch} = useContext(AuthContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    
    useEffect(() => {
      if(state !== null){
        history.push('/')
      }
    }, [state])


      const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          setError("invalid email")
            return
        }
        fetch("/auth/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            setError(data.error)
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               setError(data.error)
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
      }
        
      return (
        <Container className="App border p-3 shadow ">
            
        <h2 className="text-center">Sign In</h2>

        {error?
        <Alert color="danger">
       {error}
      </Alert>
      :
      ""
      }

          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              {/* <span className="text-danger" >Email is required.</span> */}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Button className="btn btn-block btn-info" onClick={()=>PostData()}>Login</Button>
        
      </Container>

    )
}
