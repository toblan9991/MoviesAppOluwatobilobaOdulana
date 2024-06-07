import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchTvShows } from '../api/tmdb';

export default function TvShowsScreen({ navigation }) {
  const [tvShows, setTvShows] = useState([]);
  const [category, setCategory] = useState('popular');

  useEffect(() => {
    loadTvShows();
  }, [category]);

  const loadTvShows = async () => {
    const tvShows = await fetchTvShows(category);
    setTvShows(tvShows);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Airing Today" value="airing_today" />
        <Picker.Item label="On The Air" value="on_the_air" />
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Rated" value="top_rated" />
      </Picker>
      <FlatList
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>Popularity: {item.popularity}</Text>
              <Text>First Air Date: {item.first_air_date}</Text>
              <Button
                title="More Details"
                onPress={() => navigation.navigate('TvShowDetails', { id: item.id })}
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


































