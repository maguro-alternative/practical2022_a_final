import Head from 'next/head'
import { useRouter } from "next/router"


const bonus_mission = () =>{
  const router = useRouter();

  const moveToAnswerPage = () => {
    router.push({
      pathname: `/answer_bonus_mission`
    });
  }

  const backToEventPage = () => {
    router.push({
      pathname: `/event`
    });
  }

  return (
    <>
      <Head>
        <meta charSet='UTF-8'></meta>
        <title>あいづたんさクイズ</title>
      </Head>

      <body>
        <header>
          <h1 className="headline">あいずたんさクイズ</h1>
        </header>

        <button className='btn-box-white' style={{marginTop: '32px', padding: '16px'}}onClick={moveToAnswerPage}>
          鶴ヶ城内で一番綺麗な花見スポットはどこですか？<br></br>
          100pt
        </button>

        <button className="btn-box" style={{ width: '256px', fontSize: '20px', border: '1px solid black' }} onClick={backToEventPage}>
          イベントページへ戻る
        </button>
      </body>
    </>
  )
}

export default bonus_mission