import Head from 'next/head'
import { useRouter } from "next/router";
import prisma from '../lib/prisma'

import { PrismaClient, Prisma } from '@prisma/client';

import { GetServerSideProps, GetStaticProps } from 'next';

type UserTable = { feed: [Prisma.user_tableCreateInput] }

export default function Submited_bonus_mission (feed: UserTable){
  const router = useRouter();

  const BackToEventPage = () => {
    router.push({
      pathname: `/event`
    });
  }


  return (
    <>
      <Head>
        <title>あいづたんさクイズ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <body>
        <header>
          <h1 className="headline">あいずたんさクイズ</h1>
        </header>
        <br></br>
        <mark>ミッションクリア！</mark>
        <br></br>
        100pt
        ゲット!
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button className="btn-circle" style={{fontSize: '24px'}} onClick={BackToEventPage}>
          ホームへ
        </button>
      </body>
    </>
  )
}


//export default submited_bonus_mission


export const getStaticProps: GetStaticProps = async () => {
  // // 作成
  // const cre = await prisma.user_table.create({
  //   data:{
  //     team_name:'beko',
  //     point:0
  //   }
  // });
  // user_tableの一覧を取得
  const feed = await prisma.user_table.findMany();
  console.log(feed)
  //user_tableからポイントを取得
  let user_point = await prisma.user_table.findMany({
    where: {user_id: 1},
    select:{point: true}
  });
  const total_point = user_point[0].point + 100;
  // 更新
  await prisma.user_table.update({
    // idが1のユーザーを
    where:{
      user_id:1
    },
    // ポイントを100にする
    data:{
      point:total_point
    }
  })
  return { props: { feed } };
};