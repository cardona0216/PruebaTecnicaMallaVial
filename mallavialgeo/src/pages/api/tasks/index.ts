// aqui vamos a manejar las rutas 

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req:NextApiRequest,res:NextApiResponse)=> {

   const {method, body} = req;

switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM tasks'
        const response = await conn?.query(query)
        return  res.status(200).json(response?.rows)
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({error: error.message})
         
        } else {
          console.error("An unexpected error occurred", error);
        }
        
      }
      
      
    case 'POST':
      try {
        const {title, description} = body
  
       const query ='INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *'
       const values = [title,description]
  
       const response =  await conn?.query(query, values)
  
      console.log(response);
        
      return  res.status(200).json(response?.rows[0])  
      } catch (error) {
        
      }
    
      
      
    default:
      return res.status(400).json('metodo invalido')
        
   }

};