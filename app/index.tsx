import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import storage from "./utils/storage";

import ListElement from "./components/ListElement";
import TaskModal from "./components/TaskModal";

interface Task {
    id: number | string;
    title: string;
    category: string;
    completed: boolean;
}

export default function Index() {
    // STATE
    const [dataTest, setDataTest] = useState<Task[]>([]);
    const [filter, setFilter] = useState<
        "all" | "people" | "environment" | "completed" | "incomplete"
    >("all");

    // FUNZIONE PER CARICARE I TASK
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await storage.loadTasks();
            setDataTest(res);
        };
        fetchTasks();
    }, []);

    // FUNZIONE PER SALVARE I TASK
    useEffect(() => {
        storage.saveTasks(dataTest);
    }, [dataTest]);

    // AGGIUNGERE UNA TASK
    const addTask = (newTask: any) => {
        setDataTest((prevTask) => [
            { id: Date.now(), ...newTask, completed: false },
            ...prevTask,
        ]);
    };

    // CAMBIARE LO STATO DI UNA TASK
    const handleChangeCompleted = (id: number | string) => {
        setDataTest((prevTask) =>
            prevTask.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // CANCELLARE UNA TASK
    const deleteTask = (id: number | string) => {
        setDataTest((prevTask) => prevTask.filter((task) => task.id !== id));
    };

    // FRILTRI PER LE TASK
    const filteredData = dataTest.filter((task) => {
        if (filter === "all") return true;
        if (filter === "people") return task.category === "people";
        if (filter === "environment") return task.category === "environment";
        if (filter === "completed") return task.completed;
        if (filter === "incomplete") return !task.completed;
        return true;
    });

    // COUNTER
    const countCategory = (category: string) =>
        dataTest.filter((task) => task.category === category).length;

    const countCompleted = () =>
        dataTest.filter((task) => task.completed).length;

    const countIncomplete = () =>
        dataTest.filter((task) => !task.completed).length;

    return (
        <SafeAreaView className="flex-1 bg-slate-100 px-4 pt-10">
            <Text className="text-2xl font-bold text-blue-600 text-center mb-5">
                Task for Good
            </Text>

            {/* ZONA FILTRI */}
            <View className="flex-row items-center justify-center gap-3 m-auto mb-3 flex-wrap">
                {/* ALL */}
                <TouchableOpacity
                    accessibilityLabel="View all tasks"
                    accessibilityRole="button"
                    focusable
                    onPress={() => setFilter("all")}
                    className={`shadow px-4 py-2 rounded-md ${
                        filter === "all" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <Text className="font-semibold text-lg">
                        All ({dataTest.length})
                    </Text>
                </TouchableOpacity>

                {/* PEOPLE */}
                <TouchableOpacity
                    accessibilityLabel="View people's tasks"
                    accessibilityRole="button"
                    focusable
                    onPress={() => setFilter("people")}
                    className={`shadow px-4 py-2 rounded-md ${
                        filter === "people" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <Text className="font-semibold text-lg">
                        People ({countCategory("people")})
                    </Text>
                </TouchableOpacity>

                {/* ENVIRONMENT */}
                <TouchableOpacity
                    accessibilityLabel="View environment tasks"
                    accessibilityRole="button"
                    focusable
                    onPress={() => setFilter("environment")}
                    className={`shadow px-4 py-2 rounded-md ${
                        filter === "environment" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <Text className="font-semibold text-lg">
                        Environment ({countCategory("environment")})
                    </Text>
                </TouchableOpacity>

                {/* COMPLETE */}
                <TouchableOpacity
                    accessibilityLabel="View completed tasks"
                    accessibilityRole="button"
                    focusable
                    onPress={() => setFilter("completed")}
                    className={`shadow px-4 py-2 rounded-md ${
                        filter === "completed" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <Text className="font-semibold text-lg">
                        Completed ({countCompleted()})
                    </Text>
                </TouchableOpacity>

                {/* INCOMPLETE */}
                <TouchableOpacity
                    accessibilityLabel="View incomplete tasks"
                    accessibilityRole="button"
                    focusable
                    onPress={() => setFilter("incomplete")}
                    className={`shadow px-4 py-2 rounded-md ${
                        filter === "incomplete" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                    <Text className="font-semibold text-lg">
                        Incomplete ({countIncomplete()})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* LISTA DELLE TASK */}
            <View className="mt-6 bg-white rounded-lg shadow-md p-4 flex-1 mb-24"
                accessible accessibilityLabel="List of tasks">
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListElement
                            id={item.id}
                            title={item.title}
                            category={item.category}
                            completed={item.completed}
                            onPress={handleChangeCompleted}
                            onDelete={deleteTask}
                        />
                    )}
                />
            </View>

            {/* MODAL E FAB */}
            <View className="mt-3">
                <TaskModal addTask={addTask} />
            </View>
        </SafeAreaView>
    );
}

Index.options = {
    headerShow: false,
};
