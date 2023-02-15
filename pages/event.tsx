import Head from 'next/head'
import dynamic from 'next/dynamic'
import Modal from 'react-modal'
import { useState } from 'react'
import { useRouter } from "next/router"
import prisma from '../lib/prisma'

import { PrismaClient, Prisma } from '@prisma/client';

import { GetServerSideProps, GetStaticProps } from 'next';

type UserTable = { feed: [Prisma.user_tableCreateInput] }


// スタイリング
const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.3)"
    },

    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '500px',
        height: '300px',
        transform: 'translate(-50%, -50%)'
    }
} as const;

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

export default function Event(feed: UserTable){
    const [modalIsOpen, setIsOpen] = useState(false)

    // モーダルを開く処理
    const openModal = () => {
        setIsOpen(true)
    }

    const afterOpenModal = () => {
        // モーダルが開いた後の処理
    }

    // モーダルを閉じる処理
    const closeModal = () => {
        setIsOpen(false)
    }

    const clues = ["会津藩", "犬と兵士の銅像", "悲劇の少年隊", "白虎隊記念館"];

    const router = useRouter();

    const moveToHint0 = () => {
        router.push({
            pathname: `/hint`,
            query: { hint: clues[0], point: feed.feed[0].point, hintPoint: 5 }
        });
    }

    const moveToHint1 = () => {
        router.push({
            pathname: `/hint`,
            query: { hint: clues[1], point: feed.feed[0].point, hintPoint: 100 }
        });
    }

    const moveToHint2 = () => {
        router.push({
            pathname: `/hint`,
            query: { hint: clues[2], point: feed.feed[0].point, hintPoint: 200 }
        });
    }

    const moveToHint3 = () => {
        router.push({
            pathname: `/hint`,
            query: { hint: clues[3], point: feed.feed[0].point, hintPoint: 300 }
        });
    }

    const moveToMission = () => {
        router.push({
            pathname: `/mission`
        });
    }

    // onClickでbonus_missionに遷移する
    const moveToBonusMission = () => {
        router.push(
            {
                pathname:`/bonus_mission`
            }
        )
    }

    // 日本時間の時刻を取得(タイムゾーンの差を吸収)
    const japanStandardTime = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    // 何時か取得
    const hour = new Date(japanStandardTime).getHours();
    //console.log(hour)

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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '32px', marginLeft: '32px', fontSize: '20px' }}>あかべこチーム</div>
                    <button className="btn-box" style={{ marginTop: '28px', marginRight: '32px', width: '128px', height: '32px', fontSize: '20px', border: '1px solid black' }} onClick={openModal}>今日の指令</button>
                    <Modal
                        // isOpenがtrueならモダールが起動する
                        isOpen={modalIsOpen}
                        // モーダルが開いた後の処理を定義
                        onAfterOpen={afterOpenModal}
                        // モーダルを閉じる処理を定義
                        onRequestClose={closeModal}
                        // スタイリングを定義
                        style={customStyles}
                    >
                        <h3 style={{ textAlign: 'center', color: 'black' }}>今日の指令</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="box-text">
                                <p style={{ textAlign: 'center', color: 'black', fontSize: '24px' }}>
                                    ミッションをこなし<br />
                                    ヒントを解放して<br />
                                    目的地を目指そう！<br />
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="btn-box" style={{ textAlign: 'center', marginTop: '16px', fontSize: '24px' }} onClick={closeModal}>閉じる</button>
                        </div>
                    </Modal>
                </div>

                <p style={{ marginLeft: '32px', fontSize: '24px' }}>現在のポイントは...</p>
                <h3 style={{ textAlign: 'center' }}>{feed.feed[0].point}p</h3>
                <div style={{ textAlign: 'center' }}>
                    <button className="btn-box" style={{ width: '256px', fontSize: '20px', border: '1px solid black' }} onClick={moveToMission}>ミッションをチェック</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <a href='gallery' style={{ width: '256px', fontSize: '20px', border: '1px solid black' }} >
                        ギャラリー
                    </a>
                </div>
                {/*三項関数で条件分岐*/}
                {((10<=hour && hour<12) || (14<=hour && hour<16)) ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                        <p className="box-text" style={{ textAlign: 'center', fontSize: '24px' }} onClick={moveToBonusMission}>ボーナスミッション</p>
                    </div>
                </div>:<></>
                }
                <h5 style={{ textAlign: 'center' }}>↓ヒントを解放しよう↓</h5>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="box-text" style={{ marginTop: '16px', marginBottom: '16px' }} onClick={moveToHint0}>
                        <p style={{ textAlign: 'center' }}>5p</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="box-text" style={{ marginTop: '16px', marginBottom: '16px' }} onClick={moveToHint1}>
                        <p style={{ textAlign: 'center' }}>100p</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="box-text" style={{ marginTop: '16px', marginBottom: '16px' }} onClick={moveToHint2}>
                        <p style={{ textAlign: 'center' }}>200p</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="box-text" style={{ marginTop: '16px', marginBottom: '16px' }} onClick={moveToHint3}>
                        <p style={{ textAlign: 'center' }}>300p</p>
                    </div>
                </div>
            </div>
        </>
    )
}

//export default event


export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.user_table.findMany();
    //const ex_misstion = await prisma.extra_mission.findMany();
    //console.log(ex_misstion)
    // 更新
    // await prisma.user_table.update({
    //     // idが1のユーザーを
    //     where: {
    //         user_id: 1
    //     },
    //     // ポイントを100にする
    //     data: {
    //         point: 100
    //     }
    // })
    return { props: { feed } };
};