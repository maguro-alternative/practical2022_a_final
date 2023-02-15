import { resolveHref } from 'next/dist/shared/lib/router/router';
import Head from 'next/head'
import { useRouter } from "next/router"
import { PrismaClient,Prisma } from '@prisma/client';

import { GetServerSideProps , GetStaticProps} from 'next';

type UserTable={feed:[Prisma.user_tableUncheckedCreateInput]}


export default function Home() {
    // ここに処理
    const router = useRouter();
    const backToEventPage = () => {
        router.push({
            pathname: '/event'
        });
    }
    // returnでhtmlの要素を返す
    return (
        <>

            <Head>
                <meta charSet='UTF-8'></meta>
                <title>あいづたんさクイズ</title>
            </Head>
            <body>

                <header>
                    <h1 className="headline">あいづたんさクイズ</h1>
                </header>
                <button className="btn-box" style={{ fontSize: '20px' }} onClick={backToEventPage}>ホームに戻る</button>
                <br />
                <a href="#"><button className="btn-sqer-box2">写真</button></a>
                &nbsp;
                <a href="gallery-screen1"><button className="btn-sqer-box1">回答</button></a>
                

                <div style={{ margin: '24px' }}>ギャラリー</div>
                <div className='box-text' style={{fontSize: '10px'}}></div>
                &nbsp;
                <div className='box-text' style={{fontSize: '10px'}}></div>
                <br />

                <div className='box-text' style={{fontSize: '10px'}}></div>
                &nbsp;
                <div className='box-text' style={{fontSize: '10px'}}></div>
                <br />

                <div className='box-text' style={{fontSize: '10px'}}></div>
                &nbsp;
                <div className='box-text' style={{fontSize: '10px'}}></div>
                <br />

                <div className='box-text' style={{fontSize: '10px'}}></div>
                &nbsp;
                <div className='box-text' style={{fontSize: '10px'}}></div>
                <br />

                
            </body>


        </>
    )
}