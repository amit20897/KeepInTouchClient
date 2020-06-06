import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SectionList, Alert } from 'react-native';
import { Friend } from '../components/Friend';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';

export default function MyFriendsScreen({ navigation }) {
  const loadingSections = [
    {title: 'Close Friends', data: [{}]},
    {title: 'Friends', data: [{}, {}]},
    {title: 'Acquaintances', data: [{}, {}, {}]},
    {title: 'Others', data: [{}, {}]}
  ];

  const [isLoading, setLoading] = useState(true);
  const [sections, setSections] = useState(loadingSections);

  async function getContacts() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails],
      });

      console.log(data);

      return data;
    }

    throw status;
  }

  async function getFriends() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{firstName: 'Amit', lastName: 'Greenberg'}])
      }, 1000);
    });
  }

  function mergeSections(friends, contacts) {
    return [
      {title: 'Close Friends', data: friends},
      {title: 'Others', data: contacts, source: 'contacts'}
    ];
  }

  useEffect(() => {
    Promise.all([getFriends(), getContacts()])
      .then(([friends, contacts]) => setSections(mergeSections(friends, contacts)))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function fullName(contact) {
    return `${contact.firstName} ${contact.lastName}`
  }

  async function addFriend(friend, index, section) {
    console.log(section);
    if (section.source === 'contacts') {
      navigation.navigate('PrioritySelectionScreen', {id: friend.id, isNew: true, source: 'contacts'});
    } else {
      navigation.navigate('FriendScreen', {friendId: friend.id});
    }
  }

  return (
    <View style={styles.container}>
      <SectionList
        refreshing={isLoading}
        sections={sections}
        renderItem={({item, index, section}) => 
          <Friend 
            icon="ios-contact"
            endIcon={section.source === 'contacts' ? 'md-add' : null}
            label={fullName(item)}
            onPress={() => addFriend(item, index, section) }
            isLoading={isLoading}>
          </Friend>
        }
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
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