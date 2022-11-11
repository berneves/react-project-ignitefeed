import styles from "./FullTask.module.css"
import clipboard from './assets/clipboard.svg';
import { ChangeEvent, useState, FormEvent } from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';
import { TaskProps } from "./Task"
import { Task } from "./Task"



// export interface Tasks {
//     tasks: TaskProps[];
// }

export function FullTask() {
    const [tasks, setTasks] =  useState<TaskProps[]>([])
    const [newContent,setNewContent] = useState("")
    const completedTasks = tasks.filter((task) => task.isConcluded).length


    const handleCreateNewTask= (event: FormEvent) => {
        event.preventDefault()

        setTasks([...tasks, {
            id: uuidv4(),
            content: newContent,
            isConcluded: false
        }]);
        setNewContent("")        
    }

    const handleSetNewTask= (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(event.target.value);
    }


    const hasTasks = (tasks: TaskProps[]) => {
        if (tasks.length === 0) {
            return (
                <article className={styles.noTasks}>
                    <div className={styles.tasksContainer}>
                        <img src={clipboard} alt='clipboard' />
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                </article>
            )
        }
            return (
                <article className={styles.yesTasks}>
                    {tasks.map(task => {
                        return <Task 
                        key = {task.id}
                        id = {task.id}
                        content = {task.content}
                        isConcluded = {task.isConcluded}
                        onDelete = {onDelete}
                        onComplete = {onComplete}
                         />
                    })}
                </article>
        )
    }
    const onComplete = (id: string) => {
       const newTasks =  tasks.map(task => {
            if (task.id === id){
                return {
                    ...task, isConcluded: !task.isConcluded
                };

            }
            return task
        });
        setTasks(newTasks)
    }


    const onDelete = (id: string) => {
        const newTasks = tasks.filter(t => t.id !== id);
        setTasks(newTasks);
    }
    return (
        <div> 
            <form className={styles.form} onSubmit = {handleCreateNewTask}>
                <textarea 
                placeholder = "Adicione uma nova tarefa"
                required
                onChange = {handleSetNewTask}
                value = {newContent}
                />
                <footer>
                    <button type = "submit" >Criar <AiOutlinePlusCircle size = {20}/> </button>
                </footer>
            </form>
            <div className={styles.headerInfo}> 
                <p className={styles.created}> Tarefas criadas <span>{tasks.length}</span></p>
                <p className={styles.concluded}> Concluídas <span>{completedTasks} de {tasks.length}</span>
                </p>
            </div>
            <section>
                {hasTasks(tasks)}
            </section>  
        </div>
      )
  }