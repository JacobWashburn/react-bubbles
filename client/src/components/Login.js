import React, {useState} from "react";
import styled from 'styled-components';

import {axiosWithAuth} from '../Utils/axiosWithAuth';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  height: 60%;

`;
const PageTitle = styled.h1`
  width: 100%;
`;
const Form = styled.form`
  width: 40%;
  border: 1px solid green;
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 65%;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  font-size: 1.3rem;
  width: 65%;
`;
const Button = styled.button`
  background-color: lightgrey;
  width: 26%;
  margin: 0 auto;
`;

const Login = props => {
    const [creds, setCreds] = useState({
        username: '',
        password: ''
    });
    console.log('creds', creds);

    const handleChange = e => {
        setCreds({...creds, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', creds)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.payload);
                setCreds({
                    username: '',
                    password: ''
                });
                props.history.push('/bubbles');
            })
            .catch(error => {
                console.log(error.message);
            });
    };


    return (
        <LoginWrapper>
            <PageTitle>Please Login</PageTitle>
            <Form onSubmit={e => handleSubmit(e)}>
                <Label>Username:
                    <Input
                        type='text'
                        name='username'
                        onChange={e => handleChange(e)}
                        value={creds.username}
                    />
                </Label>
                <Label>Password:
                    <Input
                        type='password'
                        name='password'
                        onChange={e => handleChange(e)}
                        value={creds.password}
                    />
                </Label>
                <Button type='submit'>Login</Button>
            </Form>
        </LoginWrapper>
    );
};

export default Login;
