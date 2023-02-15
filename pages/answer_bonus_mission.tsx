import Head from 'next/head'
import { useRouter } from "next/router"

export default function Answer_bonus_mission() {
  const router = useRouter();

  const backToBonusMissionPage = () => {
    router.push({
      pathname: `/bonus_mission`
    });
  }

  const moveToCompleteSubmitPage = () => {
    router.push({
      pathname: `/submited_bonus_mission`
    });
  }


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

        <br></br>
        <mark>答え</mark>
        <br></br>
        <br></br>
        <input type='text' className="box-text"></input>
        <br></br>
        <br></br>
        <button className="btn-circle" style={{fontSize: '24px'}} onClick={backToBonusMissionPage}>戻る</button>
        &nbsp;
        <button className="btn-circle" style={{fontSize: '24px'}} onClick={moveToCompleteSubmitPage}>送信</button>
      </div>
    </>
  )
}

//export default answer_bonus_mission