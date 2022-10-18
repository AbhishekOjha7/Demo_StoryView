import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Stories from './src/stories';
import StoryView from './src/timeline';

const App = () => {
  return (
    <SafeAreaView>
      <StoryView />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
