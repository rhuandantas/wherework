import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, AsyncStorage } from 'react-native';
import styles from './styles';
import SpotList from "../SpotList";

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {techs.map(tech => <SpotList key={tech} tech={tech} />
            )}
        </SafeAreaView>
    );
}
