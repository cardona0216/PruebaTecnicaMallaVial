// import { getServerSideProps } from "next/dist/build/templates/pages"

import { Task } from "@/interfaces/Task";
import { Grid, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import TasksList from "@/components/tasks/TasksList";
import Layout from "@/components/tasks/Layout";

interface Props {
  tasks: Task[]
}

export default function Index({tasks}:Props){
 const router = useRouter()
 
  
  return (

   <Layout>
     {tasks.length === 0 ? (
      <Grid columns={3} centered verticalAlign="middle" style={{height:"70%"}}>
        <Grid.Row>
          <Grid.Column>
            <h1>No hay tareas aun</h1>
            <Button onClick={() => router.push("/tasks/new")}>Crea una tarea</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <TasksList tasks ={tasks}/>
    )}
   </Layout>
  )
}

 export const getServerSideProps = async() => {
const res =  await fetch('http://localhost:3000/api/tasks')
const tasks = await res.json()
console.log(tasks);

  return {
    props:{
      tasks:tasks
    }
  }
 }