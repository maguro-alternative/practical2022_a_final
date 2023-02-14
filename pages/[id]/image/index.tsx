import axios,{AxiosResponse} from "axios";
import { useRouter } from "next/router"
import Head from 'next/head'

type RES = {
  image_id:String | string,
  permalink_url:String | string,
  thumb_url:String | string,
  url:string,
  type:String | string
}

export default function Images() {  
  const router = useRouter();
  const handleUploadClick = async (e:any) => {

    const { id } = router.query;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('imagedata', file);
    formData.append('access_token', 'BXntZiPXivTJ21IReAgmdq5tJEsJ4Af_IOCzUed4fcA')

    const result = await axios.post(
      "https://upload.gyazo.com/api/upload",
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ).then(async (res: AxiosResponse<RES>) => {
      //const { url, status } = res;
      //やりたいことをやる
      console.log(res.data.url)
      axios.post(
        `../../api/gyazo`,
        {
          mission_id:Number(id),
          answer_text:"",
          answer_image:res.data.url
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      window.location.href = "clear";
    })
    //console.log(result)
  };

  return (
    <>
      <Head>
      <h1 className="headline">あいづたんさクイズ</h1>
      </Head>
      <br/><br/>

      {/*ここにプレビュー用画像挿入*/}
      <image src='' className='box-text' style={{width: '500px', height: '500px',margin: '10px'}}></image>

      <br/><br/>
      <label className="btn-circle" style={{ textAlign: 'center', marginTop: '16px', fontSize: '24px' }} >
        <input
          accept="image/*"
          id="upload-button"
          type="file"
          onChange={handleUploadClick}
          hidden
        />
        送信
      </label>
    </>
  );
};

/*
export default function Images(){
    return(
    <div>
        <form action="../api/gyazo" method="post" encType="multipart/form-data"> 
            <input type="file" name="file"/>
            <input type="submit" name="submit" value="送信する"/>
        </form>
    </div>
    )
}
*/