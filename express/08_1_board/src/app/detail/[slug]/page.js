import Link from "next/link";
import PostDetail from "@/app/detail/[slug]/PostDetail";


export default async function DetailPage(props){
    console.log(props);
    const param = await props.params;
    console.log(param);
    let writeNum = param.slug;
    console.log(writeNum);

    return(
        <>
            <div>
                <h1>글쓰기</h1>
            </div>
            <div>
                <PostDetail page={writeNum}/>
            </div>
        </>
    );

}