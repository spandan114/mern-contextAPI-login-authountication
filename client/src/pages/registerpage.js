import React,{useContext,useState,useEffect} from 'react'
import {
    Container, Col, Alert,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'
  import { AuthContext } from '../contexts/AuthContext'
// import { register } from '../Actions/Authaction'


export default function Registerpage() {

  const {state,dispatch} = useContext(AuthContext)
    const history = useHistory()
    const [name,setName] = useState("")
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
        console.log("invalid email")
        return
    }
        //Create new user
        // const newUser = {
        //   name:name,
        //   email:email,
        //   password:password
        // }

      // Register

      // register(newUser,res => {
      //   if(res.data){
      //     console.log(res)
      //   }
      //   console.log(res.data.message)
      // })


      fetch("/auth/register",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
        setError(data.error)
       }
       else{
         history.push('/login')
           console.log(data.message)
       }
    }).catch(err=>{
        console.log(err)
    })
}


    return (
        
        <Container className="App border p-3 shadow">

        <h2 className="text-center">Register</h2>
        {error?
        <Alert color="danger">
       {error}
      </Alert>
      :
      ""
      }
        

        <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                id="exampleName"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </FormGroup>
          </Col>

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
          {/* <Col>
            <FormGroup>
              <Label for="examplePassword">Conform Password</Label>
              <Input
                type="password"
                name="password2"
                id="examplePassword2"
                placeholder="********"
              />
            </FormGroup>
          </Col> */}
          <Button className="btn btn-block btn-info" onClick={()=>PostData()}>Register</Button>
        
        <p className="text-center pt-3">
                <Link to="/login">Already have an account ?</Link>
        </p>
        
      </Container>
    
    )
}
