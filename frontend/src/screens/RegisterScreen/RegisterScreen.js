import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import "./RegisterScreen.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterScreen = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name,setName] = useState("");
    const [pic,setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [message, setMessage] = useState("");
    const [picMessage, setPicMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const registerHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmpassword){
            setMessage("Password and Confirm Password do not match");
        }else{
            setMessage(null);
            try {
                const config = {
                    headers: {
                        "Content-type" : "application/json",
                    }
                }

                setLoading(true);
                    const { data } = await axios.post('api/users',{
                        name,
                        email,
                        password,
                        pic
                    },config);

                    // console.log(data);
                setLoading(false);
                
                toast.success("Register Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 300
                  });
                
                toast.success("Please Login", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                });

                navigate('/login');
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }   
        }
    }

    const postDetails = (pics) => {
        if(!pics){
            return setPicMessage("Please select an Image");
        }
        setPicMessage(null);

        if(pics.type ==='image/jpeg' || pics.type ==='image/png' || pics.type ==='image/jpg'){
            // create new file
            const data = new FormData();
            // field to provide while uploading pics to cloudinary
            data.append('file', pics);
            data.append('upload_preset','notesApp');
            data.append('cloud_name','dxvibp8qz');
            fetch('https://api.cloudinary.com/v1_1/dxvibp8qz/upload', {
                method: 'post',
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPic(data.url.toString());
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            return setPicMessage('Please select an Image');
        }
    }

    return(
        <MainScreen title='Create your account'>
            <div className="registerContainer">
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading></Loading>}
            {picMessage && (
                    <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}
            <Form onSubmit={registerHandler} className='formStyles'>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        value={name}
                        onChange = {(e) => {setName(e.target.value)}} 
                        placeholder="Ram"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        required
                        type="email"
                        value={email}
                        onChange = {(e) => {setEmail(e.target.value)}}  
                        placeholder="abc@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        value={password}
                        onChange = {(e) => {setPassword(e.target.value)}}  
                        placeholder="*****" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        value={confirmpassword}
                        onChange = {(e) => {setConfirmPassword(e.target.value)}}  
                        placeholder="*****" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPic">
                    <Form.Label>Profile Pic</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={(e) => {postDetails(e.target.files[0])}}/>
                </Form.Group>

                <button type="submit" className='registerButton'>
                    Register
                </button>
            </Form>

                <Row className='py-3'>
                    <Col className='registerCol'>
                    Already have an account?
                    <span className='loginLink'>
                        <Link to='/login'> Login Here</Link>
                    </span>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen;