import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import SkeletonContent from "react-native-skeleton-content";

import { Meeting } from "./Meeting";

export function Meetings({ isLoading }) {
  return (
    <View style={ {backgroundColor: 'white'} }>
      <Text style={styles.optionText}>Your scheduled meetings</Text>
      <Meeting icon="ios-contact"
        label="hola"
        onPress={() => addFriend(item) }
        isLoading={isLoading}></Meeting>
      <Meeting icon="ios-contact"
        label="hola"
        onPress={() => addFriend(item) }
        isLoading={isLoading}></Meeting>
      <Meeting icon="ios-contact"
        label="hola"
        onPress={() => addFriend(item) }
        isLoading={isLoading}></Meeting>
      <Meeting icon="ios-contact"
        label="hola"
        onPress={() => addFriend(item) }
        isLoading={isLoading}></Meeting>
    </View>
  );
}

const styles = StyleSheet.create({
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed'
  },
  optionText: {
    padding: 8,
    fontSize: 15,
    marginLeft: 6
  },
});

