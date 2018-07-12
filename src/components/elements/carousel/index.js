import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Dimensions,
  ScrollView,
  Text,
  Image
} from 'react-native';

import {ButtonSkip} from '../index';
import {themeEnum} from '../../../enums';
import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const isSmallScreen = deviceHeight < 667;
const barSpace = 7;

export default class Carousel extends Component {
  static propTypes = {
    theme: PropTypes.string,
    context: PropTypes.object,
    items: PropTypes.array,
    onSkip: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  static defaultProps = {
    theme: themeEnum.light,
  };

  state = {
    page: 0,
  };

  onScrollEnd = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x;

    this.setState({
      page: Math.floor(xOffset / deviceWidth),
    });
  };

  isActive = (index) => {
    return this.state.page === index;
  };

  renderImages = (_styles) => {
    return this.props.items.map((item, i) => {
      return (
        <View style={_styles.itemWrap} key={i}>
          <Image style={{marginTop: isSmallScreen ? 100 : 160}} source={item.image}/>
          <Text style={_styles.titleText}>{item.title}</Text>
          <Text style={_styles.itemText}>{item.text}</Text>
        </View>
      );
    });
  };

  renderDots = (_styles) => {
    return this.props.items.map((item, i) => {
      return (
        <View
          key={i}
          style={[_styles.track, {marginLeft: i === 0 ? 0 : barSpace}]}>
          <Animated.View style={[_styles.bar, {opacity: this.isActive(i) ? 1 : 0.3}]}/>
        </View>
      );
    });
  };

  render() {
    const {theme, context} = this.props;
    const _styles = styles(theme);

    return (
      <View style={_styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          pagingEnabled
          onMomentumScrollEnd={this.onScrollEnd}>
          {this.renderImages(_styles)}
        </ScrollView>
        <View style={[_styles.barContainer, {bottom: isSmallScreen ? 110 : 140}]} isSmall={isSmallScreen}>
          {this.renderDots(_styles)}
        </View>
        <ButtonSkip onSkip={this.props.onSkip} marginBottom={50}>
          {context.t('SkipAllFeatures')}
        </ButtonSkip>
      </View>
    );
  }
}
