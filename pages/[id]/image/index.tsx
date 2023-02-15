import axios,{AxiosResponse} from "axios";
import { useRouter } from "next/router"
import { useState } from "react";


type RES = {
  image_id:String | string,
  permalink_url:String | string,
  thumb_url:String | string,
  url:string,
  type:String | string
}

export default function Images() {  
  const router = useRouter();
  const [preview, setPreview] = useState('');
  const handleUploadClick = async (e:any) => {

    const { id } = router.query;
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
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
    <div style={{ padding: 20 }}>
      <label htmlFor="upload-button" style={{ border: "1px solid #222", borderRadius: 10, padding: 10, cursor: "pointer" }}>
        <img src={preview} />
        <input
          accept="image/*"
          id="upload-button"
          type="file"
          onChange={handleUploadClick}
          hidden
        />
        Choose file
      </label>
    </div >
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