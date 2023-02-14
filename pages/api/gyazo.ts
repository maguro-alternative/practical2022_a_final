import axios,{AxiosResponse} from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(req.body)
    const re = await prisma.mission_answer.create(
        {
          data:{
            mission_id:req.body.mission_id,
            answer_text:"",
            answer_image:req.body.answer_image
          },
        }
      )
    console.log(re)
    res.status(200).json({ name: 'John Doe' })
}
