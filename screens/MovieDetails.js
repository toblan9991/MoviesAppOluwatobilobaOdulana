import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchMovieDetails } from '../api/tmdb';

export default function MovieDetails({ route }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    loadMovieDetails();
  }, []);

  const loadMovieDetails = async () => {
    const movieDetails = await fetchMovieDetails(id);
    setMovie(movieDetails);
  };

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text>{movie.overview}</Text>
      <Text>Popularity: {movie.popularity}</Text>
      <Text>Release Date: {movie.release_date}</Text>
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




