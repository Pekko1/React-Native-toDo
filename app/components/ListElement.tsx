import { View, Text } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";

interface ListElementProp {
    title: string;
    category: string;
    completed: boolean;
    onPress: (id: string | number) => void;
    id: string | number;
    onDelete: (id: number | string) => void;
}

const ListElement: React.FC<ListElementProp> = ({
    title,
    category,
    completed,
    onPress,
    id,
    onDelete,
}) => {
    return (
        <View
            className={`mb-4 p-3 pt-0 rounded-lg border ${
                completed
                    ? "bg-green-100 border-green-300"
                    : " bg-red-100 border-red-300"
            }`}
        >
            <View className="flex-row justify-between items-center ">
                <Text
                    accessibilityLabel={`Title: ${title}`}
                    className="text-lg font-semibold text-gray-800"
                >
                    {title}
                </Text>
                {/* BOTTONE PER CANCELLARE */}
                <IconButton
                    icon="delete"
                    iconColor="red"
                    size={20}
                    onPress={() => onDelete(id)}
                    accessibilityLabel={`Delete task: ${title}`}
                    accessibilityRole="button"
                />
            </View>

            {/* PARTE SOTTO */}
            <View className="flex-row justify-between items-center mt-2">
                {/* STATO DELLA TASK */}
                <Text
                    onPress={() => onPress(id)}
                    className={`text-sm font-medium ${
                        completed ? "text-green-600" : "text-red-600"
                    }`}
                    accessibilityLabel={`Mark task as ${
                        completed ? "incomplete" : "complete"
                    }`}
                >{`${completed ? "Complete" : "To complete"}`}</Text>

                {/* CATEGORIA */}
                <Text
                    style={{ color: "gray" }}
                    accessibilityLabel={`Category: ${
                        category === "people" ? "People" : "Environment"
                    }`}
                >
                    {category === "people" ? "People" : "Environment"}
                </Text>
            </View>
        </View>
    );
};

export default ListElement;
