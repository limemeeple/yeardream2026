'use client';
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import '@/app/board.css'

export default function PostDetail({page}){
    console.log('page', page);
    let token = sessionStorage.getItem('token');

    const[detail, setDetail] = useState();

    let del = async function(){

        const delConfirm = window.confirm('정말 삭제하시겠습니까?');

        if(delConfirm) {
            let {data} = await axios.get('http://localhost/board/delete/' + page, {headers: {
                    Authorization: token
                }
            });

            console.log(data);

            if (data.success) {
                alert('삭제 되었습니다.');
                location.href = '/';
            } else {
                alert('삭제에 실패하였습니다.');
                return false;
            }
        }
    }

    useEffect(() => {
        axios.get('http://localhost/board/detail/' + page,{headers: {
                Authorization: token
            }
        }).then(({data}) => {

            console.log(data);

            console.log(data.post.content);

            let item = data.post;
            console.log(item);

            let datailData;

            if(data.success){
                datailData =(
                            <>
                                <tr>
                                     <th>제목</th>
                                     <td>{item.subject}</td>
                                </tr>
                                <tr>
                                     <th>작성자</th>
                                     <td>{item.user_name}</td>
                                </tr>
                                <tr>
                                     <th>내용</th>
                                     <td className={'textarea'}>{item.content}</td>
                                </tr>
                            </>);
            }else{
                alert('잘못된 접근입니다.');
                location.href='/';
            }

            setDetail(datailData);
        })
    }, []);



    return(
        <>
            <table className={'detailTable'}>
                <tbody>
                    {detail}
                </tbody>
            </table>
            <div className={'btnCenter'}>
                <button onClick={del}>삭제하기</button>
                <Link href={'/'}><button>돌아가기</button></Link>
            </div>
        </>
    )
}