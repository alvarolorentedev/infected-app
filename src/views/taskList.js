import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  FlatList,
  View
} from 'react-native'

import store from '../viewModels/taskList'
import { observer } from 'mobx-react'

@observer
export default class TaskList extends Component {

  renderItem = ({ item, index }) => {
    return (
      <View>
        <View>
          <TouchableOpacity style={{ marginTop: -2 }} onPress={() => store.finishItem(index)}>
            <Text> {(item.isFinished) ? `✅` : `🕘`} </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'black' }}>{item.title}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity style={{ marginTop: -2 }} onPress={() => store.deleteItem(index)}>
            <Text>{`❌`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const list = store.list.slice() // don't forget copy the list from store

    return (
      <FlatList
        data={list}
        extraData={list}
        keyExtractor={(_, index) => `${index}`}
        renderItem={this.renderItem}
      />
    )
  }
}