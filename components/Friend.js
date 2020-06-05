import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import SkeletonContent from "react-native-skeleton-content";

export function Friend({ icon, label, onPress, isLoading }) {
  return (
    <RectButton style={[styles.option]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <SkeletonContent
          containerStyle={{width: 30}}
          isLoading={isLoading}
          animationType="pulse"
          layout={[
            { key: "someId", width: 20, height: 20, borderRadius: 10 },
          ]}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
          </View>
        </SkeletonContent>

        <SkeletonContent
          containerStyle={{flex: 1}}
          isLoading={isLoading}
          animationType="pulse"
          layout={[
            { key: "someId1", width: 300, height: 20 },
          ]}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </SkeletonContent>
      </View>
    </RectButton>
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
    borderColor: '#ededed',
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

