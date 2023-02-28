import React, { useState } from 'react';
import {
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Modal,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import listData from './listData';
import TodoList from './TodoList';

export default class AddListModal extends React.Component {
  backgroundColors = [
    'green',
    '#24A6D9',
    'gold',
    'purple',
    '#FF1493',
    'red',
    'maroon',
    'black',
  ];

  state = { name: '', color: this.backgroundColors[0] };

  createTodo = () => {
    const { name, color } = this.state;
    const list = { name, color };

    if(!name){
      Alert.alert('Error', 'Name not entered', [{text: "Confirm"}]);
    }else{
      this.props.addList(list);
      this.setState({ name: '' });
      this.props.closeModal();
    }
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: 'absolute', top: 64, right: 32 }}
          onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>

        <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
          <Text style={styles.title}>Create Todo List</Text>

          <TextInput
            style={styles.input}
            placeholder="List Name?"
            placeholderTextColor="gray"
            color="white"
            maxLength={12}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            {this.renderColors()}
          </View>

          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={() => this.createTodo()}>

            <Text style={{ color: 'white', fontWeight: '600' }}>Create!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292b2a',
  },
  title: {
    fontsize: 28,
    fontWeight: '800',
    alignItems: 'center',
    color: 'white',
    marginBottom: 16,
  },
  input: {
    fontsize: 18,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'white',
    height: 50,
    marginTop: 8,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
