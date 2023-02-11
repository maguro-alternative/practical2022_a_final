import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import prisma from '../../../lib/prisma';

import { PrismaClient,Prisma } from '@prisma/client';

import { GetStaticProps} from 'next';
import { GetStaticPaths} from 'next'
import { features } from 'process';

type UserTable={feed:[Prisma.user_tableUncheckedCreateInput]}

type PointTable = {
  plus_point:number
}
    
export default function Mission(feed:PointTable){
    const router = useRouter();
    return (
        <>
        <Head>
            <title>あいづたんさクイズ</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <h1 className="headline">あいづたんさクイズ</h1>
        </header>
        <div>
            <br></br>
            <mark>ミッションクリア！</mark>
            <br></br>
            
            {feed.plus_point}pt
            ゲット!

            <br></br>
            <br></br>
            <br></br>
            <br></br>
                <a href="../../event" className="btn-circle" style={{ fontSize: '24px' }}>
                    ホームへ
                </a>
        </div>
   </>

    )
}

type PathParams = {
    id: string;
  }
  // 事前生成するページのパス（URL のパラメータ部分）のリストを返します。
/*export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    // /books/001、/books/002、/books/003 のページを事前生成するには、
    // 次のように paths プロパティの値を設定して返します。
    // 本来は id のリストを外部 API（getBookList など）で取得します。
    return {
      paths: [
        { params: { id: '0' } },
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } },
        //{ params: { id: '4' } },
      ],
      fallback: false  // 上記以外のパスでアクセスした場合は 404 ページにする
    }
}*/

export const getServerSideProps = async (context:any) => {

    const id = Number(context.params.id);

    console.log(id)

    // missionを取得
    let plus_point = await prisma.mission.findMany({
        where: {mission_id: id},
        select:{mission_point:true}
    });
    //user_tableからポイントを取得
    let total_point = await prisma.user_table.findMany({
        where: {user_id: 1},
        select:{point: true}
    });
    console.log(plus_point,total_point);

    // 更新
    const point_count = plus_point[0].mission_point + total_point[0].point
    const count = await prisma.user_table.update({
        // idが1のユーザー
        where:{
          user_id:1
        },
        data:{
          point: point_count
        }
      });

    console.log(count)
 
    return { props: {plus_point:plus_point[0].mission_point} };
    };