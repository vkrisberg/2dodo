import React, {PureComponent} from 'react';
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
import {withNavigation} from 'react-navigation';
import SvgUri from 'react-native-svg-uri';

import Title from '../title';
import routeEnum from '../../../enums/route-enum';
import castleTowers from './img/castle-towers.png';
import arrowIcon from './img/arrow.svg';
import BackgroundContainer from '../../../containers/background-container';
import {
  TowersImage,
  Track,
  BarContainer,
  ItemImage,
  ItemText,
  ItemTitle,
  ItemWrap,
  Skip,
  Bar,
  SkipWrapper,
  SvgWrapper
} from './styles';

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
    onSkip: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  }

  render() {
    const { data } = this.props;
    let imageArray = [];
    let barArray = [];

    data.forEach((item, i) => {
      const thisItem = (
        <ItemWrap key={`item${i}`} width={deviceWidth}>
          <TowersImage source={castleTowers} />
          <ItemImage source={item.image} />
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
          <Bar translateX={scrollBarVal} />
        </Track>
      );

      barArray.push(thisBar);
    });

    return(
      <BackgroundContainer>
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
        <BarContainer>
          { barArray }
        </BarContainer>
        <TouchableWithoutFeedback onPress={this.props.onSkip}>
          <SkipWrapper>
            <Skip>
              Skip all features
            </Skip>
            <SvgWrapper>
              <SvgUri source={arrowIcon} />
            </SvgWrapper>
          </SkipWrapper>
        </TouchableWithoutFeedback>
      </BackgroundContainer>
    );
  }
}

export default withNavigation(Carousel);
