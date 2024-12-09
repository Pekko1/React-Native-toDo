import * as React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Dimensions,
} from "react-native";
import { FAB, IconButton, RadioButton, TextInput } from "react-native-paper";

interface TaskModalProp {
    addTask: (task: {}) => void;
}

const TaskModal: React.FC<TaskModalProp> = ({ addTask }) => {
    const [visible, setVisible] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [taskName, setTaskName] = React.useState("");

    // MOSTARE E NASCONDERE IL MODAL
    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        setTaskName("");
        setSelectedCategory("");
    };

    // FUNZIONE PER SALVARE LA TASK PASSATA TRAMITE PROP
    function handlePress() {
        addTask({ title: taskName, category: selectedCategory });
        hideModal();
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={hideModal}
                animationType="slide"
                accessibilityViewIsModal
                accessibilityLabel="Add Task Modal"
            >
                {/* SFONDO */}
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View
                        className="flex-1 justify-center items-center"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    >
                        {/* CONTENUTO */}
                        <TouchableWithoutFeedback>
                            <View className="bg-white p-5 rounded-xl w-4/5 items-center ">
                                {/* ICONA DI CHIUSURA */}
                                <IconButton
                                    iconColor="red"
                                    icon="close"
                                    size={20}
                                    onPress={hideModal}
                                    style={{
                                        position: "absolute",
                                        top: -5,
                                        right: -2,
                                    }}
                                    accessibilityLabel="Close add task modal"
                                    accessibilityRole="button"
                                />
                                {/* TITOLO */}
                                <Text className="text-xl mb-5">Add a Task</Text>

                                {/* INPUT */}
                                <View className="w-full mb-5">
                                    <TextInput
                                        style={modalStyle.input}
                                        placeholder="New Task"
                                        value={taskName}
                                        onChangeText={(e) => setTaskName(e)}
                                        accessibilityLabel="Task name input"
                                        accessibilityHint="Enter the name of a task"
                                    />
                                </View>

                                {/* SCEGLIERE LA CATEGORIA */}
                                <View
                                    className="flex items-center gap-1 mb-2 border border-slate-400 px-4 py-1 pt-2 rounded-lg bg-slate-100 shadow"
                                    accessible
                                    accessibilityRole="radiogroup"
                                    accessibilityLabel="Select task category"
                                >
                                    <Text className="">Select a category</Text>

                                    <View className="flex-row gap-4">
                                        <View className="flex-row items-center">
                                            <RadioButton
                                                value="first"
                                                uncheckedColor="gray"
                                                color="blue"
                                                status={
                                                    selectedCategory ===
                                                    "people"
                                                        ? "checked"
                                                        : "unchecked"
                                                }
                                                onPress={() =>
                                                    setSelectedCategory(
                                                        "people"
                                                    )
                                                }
                                            />
                                            <Text
                                                className={`font-semibold ${
                                                    selectedCategory ===
                                                    "people"
                                                        ? "text-black"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                People
                                            </Text>
                                        </View>

                                        <View className="flex-row items-center">
                                            <RadioButton
                                                value="second"
                                                uncheckedColor="gray"
                                                color="blue"
                                                status={
                                                    selectedCategory ===
                                                    "environment"
                                                        ? "checked"
                                                        : "unchecked"
                                                }
                                                onPress={() =>
                                                    setSelectedCategory(
                                                        "environment"
                                                    )
                                                }
                                            />
                                            <Text
                                                className={`font-semibold ${
                                                    selectedCategory ===
                                                    "environment"
                                                        ? "text-black"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                Environment
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* PULSANTE DI AGGIUNTA */}
                                <TouchableOpacity
                                    className={`p-2 px-5 rounded-md ${
                                        taskName && selectedCategory
                                            ? "bg-red-500"
                                            : "bg-gray-300"
                                    }`}
                                    onPress={handlePress}
                                    disabled={!taskName || !selectedCategory}
                                    accessibilityLabel="Add task"
                                    accessibilityRole="button"
                                    accessibilityHint="Adds the new task with the selected category"
                                >
                                    <Text className="text-white font-bold">
                                        Add
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Floating Action Button */}
            <FAB
                style={modalStyle.floating}
                size="medium"
                icon="plus"
                mode="elevated"
                onPress={showModal}
                accessibilityLabel="Open add task modal"
                accessibilityRole="button"
            />
        </View>
    );
};

export default TaskModal;

const modalStyle = StyleSheet.create({
    floating: {
        position: "absolute",
        margin: 16,
        right: 20,
        bottom: 0,
        backgroundColor: "#9ca3af",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
});
