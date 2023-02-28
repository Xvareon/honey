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
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import listData from './listData';
import TodoModal from './TodoModal';

export default class TodoList extends React.Component {
  state = { showListVisible: false };

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  render() {
    const list = this.props.list;
    const id = this.props.list.id;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <>
        <View>
          <Modal
            animationType="slide"
            visible={this.state.showListVisible}
            onRequestClose={() => this.toggleListModal()}>
            <TodoModal
              list={list}
              closeModal={() => this.toggleListModal()}
              updateList={this.props.updateList}
            />
          </Modal>

          <TouchableOpacity
            style={[styles.listContainer, { backgroundColor: list.color }]}
            onPress={() => this.toggleListModal()}>
            <View style={{ flexDirection: 'row', marginLeft: 160 }}>
              <TouchableOpacity onPress={() => this.props.deleteList(id)}>
                <Text style={styles.listTitle}>X</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.listTitle} numberOfLines={1}>
              {list.name}
            </Text>

            <View>
              <>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.count}>{remainingCount} Remaining</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.count}>{completedCount} Completed</Text>
                </View>
              </>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    paddingBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    width: 200,
    marginVertical: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  count: {
    fontSize: 20,
    fontWeight: '200',
    color: 'white',
  },
});
