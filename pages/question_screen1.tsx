import Head from 'next/head'
import { useRouter } from "next/router"
import prisma from '../lib/prisma'

import { GetServerSideProps, GetStaticProps } from 'next';

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
            <div>

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

            </div>


        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.user_table.findMany();
    //const ex_misstion = await prisma.extra_mission.findMany();
    //console.log(ex_misstion)
    // 更新
    await prisma.user_table.update({
        // idが1のユーザーを
        where: {
            user_id: 1
        },
        // ポイントを100にする
        data: {
            point: 480
        }
    })
    return { props: { feed } };
};