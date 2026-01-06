import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import ButtonComponent from '../../components/ButtonComponent';
import { useTodoController } from './useTodoController';
import { Todo } from './TodoModel';

const { width } = Dimensions.get('window');

const TodoScreen: React.FC<any> = ({ navigation }) => {
  const { loading, error, todos, filter, setFilter } = useTodoController();

  const [itemHeights, setItemHeights] = useState<Record<number, number>>({});

  const dataProvider = new DataProvider(
    (r1: Todo, r2: Todo) => r1.todoID !== r2.todoID
  ).cloneWithRows(todos);

  const layoutProvider = new LayoutProvider(
    index => index,
    (type, dim) => {
      dim.width = width;
      dim.height = itemHeights[type] || 110;
    }
  );

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ButtonComponent
        selectedFilter={filter}
        onPressCurrent={() => setFilter('current')}
        onPressSkipped={() => setFilter('skipped')}
        onPressPending={() => setFilter('future')}
        hideHeader
      />

      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={(type, item: Todo) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate('AddGoal')}>
        <Text>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TodoScreen;
