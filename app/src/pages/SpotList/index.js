import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'
import api from '../../services/api';

import styles from './styles';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const res = await api.get('spot', {
                params: {
                    tech
                }
            });

            setSpots(res.data);
        }

        loadSpots();
    }, []);
    const handleNavigate = (id) => {
        navigation.navigate('Book', { id });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: "http://localhost:3001/files/247011-1585769814482.jpg" }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleNavigate(item._id)}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

export default withNavigation(SpotList);