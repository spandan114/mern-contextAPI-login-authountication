import React,{useContext,useState,useEffect} from 'react'
import {
    Container, Col,Alert,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory} from 'react-router-dom'
  import { AuthContext } from '../contexts/AuthContext'

function Forhotpassword() {

    const {state,dispatch} = useContext(AuthContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    const PostData = ()=>{

        fetch("/auth/forgotpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            setError(data.error)
           }
           else{
               setError(data.error)
            //    history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })

    }

    return (
        <Container className="App border p-3 shadow ">
            
        <h2 className="text-center">Reset Password</h2>

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
          <Button className="btn btn-block btn-info" onClick={()=>PostData()}>Submit</Button>
        
      </Container>
    )
}

export default Forhotpassword
