// screens/MoviesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchMovies } from '../api/tmdb';

export default function MoviesScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');

  useEffect(() => {
    loadMovies();
  }, [category]);

  const loadMovies = async () => {
    const movies = await fetchMovies(category);
    setMovies(movies);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Now Playing" value="now_playing" />
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Rated" value="top_rated" />
        <Picker.Item label="Upcoming" value="upcoming" />
      </Picker>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>Popularity: {item.popularity}</Text>
              <Text>Release Date: {item.release_date}</Text>
              <Button
                title="More Details"
                onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

