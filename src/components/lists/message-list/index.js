import React, {Component} from 'react';
import {View, FlatList, Image, Keyboard} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import IMG_MESSAGES_EMPTY from './img/messages_empty.png';

export default class MessagesList extends Component {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    verticalOffset: PropTypes.number,
    typing: PropTypes.bool,
    theme: PropTypes.string,
    context: PropTypes.object,
    style: PropTypes.any,
  };

  static defaultProps = {
    items: [],
    renderItem: () => null,
    verticalOffset: 0,
    typing: false,
    theme: themeEnum.light,
  };

  constructor(props) {
    super(props);

    this.flatList = null;

    this.state = {
      items: props.items,
      isKeyboardActive: false,
      contentSize: 0,
      layoutHeight: 0,
    };
  }

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.items !== this.props.items) {
      this.setState({items: this.props.items});
    }

    if (prevState.items !== this.state.items) {
      this.flatList && this.flatList.scrollToEnd({animated: false});
    }

    if (this.props.typing && prevProps.typing !== this.props.typing) {
      this.flatList && this.flatList.scrollToEnd();
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = (e) => {
  };

  keyboardDidShow = () => {
    this.setState({isKeyboardActive: true});
    this.flatList && this.flatList.scrollToEnd();
  };

  keyboardWillHide = (e) => {
  };

  keyboardDidHide = () => {
    this.setState({isKeyboardActive: false});
    this.flatList && this.flatList.scrollToEnd();
  };

  scrollToBottom({contentSize = this.state.contentSize, layoutHeight = this.state.layoutHeight, animated = false}) {
    this.flatList.scrollToOffset({
      offset: (layoutHeight < contentSize) ? contentSize - layoutHeight : 0,
      animated,
    });
  }

  updateLayoutHeight(e) {
    const height = e.nativeEvent.layout.height;
    this.setState({layoutHeight: height});
    if (this.state.layoutHeight === 0) {
      this.flatList && this.scrollToBottom({layoutHeight: height});
    }
  }

  updateContentSize(w, h) {
    this.setState({contentSize: h});
    if (this.state.isKeyboardActive) {
      this.flatList && this.flatList.scrollToEnd();
    } else {
      this.flatList && this.scrollToBottom({contentSize: h});
    }
  }

  _keyExtractor = (item) => item.id;

  render() {
    const {items} = this.state;
    const {renderItem, verticalOffset, theme, context, style, typing} = this.props;
    const _styles = styles({theme, verticalOffset});

    if (!items.length) {
      return (
        <View style={_styles.emptyContainer}>
          <View style={_styles.emptyWrapper}>
            <Image source={IMG_MESSAGES_EMPTY}/>
            <TextLabel style={_styles.text} color={colors[theme].blackText}>{context.t('NoMessages')}</TextLabel>
          </View>
        </View>
      );
    }

    return (
      <View style={[_styles.container, style]}>
        <FlatList
          ref={ref => this.flatList = ref}
          data={items}
          renderItem={renderItem}
          onLayout={e => this.updateLayoutHeight(e)}
          onContentSizeChange={(w, h) => this.updateContentSize(w, h)}
          keyExtractor={this._keyExtractor}/>
        <View style={{height: 30}}>
          {typing && <TextLabel>{context.t('typing')}</TextLabel>}
        </View>
      </View>
    );
  }
}
