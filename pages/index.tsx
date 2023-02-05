import Head from 'next/head'
import { useRouter } from "next/router"
import prisma from '../lib/prisma'

import { PrismaClient, Prisma } from '@prisma/client';

import { GetServerSideProps, GetStaticProps } from 'next';

type UserTable = { feed: [Prisma.user_tableCreateInput] }

export default function Home() {
    // ここに処理
    const router = useRouter();
    const backToEventPage = () => {
        router.push({
            pathname: '/question_screen1'
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

                <div style={{margin: '16px'}}></div>
                <div>あなたは</div>
                <div>「あかべこ」</div>
                <div>チームです！</div>
                <div style={{marginBottom: '16px'}}></div>

                <button className="btn-circle" style={{ fontSize: '24px' }} onClick={backToEventPage}>次へ</button>

            </body>


        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
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
            point: 0
        }
    })
    return { props: { feed } };
};