import React, { useState } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PublishEventScreen() {
  const [date, setDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [mode, setMode] = useState(null);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
  };

  const onFromTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDate(currentDate);
  };

  const onToTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToDate(currentDate);
  };

  const showDatePicker = () => {
    setMode(mode === 'date' ? null : 'date');
  };

  const showFromTimePicker = () => {
    setMode(mode === 'from' ? null : 'from');
  };

  const showToTimePicker = () => {
    setMode(mode === 'to' ? null : 'to');
  };

  return (
    <View style={styles.container}>
      <RectButton style={[styles.dateButton]} onPress={showDatePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Date</Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.optionText}>{date.toLocaleDateString('en-US', {weekday: 'short', year: 'numeric', month: 'short'})}</Text>
        </View>
      </RectButton>
      {mode === 'date' && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />)}
      <RectButton style={[styles.dateButton]} onPress={showFromTimePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>From Time</Text>
          <View style={{flex: 1}}></View>

          <Text style={styles.optionText}>{fromDate.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit'})}</Text>
        </View>
      </RectButton>
      {mode === 'from' && (<DateTimePicker
          testID="dateTimePicker"
          value={fromDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onFromTimeChange}
        />)}
      <RectButton style={[styles.dateButton, styles.endSection]} onPress={showToTimePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>To Time</Text>
          <View style={{flex: 1}}></View>

          <Text style={styles.optionText}>{toDate.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit'})}</Text>
        </View>
      </RectButton>
      {mode === 'to' && (<DateTimePicker
          testID="dateTimePicker"
          value={toDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onToTimeChange}
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
