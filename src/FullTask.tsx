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
    const [count, setCount] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(Number)
    const [tasks, setTasks] =  useState<TaskProps[]>([])
    const [newContent,setNewContent] = useState("")


    const handleCreateNewTask= (event: FormEvent) => {
        event.preventDefault()

        setTasks([...tasks, {
            id: uuidv4(),
            content: newContent,
            isConcluded: false
        }]);

        setCount(count + 1);
        setNewContent("");
    }
    const handleSetNewTask= (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(event.target.value);
    }

    function handleCompletedTasks() {
        let count = 0;
        tasks.filter(task => {
          if (task.isConcluded === true) {
            count++;
          }
        })
        setCompletedTasks(count)
      };

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
                         />
                    })}
                </article>
        )
    }
    const handleToggleApproval = (id: string) => {
        const oldTasks = tasks;
        const findIndex = oldTasks.findIndex(t => t.id === id);
        if(findIndex < 0) return null ;
        oldTasks[findIndex].isConcluded = !oldTasks[findIndex].isConcluded
        setTasks(oldTasks);
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
                />
                <footer>
                    <button type = "submit" >Criar <AiOutlinePlusCircle size = {20}/> </button>
                </footer>
            </form>
            <div className={styles.headerInfo}> 
                <p className={styles.created}> Tarefas criadas <span>{count}</span></p>
                <p className={styles.concluded}> Concluídas <span>{completedTasks} de {count}</span>
                </p>
            </div>
            <section>
                {hasTasks(tasks)}
            </section>  
        </div>
      )
  }