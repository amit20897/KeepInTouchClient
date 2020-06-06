import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SectionList, Alert } from 'react-native';
import { Friend } from '../components/Friend';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default function FriendScreen({ route }) {
  const { friendId} = route;

  const [isLoading, setLoading] = useState(true);
  const [friend, setFriend] = useState({});

  async function getFriend() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({firstName: 'Amit', lastName: 'Greenberg', latestMet: new Date(), latestSpoke: new Date()})
      }, 1000);
    });
  }

  useEffect(() => {
    getFriend()
      .then((friend) => setFriend(friend))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function fullName(contact) {
    return `${contact.firstName} ${contact.lastName}`
  }

  async function changePriority(friend) {
    navigation.navigate('PrioritySelectionScreen', {id: friend.id});
  }

  async function removeFriend(friend) {
    
  }

  async function callFriend(friend) {
    
  }

  return (
    <View style={styles.container}>
      <Friend icon="ios-contact"
        label={fullName(friend)}
        onPress={() => {}}
        isLoading={isLoading}>
      </Friend>

      <View style={{flexDirection: 'row', margin: 16, marginBottom: 0}}>
        <Text>Latest Met:</Text>
        <Text>{friend && friend.latestMet && friend.latestMet.toLocaleDateString('en-US') || 'never'}</Text>
      </View>
      <View style={{flexDirection: 'row', margin: 16, marginBottom: 16}}>
        <Text>Latest Spoke:</Text>
        <Text>{friend.latestSpoke && friend.latestSpoke.toLocaleDateString('en-US') || 'never'}</Text>
      </View>

      <RectButton style={[styles.option]} onPress={changePriority}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="md-contact" size={22} color="rgba(0,0,0,0.35)" />
          </View>

          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Change Priority</Text>
          </View>
        </View>
      </RectButton>
      <RectButton style={[styles.option]} onPress={callFriend}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="md-contact" size={22} color="rgba(0,0,0,0.35)" />
          </View>

          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Call Friend</Text>
          </View>
        </View>
      </RectButton>
      <RectButton style={[styles.option]} onPress={removeFriend}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.optionIconContainer}>
            <Ionicons name="md-contact" size={22} color="rgba(0,0,0,0.35)" />
          </View>

          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>Remove From Friends List</Text>
          </View>
        </View>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  }
});