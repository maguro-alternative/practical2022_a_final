import { resolveHref } from 'next/dist/shared/lib/router/router';
import Head from 'next/head'
import { useRouter } from "next/router"
import { PrismaClient,Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { GetServerSideProps , GetStaticProps} from 'next';

type UserTable={feed:[Prisma.user_tableUncheckedCreateInput]}
type Mission_ans = {gallery:[Prisma.mission_answerUncheckedCreateInput]}
export default function Gyallery(gallery: Mission_ans){
    return(

        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body> 

            <header>
                    <h1 className="headline">あいづたんさクイズ</h1>
                </header>
                <a href="event"><button className="btn-sqer-box1">ホームに戻る</button></a>
                <br />
                <a href="#"><button className="btn-sqer-box2">写真</button></a>
                &nbsp;
                <a href="gallery-screen2"><button className="btn-sqer-box1">回答</button></a>

           

            <br></br>
            {gallery.gallery.map(gyallery => (
                <div key={gyallery.id}>
                    <img
                    alt=''
                    src={gyallery.answer_image}
                    className='box-text' style={{marginTop:'10px',width:'100px',height:'100px'}}></img>
                    
                    <br></br>
                </div>
            ))}
            </body>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const gallery = await prisma.mission_answer.findMany();
    //console.log(gallery)
    return {props: {gallery}}
}

