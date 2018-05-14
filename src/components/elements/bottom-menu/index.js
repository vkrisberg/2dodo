import React, { PureComponent } from 'react';
import {
  Image,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import MenuEnum from './enums/menu-enum';
import styles from './styles';

export default class BottomMenu extends PureComponent {
  getMenuList = () => {
    return MenuEnum.map(item => {
      const isActiveItem = item.name === this.props.activeItem;

      return (
        <TouchableWithoutFeedback key={item.name}>
          <View style={styles.menuItem}>
            <Image style={styles.menuImage} source={isActiveItem ? item.activeImage : item.image} />
            <Text style={[ style.text, { color: isActiveItem ? 'blue' : 'grey' } ]}>
              {item.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }

  render() {
    return (
      <View style={styles.menu}>
        {this.getMenuList}
      </View>
    );
  }
}
