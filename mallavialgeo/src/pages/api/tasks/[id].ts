import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest, res:NextApiResponse) =>{
    const {method, query, body} = req
    console.log(query);
    

    switch (method) {
        case 'GET':
         try {
            const text ='SELECT * FROM tasks WHERE id = $1'
            const values = [query.id]
            const result = await conn?.query(text, values)

            if (result?.rows.length === 0) 
                return res.status(400).json({message: 'Tasks not faund'})

          
            return res.status(200).json(result?.rows[0])
         } catch (error: unknown) {
            if (error instanceof Error) {
              return res.status(400).json({error: error.message})
             
            } else {
              console.error("An unexpected error occurred", error);
            }
            
          }
        case 'PUT':
            try {
                const {title,description} = body
                const text ='UPDATE tasks SET title= $1,description = $2 WHERE id = $3 RETURNING *'
                const values = [title,description,query.id]
                const result = await conn?.query(text, values)
                if (result?.rowCount === 0) 
                    return res.status(400).json({message: 'Tasks not faund'})
    
              
                return res.status(200).json(result?.rows[0])
             } catch (error: unknown) {
                if (error instanceof Error) {
                  return res.status(400).json({error: error.message})
                 
                } else {
                  console.error("An unexpected error occurred", error);
                }
                
              }
            return res.status(200).json('Actulizando una tarea')
        case 'DELETE':
            try {
                const text ='DELETE  FROM tasks WHERE id = $1 RETURNING *'
                const values = [query.id]
                const result = await conn?.query(text, values)
                if (result?.rowCount === 0) 
                    return res.status(400).json({message: 'Tasks not faund'})
    
              
                return res.status(200).json(result?.rows[0])
             } catch (error: unknown) {
                if (error instanceof Error) {
                  return res.status(400).json({error: error.message})
                 
                } else {
                  console.error("An unexpected error occurred", error);
                }
                
              }
           
        default:
           return res.status(400).json('metodo no soportado')
    }
}