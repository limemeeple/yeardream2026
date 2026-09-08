import PostList from "@/app/board/PostList";
import '../board.css';
import Link from "next/link";

export default function List(){

    return(
       <div>
           <h1>리스트</h1>
           <div className={'btnRigth'}>
               <Link href="/write"><button className={'writeBtn'}>글쓰기</button></Link>
           </div>
           <table>
               <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>조회수</th>
                    </tr>
               </thead>
               <tbody>
                    <PostList/>
               </tbody>
           </table>
       </div>
    )

}