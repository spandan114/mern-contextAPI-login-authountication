import React,{useContext,useState,useEffect} from 'react'
import {
    Container, Col,Alert,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';
  import {Link,useHistory,useParams} from 'react-router-dom'
  import { AuthContext } from '../contexts/AuthContext'

function ResetPassword() {

    const {state,dispatch} = useContext(AuthContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()
    const [error,setError] = useState("")

    const PostData = ()=>{

        fetch("/auth/setnewpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            setError(data.error)
           }
           else{
               setError(data.error)
               history.push('/')
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
              <Label>Enter New Password</Label>
              <Input
                type="password"
                name="password"
                id="examplepassword"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              {/* <span className="text-danger" >Email is required.</span> */}
            </FormGroup>
          </Col>
          <Button className="btn btn-block btn-info" onClick={()=>PostData()}>Submit</Button>
        
      </Container>
    )
}

export default ResetPassword
