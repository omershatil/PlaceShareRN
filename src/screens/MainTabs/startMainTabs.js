import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';

export const startTabs = () => {
  // got to use an async helper method to get the icon. Can't do <Icon>. pass the parameters for name, size (30) and others
  // if needed
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android'? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android'? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android'? 'md-menu' : 'ios-menu', 30),
  ])
    .then(sources => {
      Navigation.startTabBasedApp({
        tabs: [
          {
            screen: 'awesome-places.FindPlaceScreen',
            label: 'Find Place',
            title: 'Find Place',
            icon: sources[0],
            // add a menu entry for the sidedrawer
            navigatorButtons: {
              leftButtons: [
                {
                  icon: sources[2],
                  title: 'Menu',
                  id: 'sideDrawerToggle'
                }
              ]
            }
          },
          {
            screen: 'awesome-places.SharePlaceScreen',
            label: 'Share Place',
            title: 'Share Place',
            icon: sources[1],
            // add a menu entry with buttons to the nav bar (the top area of the screen, so we can click on a button
            // that's defined on its left to tell the drawer to come out.
            navigatorButtons: {
              leftButtons: [
                {
                  icon: sources[2],
                  title: 'Menu',
                  // we give an identical id as in the other tab (tab[0]) b/c those are buttons in different tabs.
                  // we could also give different ids
                  id: 'sideDrawerToggle'
                }
              ]
            }
          },
        ],
        tabsStyle: {
          // this will effect ios, but not android
          tabBarSelectedButtonColor: 'orange',
        },
        appStyle: {
          // this will effect android, but not ios
          tabBarSelectedButtonColor: 'orange',
        },
        // side drawers you have to register here!
        drawer: {
          left: {
            screen: 'awesome-places.SideDrawerScreen'
          }
        }
      });
    });
};
