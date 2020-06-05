import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Priority } from '../components/Priority';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';

export default function PrioritySelectionScreen({ route, navigation }) {
  const { id, isNew, source } = route;

  const [isLoading, setLoading] = useState(true);
  const [priorities, setPriorities] = useState([{}, {}, {}, {}]);

  async function getPriorities() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {title: 'Close Friends'},
          {title: 'Friends'},
          {title: 'Acquaintances'},
          {title: 'Others'}
        ])
      }, 1000);
    });
  }

  useEffect(() => {
    getPriorities()
      .then(priorities => setPriorities(priorities))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function fullName(contact) {
    return `${contact.firstName} ${contact.lastName}`
  }

  async function addFriend(priority) {
    console.log(`add ${id} to ${priority}`);
    navigation.navigate('Root', {success: true})
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={isLoading}
        data={priorities}
        renderItem={({item}) => 
          <Priority isLoading={isLoading} label={item.title} onPress={() => addFriend(item)}/>
        }
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  sectionHeader: {
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  }
});