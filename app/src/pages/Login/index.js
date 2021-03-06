import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import styles from './styles';
import api from "./../../services/api";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [techs, setTechs] = useState("");
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) navigation.navigate('List');
        });

    }, []);
    const handleSubmit = async () => {
        try {
            const res = await api.post('/user', {
                email
            });

            const { _id } = res.data;
            await AsyncStorage.setItem('user', _id);
            await AsyncStorage.setItem('techs', techs);

            navigation.navigate('List');

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.form}>
                <Text style={styles.label}>Seu E-mail *</Text>
                <TextInput
                    placeholder="Seu email"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Tecnologias *</Text>
                <TextInput
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
