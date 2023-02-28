import React, { useState } from 'react';
import {
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import listData from './listData';
import TodoList from './TodoList';
import AddListModal from './AddListModal';

var count = 3;

export default class App extends React.Component {
  state = { addTodoVisible: false, lists: listData };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return (
      <TodoList
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
    ++count;
  };

  deleteList = (_id) => {
    var i = this.state.lists.findIndex((item) => item.id == _id);

    if (this.state.lists.length == 1) {
      this.setState({
        lists: [],
      });
      count -= count;
    } else {
      this.state.lists.splice(i, 1);
      this.setState({});
      --count;
    }
  };

  clearList = (list) => {
    this.setState({
      lists: [],
    });
    count -= count;
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    return (
      <>
        <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        <ImageBackground
          source={{
            uri: 'https://mfiles.alphacoders.com/919/thumb-1920-919453.png',
          }}
          style={styles.container}>
          <Modal
            animationType="slide"
            visible={this.state.addTodoVisible}
            onRequestClose={() => this.toggleAddTodoModal()}>
            <AddListModal
              closeModal={() => this.toggleAddTodoModal()}
              addList={this.addList}
            />
          </Modal>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>
              <>
                Todo
                <Text style={{ fontWeight: '1200', color: 'yellow' }}>
                  Lists:
                  <Text style={{ fontSize: 32, color: 'cyan' }}>
                    {' '}
                    {count}
                  </Text>{' '}
                </Text>
                <Text style={{ fontSize: 12 }}>{Date()}</Text>
              </>
            </Text>
          </View>

          <View
            style={{
              marginVertical: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.addList}
              onPress={() => this.toggleAddTodoModal()}>
              <AntDesign name="plus" size={16} color="white" />
              <Text style={styles.add}>Add List</Text>
            </TouchableOpacity>

            <Text>{'               '}</Text>

            <TouchableOpacity
              style={styles.clearList}
              onPress={() => this.clearList()}>
              <AntDesign name="close" size={16} color="white" />
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 350 }}>
            <FlatList
              data={this.state.lists}
              keyExtractor={(item) => item.name}
              vertical={true}
              showsVerticalScrollIndicator={true}
              renderItem={({ item }) => this.renderList(item)}
              keyboardShouldPersistTaps="always"
            />
          </View>
        </ImageBackground>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#292b2a',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    paddingHorizontal: 64,
  },
  addList: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'green',
    padding: 16,
    alignItems: 'center',
  },
  clearList: {
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'red',
    padding: 16,
    alignItems: 'center',
  },
  add: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    margin: 8,
  },
  clear: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    margin: 8,
  },
});
