import { FiTrash, FiCheckCircle, FiCircle } from 'react-icons/fi'
import styles from "./Task.module.css"
import { useState } from 'react';

export interface TaskProps{
  id: string,
  content: string,
  isConcluded: boolean
  onDelete?: (taskId: string) => void
}

export function Task({id, content, isConcluded, onDelete}: TaskProps) {


    const concluded = (isConcluded: Boolean) => {
        if (isConcluded) {
            return (<button className = {styles.conclude}>
                <FiCheckCircle/>
            </button>)
        } else {
            return (<button className = {styles.conclude}>
                <FiCircle/>
            </button>)
        }
    }

    return (
        <section className={styles.section}>
            <div>
                {concluded(isConcluded)}
            </div>
            <p>{content}</p>
            <button title = "deletar comentário" onClick={() => onDelete!(id)}>
                <FiTrash className={styles.trash}/>
            </button>
        </section>
      )
  }