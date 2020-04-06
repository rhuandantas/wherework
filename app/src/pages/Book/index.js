import React, { useState } from 'react';
import { TextInput, Alert, Text, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import api from "./../../services/api";
import styles from './styles';

export default function Book({ navigation }) {
    const [date, setDate] = useState("");
    const id = navigation.getParam('id');

    const handleSubmit = async () => {
        const user = AsyncStorage.getItem('user');
        await api.post(`/spot/${id}/booking`, {
            date
        }, {
            headers: {
                user
            }
        });

        Alert.alert('Solicitação de reserva enviada')
        navigation.navigate('List');
    }
    const handleCancel = () => {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Data de interesse *</Text>
            <TextInput
                placeholder="Qual data você quer reservar"
                placeholderTextColor="#999"
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar reservar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
