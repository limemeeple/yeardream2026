'use client';
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function PostList(){

    const[boardList, setBoardList] = useState();

    let token = sessionStorage.getItem('token');
    console.log(token);


    useEffect(function(){
        axios.get('http://localhost:80/board/list/1', {
            headers:{
                Authorization:token
            }
        }).then(({data}) => {
           console.log(data);
           makeHtml(data.list);
       })
    },[]);

    function makeHtml(list){

        console.log(list);

        let cont = list.map(item => (
                <tr key={item.idx}>
                    <td>{item.idx}</td>
                    <td className={'subject'}><Link href={`/detail/${item.idx}`}>{item.subject}</Link></td>
                    <td>{item.bHit}</td>
                </tr>
            )
        )
        setBoardList(cont);
    }

    return(
        <>
            {boardList}
        </>
    )

}