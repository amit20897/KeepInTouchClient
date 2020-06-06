import React, { useState } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PublishEventScreen() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setMode(mode === 'date' ? null : 'date');
  };

  const showTimePicker = () => {
    setMode(mode === 'time' ? null : 'time');
  };

  return (
    <View style={styles.container}>
      <RectButton style={[styles.dateButton]} onPress={showDatePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Date</Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.optionText}>Date</Text>
        </View>
      </RectButton>
      {mode === 'date' && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />)}
      <RectButton style={[styles.dateButton, styles.endSection]} onPress={showTimePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Time</Text>
          <View style={{flex: 1}}></View>

          <Text style={styles.optionText}>Date</Text>
        </View>
      </RectButton>
      {mode === 'time' && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  dateButton: {
    marginTop: 1,
    backgroundColor: 'lightgray',
    height: 30,
    padding: 6,
    paddingLeft: 16,
    paddingRight: 16
  },
  endSection: {
    marginBottom: 8
  },
  optionTextContainer: {
    flexDirection: 'row'
  }
});
