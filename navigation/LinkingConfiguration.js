import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        MyFriends: 'my-friends',
        Settings: 'settings',
      },
    },
    PrioritySelectionScreen: {path: 'PrioritySelectionScreen'}
  },
};
