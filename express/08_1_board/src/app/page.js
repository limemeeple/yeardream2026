'use client'
import './board.css';
import {useEffect, useState} from "react";
import axios from "axios";
export default function App(){

    const[login, setLogin] = useState({'id':'', 'pw':''});

    const inputVal = function(e){
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        });
    }

    useEffect(function(){

        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');

    },[])

    let chkMember = async function(){
        let {data} = await axios.post('http://localhost/member/login', login);

        console.log(data);

        if(data.token != ''){
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('token', data.token);

            alert(data.id+"님 환영합니다!");
            location.href = '/board';
        }else{
            alert('아이디 또는 패스워드를 확인하세요!');
            return false;
        }

    }

    return(
        <div>
            <h1>로그인</h1>
            <table className={'loginTable'}>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td><input type={"text"} name={'id'} value={login.id} onChange={inputVal}/></td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td><input type={"password"} name={'pw'} value={login.pw} onChange={inputVal}/></td>
                    </tr>
                </tbody>
            </table>
            <div className={'btnCenter'}>
                <button onClick={chkMember}>로그인</button>
                <button>회원가입</button>
            </div>
        </div>

    )
}