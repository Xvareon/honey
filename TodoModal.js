import React from 'react';
import {
  Text,
  TextInput,
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
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import listData from './listData';

export default class TodoModal extends React.Component {
  state = {
    newTodo: '',
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };

  addTodo = () => {
    if (!this.state.newTodo) {
      Alert.alert('Error', 'Name not entered', [{ text: 'Confirm' }]);
    } else {
      let list = this.props.list;
      list.todos.push({ title: this.state.newTodo, completed: false });
      this.props.updateList(list);
      this.setState({ newTodo: '' });
      Keyboard.dismiss();
    }
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);
    this.props.updateList(list);
    Keyboard.dismiss();
  };

  clearTodo = () => {
    let list = this.props.list;
    list.todos = [];
    this.props.updateList(list);
    Keyboard.dismiss();
  };

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
            <Icon
              name={todo.completed ? 'check-square-o' : 'square-o'}
              size={24}
              color="white"
              style={{ width: 32 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.deleteTodo(index)}>
            <Icon name="trash" size={24} color="red" style={{ width: 32 }} />
          </TouchableOpacity>
        </>

        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'gray' : 'white',
            },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
              { borderStartColor: list.color },
            ]}>
            
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>

              <TouchableOpacity onPress={() => this.clearTodo()}>
                <Text
                  style={{
                    marginTop: 4,
                    marginBottom: 16,
                    color: list.color,
                    fontWeight: '600',
                  }}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <>
            <View style={[styles.section, { flex: 3 }]}>
              <FlatList
                data={list.todos}
                renderItem={({ item, index }) => this.renderTodo(item, index)}
                keyExtractor={(item) => item.title}
                contentContainerStyle={{
                  paddingHorizontal: 32,
                  paddingVertical: 64,
                }}
                showsVerticalScrollIndicator={true}
              />
            </View>

            <View style={[styles.section, styles.footer]}>
              <TextInput
                maxLength={15}
                placeholder="Procrastinate this"
                placeholderTextColor="gray"
                style={[styles.input, { borderColor: list.color }]}
                onChangeText={(text) => this.setState({ newTodo: text })}
                value={this.state.newTodo}
              />
              <TouchableOpacity
                style={[styles.addTodo, { backgroundColor: list.color }]}
                onPress={() => this.addTodo()}>
                <AntDesign name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </>
        </SafeAreaView>
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
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white',
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: 'gray',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 4,
    color: 'white',
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
