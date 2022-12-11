import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
      email : '',
      password : ''
    });
    const [emailVali, setEmailVali] = useState('')
    const [passVali,setPassVali] = useState('');
    const [isValiEmail, setIsValiEmail] = useState(false);
    const [isValiPass, setIsValiPass] = useState(false);
    const [submitState, setSubmitState] = useState(false);

    const { email, password } = inputs;

    const onChange = (e) => {
      const { value, name } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    }
    useEffect(()=>{
      if(!inputs.email){
        setEmailVali("이메일을 입력해주세요");
        setIsValiEmail(false);
      }
      else if(!inputs.email.includes("@")){
        setEmailVali("이메일에는 @가 포함되어있어야 합니다")
        setIsValiEmail(false);
      }
      else {
        setEmailVali("통과")
        setIsValiEmail(true);
      }
      if(!inputs.password){
        setPassVali("비밀번호를 입력해주세요");
        setIsValiPass(false);
      }
      else if (inputs.password.length<8){
        setPassVali("비밀번호는 8자 이상입니다")
        setIsValiPass(false);
      }
      else {
        setPassVali("통과")
        setIsValiPass(true);
      }
      if (isValiEmail && isValiPass){
        setSubmitState(true)
      }
      else {
        setSubmitState(false)
      }
      if(localStorage.getItem('token')){
        navigate("/todo")
      }
    },[inputs,isValiEmail,isValiPass,navigate])

    const submitLogin = () => {
      const user = {
        email : inputs.email,
        password : inputs.password
      }
      axios.post('https://pre-onboarding-selection-task.shop/auth/signin', user)
      .then((res)=>{
        alert("로그인 완료! 투두 리스트로 이동합니다");
        localStorage.setItem('token', res.data.access_token);
        navigate("/todo")
      })
      .catch((error)=> {
        alert(`잘못된 요청입니다 에러 : ${error.response.data.message}`)
      })
    } 

    if(localStorage.getItem('token')){
      navigate("/todo")
    }

    return (
      <div>
        <b>로그인</b>
        <br/>
        <input name="email" placeholder="이메일" onChange={onChange} value={email}/>
        <p>{emailVali}</p>
        <input name="password" type="password" placeholder="비밀번호" onChange={onChange} value={password}/>
        <p>{passVali}</p>
        <button disabled={!submitState} onClick={submitLogin}>로그인</button>
        <br/>
        <button onClick={()=>{navigate("./join")}}>회원가입 하러 가기</button>
      </div>
    );
  };
  
  export default Home;