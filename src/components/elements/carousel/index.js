import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';


import Title from '../title';
import Skip from '../skip';
import {
  TitleText,
  Track,
  BarContainer,
  ItemImage,
  ItemText,
  ItemTitle,
  ItemWrap,
  Bar,
  Container,
} from './styles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const isSmallScreen = deviceHeight < 667;
const barSpace = 7;

export default class Carousel extends Component {
  static propTypes = {
    items: PropTypes.array,
    onSkip: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
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

  renderImages = () => {
    return this.props.items.map((item, i) => {
      return (
        <ItemWrap key={i} width={deviceWidth}>
          <ItemImage source={item.image} isSmall={isSmallScreen}/>
          <TitleText>{item.title}</TitleText>
          <ItemText>{item.text}</ItemText>
        </ItemWrap>
      );
    });
  };

  renderDots = () => {
    return this.props.items.map((item, i) => {
      return (
        <Track
          key={i}
          marginLeft={i === 0 ? 0 : barSpace}>
          <Bar isActive={this.isActive(i)}/>
        </Track>
      );
    });
  };

  render() {
    return (
      <Container>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          pagingEnabled
          onMomentumScrollEnd={this.onScrollEnd}>
          {this.renderImages()}
        </ScrollView>
        <BarContainer isSmall={isSmallScreen}>
          {this.renderDots()}
        </BarContainer>
        <Skip onSkip={this.props.onSkip} marginBottom={50}>
          Skip this feature
        </Skip>
      </Container>
    );
  }
}
