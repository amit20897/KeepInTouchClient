import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-contact"
        label="Profile"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
        isLastOption
      />

      <OptionButton
        icon="google"
        label="Google Account"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="facebook"
        label="Facebook Account"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-school"
        label="Create Password"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
        isLastOption
      />

      <OptionButton
        icon="md-refresh"
        label="Load Old Account"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-information-circle-outline"
        label="About"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
        isLastOption
      />

      <OptionButton
        icon="sign-out"
        label="Sign Out"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />

      <OptionButton
        icon="md-remove-circle-outline"
        label="Reset Account"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
        isDistractive
      />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption, isDistractive }) {
  var iconTag;
  if (icon && icon.startsWith('md-')) {
    iconTag = <Ionicons name={icon} size={22} color={isDistractive ? 'red' : 'rgba(0,0,0,0.35)'} />;
  } else {
    iconTag = <FontAwesome name={icon} size={22} color={isDistractive ? 'red' : 'rgba(0,0,0,0.35)'} />
  }

  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          {iconTag}
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={[styles.optionText, isDistractive && styles.distractive]}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
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
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 16
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  distractive: {
    color: 'red'
  }
});
