import {ActivityIndicator, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size={'small'} color={'white'} />
    </View>
  );
};

export default Loading;
