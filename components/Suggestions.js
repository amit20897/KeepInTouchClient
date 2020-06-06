import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import SkeletonContent from "react-native-skeleton-content";

import { Friend } from "../components/Friend";

export function Suggestions({ isLoading, suggestions }) {
  return (
    <View style={ {backgroundColor: 'white'} }>
      <Text style={styles.optionText}>Would you like to meet...</Text>
      <FlatList
        refreshing={isLoading}
        data={suggestions}
        renderItem={({item}) => 
          <Friend icon="ios-contact"
            label={item.name}
            onPress={() => addFriend(item) }
            isLoading={isLoading}></Friend>
        }
        keyExtractor={(item, index) => index}
      />
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

