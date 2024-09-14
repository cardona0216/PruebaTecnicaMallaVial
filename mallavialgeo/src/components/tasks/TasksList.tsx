import { Task } from "@/interfaces/Task"
import { Card } from "semantic-ui-react"
import { useRouter } from "next/router";

interface Props {
    tasks: Task[]
}
function TasksList({tasks}:Props) {
   
    const router = useRouter()
  return (

   <Card.Group itemsPerRow={4}>
        {tasks.map (task => (
            <Card key={task.id} onClick={() => router.push(`/tasks/edit/${task.id}`) }>
                <Card.Content>
                   <Card.Header>{task.title}</Card.Header>
                   {task.created_on && (
                    <Card.Meta>{new Date(task.created_on).toLocaleDateString()}</Card.Meta>
                   )}
                   <Card.Description>{task.description}</Card.Description> 
                </Card.Content>
            </Card>
        ))}
   </Card.Group>


  )
}

export default TasksList

{/* <Table celled>
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>ID</Table.HeaderCell>
    <Table.HeaderCell>Título</Table.HeaderCell>
    <Table.HeaderCell>Fecha de Creación</Table.HeaderCell>
    <Table.HeaderCell>Descripción</Table.HeaderCell>
    <Table.HeaderCell>Acción</Table.HeaderCell>
  </Table.Row>
</Table.Header>

<Table.Body>
  {tasks.map(task => (
    <Table.Row key={task.id}>
      <Table.Cell>{task.id}</Table.Cell>
      <Table.Cell>{task.title}</Table.Cell>
      <Table.Cell>{task.created_on ? new Date(task.created_on).toLocaleDateString() : 'N/A'}</Table.Cell>
      <Table.Cell>{task.description}</Table.Cell>
      <Table.Cell>
        <Button onClick={() => router.push(`/tasks/edit/${task.id}`)}>Editar</Button>
      </Table.Cell>
    </Table.Row>
  ))}
</Table.Body>
</Table> */}
