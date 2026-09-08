'use client';
import '@/app/board.css'
import {useState} from "react";
import Link from "next/link";
import axios from "axios";
export default function WritePage(){

    let token = sessionStorage.getItem('token');

    const[write, setWrite] = useState({'subject':'', 'user_name':'user', 'content':''});

    const inputVal = function(e){
        setWrite({
            ...write,
            [e.target.name]:e.target.value
        })
    }

    const save = async function(){

        let title = write.subject;
        let user = write.user_name;
        let content = write.content;

        console.log(title, user, content);

        if(title == ''){
            alert("제목을 작성해 주세요.");
            return false;
        }

        if(user == ''){
            alert("작성자가 없습니다.");
            return false;
        }

        if(content == ''){
            alert("내용을 작성해 주세요.");
            return false;
        }

        let {data} = await axios.post('http://localhost:80/board/write',write, {headers: {
                Authorization: token
            }
        });
        console.log(data);

        if(!data.success){
            alert("저장에 실패하였습니다.");
            return false;
        }else{
            alert("저장에 성공하였습니다.");
            location.href='/';
        }

    }

    return(
        <>
            <div>
                <h1>글쓰기</h1>
                <table className={'writeTable'}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type={'text'} name={'subject'} value={write.subject} onChange={inputVal}/>
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type={'text'} name={'user_name'} value={write.user_name} onChange={inputVal} readOnly={true}/>
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name={'content'} value={write.content} onChange={inputVal}>

                                </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={'btnCenter'}>
                <button onClick={save}>저장</button>
                <Link href={'/'}><button>돌아가기</button></Link>
            </div>
        </>
    )
}