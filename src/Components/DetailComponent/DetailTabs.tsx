import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const DetailTabs = ({ details, comments }) => {
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'details', title: 'Event' },
    { key: 'comments', title: 'Comments' },
  ];

  const renderScene = SceneMap({
    details: () => details,
    comments: () => comments,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#FF9800' }}
          style={{ backgroundColor: '#fff' }}
          labelStyle={{ color: '#000' }}
        />
      )}
    />
  );
};

export default DetailTabs;