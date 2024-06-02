// screens/TvShowDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchTvShowDetails } from '../api/tmdb';

export default function TvShowDetails({ route }) {
  const { id } = route.params;
  const [tvShow, setTvShow] = useState(null);

  useEffect(() => {
    loadTvShowDetails();
  }, []);

  const loadTvShowDetails = async () => {
    const tvShowDetails = await fetchTvShowDetails(id);
    setTvShow(tvShowDetails);
  };

  if (!tvShow) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }}
      />
      <Text style={styles.title}>{tvShow.name}</Text>
      <Text>{tvShow.overview}</Text>
      <Text>Popularity: {tvShow.popularity}</Text>
      <Text>First Air Date: {tvShow.first_air_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});



