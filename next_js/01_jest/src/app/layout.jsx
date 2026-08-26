export default function Layout({children}){
    return(
        <html>
            <head lang={"ko"}>
                <meta charSet={"UTF-8"}/>
                <title>JEST</title>
            </head>
            <body>
                {children}

            </body>
        </html>
    )
}