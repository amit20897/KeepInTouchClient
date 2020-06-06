import React, { useState } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PublishEventScreen() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [mode, setMode] = useState(null);

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToDate(currentDate);
  };

  const showFromDatePicker = () => {
    setMode(mode === 'from-date' ? null : 'from-date');
  };

  const showToDatePicker = () => {
    setMode(mode === 'to-date' ? null : 'to-date');
  };

  const showFromTimePicker = () => {
    setMode(mode === 'from' ? null : 'from');
  };

  const showToTimePicker = () => {
    setMode(mode === 'to' ? null : 'to');
  };

  async function submit() {
    const start = fromDate.toISOString();
    const end = toDate.toISOString();
    fetch('http://3.17.26.113:8080/check_available', {method: 'post', body: JSON.stringify({id: '5edaa5f2ea613908a59465b8', start, end}), headers: {'Content-Type': 'application/json'}})
      .then(response => response.json()).then(e => console.log(e) || e).catch(e => alert('hello' + e));
  }

  return (
    <View style={styles.container}>
      <RectButton style={[styles.dateButton]} onPress={showFromDatePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>From Date</Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.optionText}>{fromDate.toLocaleDateString('en-US', {weekday: 'short', year: 'numeric', month: 'short'})}</Text>
        </View>
      </RectButton>
      {mode === 'from-date' && (<DateTimePicker
          testID="dateTimePicker"
          value={fromDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onFromDateChange}
        />)}
      <RectButton style={[styles.dateButton]} onPress={showFromTimePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Time</Text>
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
          onChange={onFromDateChange}
        />)}
      <RectButton style={[styles.dateButton]} onPress={showToDatePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>To Date</Text>
          <View style={{flex: 1}}></View>
          <Text style={styles.optionText}>{toDate.toLocaleDateString('en-US', {weekday: 'short', year: 'numeric', month: 'short'})}</Text>
        </View>
      </RectButton>
      {mode === 'to-date' && (<DateTimePicker
          testID="dateTimePicker"
          value={toDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onToDateChange}
        />)}
      <RectButton style={[styles.dateButton, styles.endSection]} onPress={showToTimePicker}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>Time</Text>
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
          onChange={onToDateChange}
        />)}
        <RectButton style={styles.submitButton} onPress={() => submit() }>
          <View accessible>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </RectButton>
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
  },
  submitButton: {
    marginBottom: 24,
    height: 40,
    backgroundColor: 'cyan',
    shadowColor: 'black',
    alignItems: 'center'
  },
  buttonText: {
    textAlignVertical: 'center',
    marginTop: 11
  },
});
