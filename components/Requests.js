import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import SkeletonContent from "react-native-skeleton-content";

import { Request } from "./Request";

export function Requests({ isLoading, requests, title }) {
  return (
    <View style={ {backgroundColor: 'white'} }>
      <Text style={styles.optionText}>{title || 'Pending requests'}</Text>
      <FlatList
        refreshing={isLoading}
        data={requests}
        renderItem={({item}) => 
          <Request icon="ios-contact"
            label={item.name}
            onPress={() => addFriend(item) }
            isLoading={isLoading}></Request>
        }
        keyExtractor={(item, index) => index}
      />
      {(!requests || !requests.length) && (
        <Text style={styles.noOptionsText}>No pending requests</Text>
      )}
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
  noOptionsText: {
    fontSize: 13,
    color: 'gray',
    marginLeft: 14
  }
});

