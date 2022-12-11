import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Todoitem from "../components/Todoitem";

const Todo = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token'));
    const [text, setText] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [update,setUpdate] = useState(0);

    const onChange = (e) => {
      setText(e.target.value);
    }

    useEffect(()=> {
      if(!isLogin){
        alert("허가되지 않은 접근입니다 로그인해주세요")
        navigate('../')
      }
      const headers = {
        'Authorization': `Bearer ${isLogin}`
      }
      axios.get('https://pre-onboarding-selection-task.shop/todos',{headers})
      .then((res)=>{
        setTodoList(res.data);
      })
      .catch((error)=> {
        alert(`잘못된 요청입니다 에러 : ${error.response.data.message}`)
      })
    },[isLogin,navigate,update])

    const logout = () => {
      localStorage.clear();
      setIsLogin('')
      navigate('../');
    }

    const createTodo = () => {
      const headers = {
        'Authorization': `Bearer ${isLogin}`,
        'Content-type': 'application/json'
      }
      const body = {
        todo : text
      }
      axios.post('https://pre-onboarding-selection-task.shop/todos',body,{headers})
      .then((res)=>{
        setText('');
        setUpdate(update+1)
      })
      .catch((error)=> {
        alert(`잘못된 요청입니다 에러 : ${error.response.data.message}`)
      })
    }

    return (
      <div>
        <h1>투두 리스트</h1>
        {todoList && todoList.map((item)=>(
          <Todoitem
          key={item.key}
          id={item.id}
          todo={item.todo}
          isCompleted={item.isCompleted}
          userId={item.userId}
          isLogin={isLogin}
          update={update}
          setUpdate={setUpdate}
          />
        ))}

        <div><input onChange={onChange} value={text}></input><button onClick={createTodo}>등록</button></div>
        <button onClick={logout}>로그아웃</button>
      </div>
    );
  };
  
  export default Todo;