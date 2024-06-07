import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { searchMedia } from '../api/tmdb';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('movie');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a search query');
      return;
    }
    const results = await searchMedia(query, type);
    setResults(results);
  };

  const handleMoreDetails = (item) => {
    if (item.media_type === 'movie' || type === 'movie') {
      navigation.navigate('MovieDetails', { id: item.id });
    } else if (item.media_type === 'tv' || type === 'tv') {
      navigation.navigate('TvShowDetails', { id: item.id });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        <Picker.Item label="Movie" value="movie" />
        <Picker.Item label="TV" value="tv" />
        <Picker.Item label="Multi" value="multi" />
      </Picker>
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title || item.name}</Text>
              <Text>Popularity: {item.popularity}</Text>
              <Text>Release Date: {item.release_date || item.first_air_date}</Text>
              <Button
                title="More Details"
                onPress={() => handleMoreDetails(item)}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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







































