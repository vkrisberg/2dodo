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

  constructor(props) {
    super(props);

    this.numItems = props.data.length;
    this.itemWidth = (barWidth / this.numItems) - ((this.numItems - 1) * barSpace);
    this.animVal = new Animated.Value(0);
  }

  isActive = (index) => {
    // console.log('ind', index)
  };

  handleScroll = (data) => {
    console.log('ONSCR', data);
    // Animated.event(
    //   [{nativeEvent: {contentOffset: {x: this.animVal}}}]
    // )
  };

  render() {
    const {data} = this.props;
    let imageArray = [];
    let barArray = [];

    data.forEach((item, i) => {
      const thisItem = (
        <ItemWrap key={`item${i}`} width={deviceWidth}>
          <TowersImage source={castleTowers}/>
          <ItemImage source={item.image}/>
          <Title textStyle={ItemTitle}>{item.title}</Title>
          <ItemText>
            {item.text}
          </ItemText>
        </ItemWrap>
      );

      imageArray.push(thisItem);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <Track
          key={`bar${i}`}
          marginLeft={i === 0 ? 0 : barSpace}
        >
          <Bar/>
        </Track>
      );

      barArray.push(thisBar);
    });

    return (
      <Container>
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
          {imageArray}
        </ScrollView>
        <BarContainer isSmall={isSmallScreen}>
          {barArray}
        </BarContainer>
        <Skip onSkip={this.props.onSkip}>
          Skip this feature
        </Skip>
      </Container>
    );
  }
}
