import { useRouter } from "next/router";
import Head from 'next/head'
import prisma from '../../lib/prisma';

import { PrismaClient,Prisma } from '@prisma/client';

import { GetServerSideProps , GetStaticProps} from 'next';
import { GetStaticPaths} from 'next'


type UserTable={feed:[Prisma.user_tableUncheckedCreateInput]}
type Mission = {feed:[Prisma.missionCreateManyInput]}

export default function Mission(feed:Mission){
    const router = useRouter(); 
    const page_id = Number(router.query.id)
    
    const statement = feed.feed[page_id].mission_statement
    return (
      <>
        <Head>
          <title>あいづたんさクイズ</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="headline">あいづたんさクイズ</h1>
        <div>
          <br/>
          <mark>ミッション！</mark>
          <br/>
          <br/>
          <div className="box-text"> 
            {statement}
          </div>
          <br/>
          <br/>
          <a href={`/${router.query.id}/write`} style={{ fontSize: '24px' }} className="btn-circle">答える</a>
        </div>
      </>
    )
}

type PathParams = {
  id: string;
}
// 事前生成するページのパス（URL のパラメータ部分）のリストを返します。

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
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
}

// ページへ初回アクセス時実行する
export const getStaticProps: GetStaticProps = async () => {
    
  //missionの一覧を取得
  const mission = await prisma.mission.findMany();

  return { props: { feed:mission } };
};
