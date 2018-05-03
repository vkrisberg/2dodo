import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import Title from '../title';
import routeEnum from '../../../enums/route-enum';

const deviceWidth = Dimensions.get('window').width;
const barWidth = 110;
const barSpace = 11;

class Carousel extends PureComponent {
  constructor(props) {
    super(props);

    this.numItems = props.data.length;
    this.itemWidth = (barWidth / this.numItems) - ((this.numItems - 1) * barSpace);
    this.animVal = new Animated.Value(0);
  }

  static propTypes = {
    data: PropTypes.array,
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  }

  handleSkip = () => {
    const{ navigate } = this.props.navigation;

    return navigate(routeEnum.Login);
  }

  render() {
    const { data } = this.props;
    let imageArray = [];
    let barArray = [];

    data.forEach((item, i) => {
      const thisItem = (
        <View key={`item${i}`} style={[styles.itemWrap, { width: deviceWidth }]}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
          <Title>{item.title}</Title>
          <Text style={styles.itemText}>
            Приложение хранит ваши данные
            в зашифрованном виде с помощью
            сложного шифрования с системой
            ключ-закрытый ключ
          </Text>
        </View>
      );

      imageArray.push(thisItem);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              marginLeft: i === 0 ? 0 : barSpace,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      );

      barArray.push(thisBar);
    });

    return(
      <View
        style={styles.container}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >
          { imageArray }
        </ScrollView>
        <View style={styles.barContainer}>
          { barArray }
        </View>
        <TouchableWithoutFeedback onPress={this.handleSkip}>
          <Text style={styles.skip}>
            Skip all features
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default withNavigation(Carousel);