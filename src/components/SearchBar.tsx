import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { Colors } from '../constants/colors';

interface Props {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="rgba(255,255,255,0.6)"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <MagnifyingGlass size={24} color={Colors.text.main} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    height: '100%',
  },
  button: {
    padding: 5,
  },
});
