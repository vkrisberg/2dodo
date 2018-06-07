import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';


import Title from '../title';
import castleTowers from './img/castle-towers.png';
import Skip from '../skip';
import {
  TowersImage,
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
const barWidth = 110;
const barSpace = 11;

export default class Carousel extends Component {
  static propTypes = {
    data: PropTypes.array,
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
    return this.props.data.map((item, i) => {
      return (
        <ItemWrap key={i} width={deviceWidth}>
          <TowersImage source={castleTowers}/>
          <ItemImage source={item.image}/>
          <Title textStyle={ItemTitle}>{item.title}</Title>
          <ItemText>
            {item.text}
          </ItemText>
        </ItemWrap>
      );
    });
  };

  renderDots = () => {
    return this.props.data.map((item, i) => {
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
