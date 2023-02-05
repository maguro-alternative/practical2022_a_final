import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import prisma from '../../../lib/prisma';

import { PrismaClient,Prisma } from '@prisma/client';

import { GetServerSideProps , GetStaticProps} from 'next';

type UserTable={feed:[Prisma.user_tableUncheckedCreateInput]}

export default function Mission(feed:any){
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
        <body>
            <br></br>
            <mark>答え</mark>
            <br></br>
            <br></br>
                <input type='text' className="box-text"></input>
            <br></br>
            <br></br>
                <a href={`/${router.query.id}`} style={{ fontSize: '24px' }} className="btn-circle">戻る</a>
            &nbsp;
                <a href={`/${router.query.id}/clear`} style={{ fontSize: '24px' }} className="btn-circle">送信</a>
        </body>
    </>
    )
}