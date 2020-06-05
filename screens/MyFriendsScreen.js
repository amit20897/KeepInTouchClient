import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import {  } from 'react-native-gesture-handler';
import { Friend } from '../components/Friend';
import * as Contacts from 'expo-contacts';

export default function MyFriendsScreen() {
  const loadingSections = [
    {title: 'Close Friends', data: [{}, {}]},
    {title: 'Friends', data: [{}, {}]},
    {title: 'Acquaintances', data: [{}, {}]},
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

      return data;
    }

    throw status;
  }

  async function getFriends() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{firstName: 'Amit', lastName: 'Greenberg'}])
      }, 2000);
    });
  }

  function mergeSections(friends, contacts) {
    return [
      {title: 'Close Friends', data: friends},
      {title: 'Others', data: contacts}
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

  return (
    <View style={styles.container}>
      <SectionList
        refreshing={isLoading}
        sections={sections}
        renderItem={({item}) => 
          <Friend icon="ios-contact"
            label={fullName(item)}
            onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
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