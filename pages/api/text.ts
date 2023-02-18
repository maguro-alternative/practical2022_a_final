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
    console.log(req.body.mission_id)
    const re = await prisma.mission_answer.create(
        {
          data:{
            mission_id:Number(req.body.mission_id),
            answer_text:req.body.answer,
            answer_image:""
          },
        }
      )
    console.log(re)
    res.redirect(302,`../${Number(req.body.mission_id)}/clear`)
}