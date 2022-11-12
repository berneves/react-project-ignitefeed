import { FiTrash, FiCheckCircle, FiCircle } from 'react-icons/fi'
import styles from "./Task.module.css"
import { useState } from 'react';

export interface TaskProps{
  id: string,
  content: string,
  isConcluded: boolean
  onDelete?: (taskId: string) => void
  onComplete?: (taskId: string) => void

}

export function Task({id, content, isConcluded, onDelete, onComplete}: TaskProps) {

   
    return (
        <section className={styles.section}>
            <div>
                <button className = {styles.conclude} onClick = {() => onComplete!(id)}>
                    {isConcluded ? <FiCheckCircle/> : <FiCircle/>}
                </button>
            </div>
            {isConcluded ? 
                <p className = {styles.concluded}>{content}</p> : 
                <p className = {styles.notConcluded}>{content}</p>
            }
            <button title = "deletar comentário" onClick={() => onDelete!(id)}>
                <FiTrash className={styles.trash}/>
            </button>
        </section>
      )
  }