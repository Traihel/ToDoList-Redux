import React, {useState} from "react"
import styles from './ToDoList.module.css';
import {BodyList} from "./BoduList/BoduList";
import {Button} from "./Button/Button";
import {NewTitle} from "./NewTitle/NewTitle";
import {v1} from "uuid";

export type ToDoStateType = {
    id: string,
    title: string,
    isDone: boolean
}

type FilterType = 'all' | 'active' | 'completed'

type TodoListType = {
    title: string
}

export const TodoList = (props: TodoListType) => {

    const [toDoState, setToDoState] = useState<Array<ToDoStateType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "TypeScript", isDone: false},
    ])

    const newTitleHandler = (newTitle: string) => {
        let newTitleEl = {id: v1(), title: newTitle, isDone: false}
        setToDoState([newTitleEl, ...toDoState])
    }

    const deleteTitleHandler = (id: string) => setToDoState(toDoState.filter((el: ToDoStateType) => el.id !== id))

    const isDoneTitleHandler = (id: string, newIsDone: boolean) => {
        // let stateTitle = toDoState.find( (u: ToDoStateType) => u.id === id)
        // if (stateTitle) stateTitle.isDone = newIsDone
        // setToDoState([...toDoState])
        setToDoState(toDoState.map( el => el.id === id ? {...el, isDone: newIsDone} : el))
    }

    const [filter, setFilter] = useState<FilterType>('all')

    const filterTitleHandler = (filterItem: FilterType) => setFilter(filterItem)

    const filterAffairs = (filter: FilterType, toDoState: Array<ToDoStateType>) => {
        if (filter === 'active') return toDoState.filter((el: ToDoStateType) => !el.isDone)
        else if (filter === 'completed') return toDoState.filter((el: ToDoStateType) => el.isDone)
        else return toDoState
    }

    const filterState = filterAffairs(filter, toDoState)

    return <div className={styles.item}>
        <h3>{props.title}</h3>
        <div className={styles.newTitle}>
            <NewTitle newTitleCallBack={newTitleHandler}/>
        </div>
        <BodyList
            state={filterState}
            deleteCallBack={deleteTitleHandler}
            isDoneCallBack={isDoneTitleHandler}
        />
        <div className={styles.buttonFilter}>
            <div className={`${filter === 'all' ? styles.activeFilter : ''}`}>
                <Button buttonName={'All'} callBack={() => filterTitleHandler('all')}/>
            </div>
            <div className={`${filter === 'active' ? styles.activeFilter : ''}`}>
                <Button buttonName={'Active'} callBack={() => filterTitleHandler('active')}/>
            </div>
            <div className={`${filter === 'completed' ? styles.activeFilter : ''}`}>
                <Button buttonName={'Completed'} callBack={() => filterTitleHandler('completed')}/>
            </div>



        </div>
    </div>
}