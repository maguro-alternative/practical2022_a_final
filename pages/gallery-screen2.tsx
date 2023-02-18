import { resolveHref } from 'next/dist/shared/lib/router/router';
import Head from 'next/head'
import { useRouter } from "next/router"
import { PrismaClient,Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { GetServerSideProps , GetStaticProps} from 'next';

type UserTable={feed:[Prisma.user_tableUncheckedCreateInput]}
type Mission_ans = {gallery:[Prisma.mission_answerUncheckedCreateInput]}

export default function Gyallery(gallery: Mission_ans){
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
                <a href="event"><button className="btn-box" style={{width:'50%'}}>ホームに戻る</button></a>
                <br />
                
                <a href="gallery-screen1"><button className="btn-sqer-box1">写真</button></a>
                &nbsp;
                <a href="#"><button className="btn-sqer-box2">回答</button></a>

                
                <div style={{ margin: '24px' }}>ギャラリー</div>
                {gallery.gallery.map(gyallery => (
                <div key={gyallery.id}>
                    <p className='box-text' style={{margin:'24px auto',fontSize:'20px'}}
                    >{gyallery.answer_text}
                    </p>

                    </div>
                    ))}
                
            </div>



        </>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    const gallery = await prisma.mission_answer.findMany();
    //console.log(gallery)
    return {props: {gallery}}
}
