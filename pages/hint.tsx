import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from "next/router"

export default function Hint() {
  const router = useRouter();
  const [hint] = useState(router.query.hint);
  const [point] = useState(router.query.point);
  const [hintPoint] = useState(router.query.hintPoint);

  const backToEventPage = () => {
    router.push({
      pathname: '/event'
    });
  }

  const userPoint = Number(point);
  const needPoint = Number(hintPoint);

  if (userPoint >= needPoint) {
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
          <h5 style={{ marginTop: '16px', textAlign: 'center' }}>ヒント</h5>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="box-text" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '24px', textAlign: 'center' }}>{hint}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn-circle" style={{ marginTop: '16px', fontSize: '24px' }} onClick={backToEventPage}>戻る</button>
          </div>
        </body>
      </>
    )
  }
  else {
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
          <h5 style={{ marginTop: '16px', textAlign: 'center' }}>ヒント</h5>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="box-text" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '24px', textAlign: 'center' }}>このヒントを閲覧するためには合計で{hintPoint}p必要だよ</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn-circle" style={{ marginTop: '16px', fontSize: '24px' }} onClick={backToEventPage}>戻る</button>
          </div>
        </body>
      </>
    )
  }
}

//export default hint