

import { Task } from "@/interfaces/Task";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import  {Button, Card, Form, Grid, Icon ,Confirm } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "@/components/tasks/Layout";

export default function NewPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [task,setTask] = useState({
    title: '',
    description: ''
  })
  const handleChange = ({
    target:{name, value},
  }:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask ({...task, [name]:value});

  const updateTasks = async (id: string, task: Task) => {
    await fetch('http://localhost:3000/api/tasks/' + id, {
      method: 'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(task)
    })
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()

    try {
      if(typeof router.query.id  === 'string'){
       updateTasks(router.query.id, task)
        
      }else{
        await  createTask(task)
        
      }
      router.push('/')
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const handleDelete = async (id:string) => {
    // Aquí puedes agregar la lógica para eliminar la tarea de la base de datos

    try {
      await fetch('http://localhost:3000/api/tasks/' + id, {
         method:'DELETE'
       })
      router.push('/')
    } catch (error) {
      
    }
    
    
    
    setOpen(false); // Cierra el cuadro de confirmación
  };

  const loadTasks = async (id: string) => {
   const res =  await fetch('http://localhost:3000/api/tasks/' + id)
   const task = await res.json()
   setTask({title:task.title, description: task.description})
   
  }

  const createTask = async (task:Task) => {
    await fetch('http://localhost:3000/api/tasks', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(task)
    })
  }

useEffect(() => {
  if (typeof router.query.id === 'string') loadTasks(router.query.id);
  
}, [router.query])

  return (
    <Layout>
      <Grid centered columns={3} verticalAlign="middle" style={{height:'70%'}}>
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Titulo:</label>
                  <input type="text" placeholder=" escribe tu tareas" name="title" onChange={handleChange}
                    value={task.title}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Descripcion:</label>
                <textarea value={task.description} name="description" rows={2} placeholder="escribe tu descripcion de tarea"
                onChange={handleChange}
                ></textarea>
                </Form.Field>
              {
                router.query.id ? (
                  <Button color="teal">
                  <Icon name="save"/>
                  Update
                </Button>
                ):(
                  <Button primary>
                  <Icon name="save"/>
                  Save
                </Button>
                )
              }
              </Form>
            </Card.Content>
          </Card>
       { router.query.id  && (
          <Button color="red" onClick={() => setOpen(true)}>
          Eliminar tarea
        </Button>
        )
       }
        </Grid.Column>
      </Grid>
  
          <Confirm
            header='borrar tarea'
            content={`Estas seguro de eliminar esta tarea ${router.query.id}?`}
            open={open}
            onCancel={() => setOpen(false)}
            onConfirm={() =>typeof router.query.id === 'string' && handleDelete(router.query.id)}

          />

     
    </Layout>
  )
}
