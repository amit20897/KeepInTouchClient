import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Button } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { Suggestions } from '../components/Suggestions';
import { Meetings } from '../components/Meetings';

export default function HomeScreen({ navigation }) {
  const [suggestions, setSuggestions] = useState([{}, {}, {}]);
  const [isLoading, setLoading] = useState(true);

  async function getSuggestions() {
    return fetch('http://3.17.26.113:8080/get_suggestion?id=5edaa5f2ea613908a59465b8')
      .then(response => response.json());
  }

  useEffect(() => {
    Promise.all([getSuggestions()])
      .then(([suggestions]) => setSuggestions((suggestions || []).filter(a => !!a)))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.suggestionsContainer}>
          <Suggestions suggestions={suggestions} isLoading={isLoading} />
        </View>

        <RectButton style={styles.findBuddiesButton} onPress={() => navigation.navigate('PublishEventScreen') }>
          <View accessible>
            <Text style={styles.buttonText}>Find Buddies</Text>
          </View>
        </RectButton>

        <View style={styles.suggestionsContainer}>
          <Meetings />
        </View>

        
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  suggestionsContainer: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    overflow: 'hidden',
    marginBottom: 16
  },
  findBuddiesButton: {
    marginBottom: 24,
    height: 40,
    backgroundColor: 'cyan',
    shadowColor: 'black',
    alignItems: 'center'
  },
  buttonText: {
    textAlignVertical: 'center',
    marginTop: 11
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
