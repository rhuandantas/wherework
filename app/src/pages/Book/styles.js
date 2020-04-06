import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 50
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
        marginTop: 50
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16

    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: "#ccc",
    },

    cancelButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16

    }
})

export default styles