import {useState} from "react";
import Link from "next/link";
import axios from "axios";

export default function SetMember(){

    const[info, setInfo] = useState({'id':'', 'pw':'', 'chkPw':'', 'name':'', 'phone':''});

    let inputVal = function(e){
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }

    function infoSave(){
        let data = axios.post('http://localhost/member/join', info);

    }

    return(
        <>
            <div>
                <h1>회원가입</h1>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type={'text'} name={'id'} value={info.id} onChange={inputVal}/>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td><input type={password} name={'pw'} value={info.pw} onChange={inputVal}/></td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td><input type={password} name={'chkPw'} value={info.chkPw} onChange={inputVal}/></td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td><input type={'text'} name={'name'} value={info.name} onChange={inputVal}/></td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td><input type={'text'} name={'phone'} value={info.phone} onChange={inputVal}/></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={infoSave}>회원가입</button>
                    <Link href={'/'}><btuoon>돌아가기</btuoon></Link>
                </div>
            </div>
        </>
    )
}