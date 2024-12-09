import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "task_data"

// SALVARE 
const saveTasks = async(task:any[])=>{
    try {
        const resValue= JSON.stringify(task)
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, resValue)
    } catch (e) {
        console.error(e, "error saving data") 
    }
}

// CARICARE
const loadTasks = async()=>{
    try {
        const resValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY)
        return resValue != null ? JSON.parse(resValue) : [];
    } catch (e) {
        console.error(e, "error loading data")
    }
}

// const clearTask = async()=>{
//     try {
//         await AsyncStorage.removeItem(TASKS_STORAGE_KEY)
//     } catch (e) {
//         console.error(e, "error clearing data")
//     }
// }

export default {saveTasks, loadTasks}