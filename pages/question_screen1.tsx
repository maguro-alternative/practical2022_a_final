import Head from 'next/head'
import { useRouter } from "next/router"

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

                <div style={{ margin: '24px' }}>本日の指令！</div>
                <div className='box-text' style={{fontSize: '24px'}}>
                    ミッションをこなし、ヒントを解放して目的地を目指そう！<br />
                    ヒントを解放して情報を得て目的地の写真を撮れ！<br />
                </div>

                <br />

                <button className="btn-circle" style={{ fontSize: '24px' }} onClick={backToEventPage}>次へ</button>

            </body>


        </>
    )
}