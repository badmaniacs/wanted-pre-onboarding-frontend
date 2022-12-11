import { useState } from "react";
import axios from "axios";

const Todoitem = ({id, todo, isCompleted, userId, isLogin,update,setUpdate,setTodoList,todoList}) => {
    const [text,setText] = useState(todo)
    const [isChecked, setIsChecked] = useState(isCompleted);
    const [displayToggle, setDisplayToggle] = useState(true);

    const edit = (e) => {
        setText(e.target.value)
    }

    const toggle = () =>{
        setDisplayToggle(!displayToggle)
    }

    const checking =  (e) => {
        const body = {
        todo : text,
        isCompleted : !isChecked
    }
        const headers =  {
        'Authorization': `Bearer ${isLogin}`,
        'Content-type': 'application/json'
    }
        axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`,body,{headers})
        .then((res)=>{
            setIsChecked(res.data.isCompleted)
    })
    }

    const updateTodo = () => {
        const headers = {
            'Authorization': `Bearer ${isLogin}`,
            'Content-type': 'application/json'
        }
        const body = {
            todo : text,
            isCompleted : isChecked
        }
        axios.put(`https://pre-onboarding-selection-task.shop/todos/${id}`,body,{headers})
        .then((res)=>{
            setUpdate(update+1);
            toggle();
        })
        .catch((error)=>{
            alert(`잘못된 요청입니다 에러 : ${error.response.data.message}`)
        })
    }

    const deleteTodo = () => {
        const headers =  {
            'Authorization': `Bearer ${isLogin}`,
        }
        axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`,{headers})
        .then((res)=>{
            setTodoList(todoList.filter((item)=> item.id !==id))
        })
        .catch((error)=>{
            alert(`잘못된 요청입니다 에러 : ${error.response.data.message}`)
        })
    }

    const pstyle = {
        textDecoration : isChecked && 'line-through',
        display : !displayToggle && 'none'
    }

    const normalStyle = {
        display : !displayToggle && 'none'
    }
    const hideStyle = {
        display : displayToggle && 'none'
    }

    return (
    <div>
        <p>
            <input type="checkbox" onChange={checking} checked={isChecked}/>
            <b style={pstyle}>{todo}</b>
            <input style={hideStyle} onChange={edit} value={text}/>
            <button style={hideStyle} onClick={updateTodo}>제출</button>
            <button style={hideStyle} onClick={toggle}>취소</button>
            <button style={normalStyle} onClick={toggle}>수정</button>
            <button style={normalStyle}onClick={deleteTodo}>삭제</button>
        </p>
    </div>
    )
}

export default Todoitem;