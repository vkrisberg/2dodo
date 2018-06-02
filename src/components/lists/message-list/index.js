import React, {PureComponent} from 'react';
import {FlatList, Keyboard, Dimensions, Platform} from 'react-native';
import PropTypes from 'prop-types';

import {Wrapper} from './styles';

const OS = Platform.OS;
const NAVIGATION_HEIGHT = OS === 'ios' ? 64 : 54;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class MessagesList extends PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired,
    verticalOffset: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.flatList = null;
    this.listHeight = WINDOW_HEIGHT - NAVIGATION_HEIGHT - (props.verticalOffset || 0);

    this.state = {
      data: [],
      isKeyboardActive: false,
      contentSize: 0,
      layoutHeight: 0,
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillReceiveProps({data}) {
    if (this.state.data.length !== data.length) {
      this.setState({data});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.length !== this.state.data.length) {
      this.flatList.scrollToEnd();
    }

    if (prevState.contentSize !== this.state.contentSize) {
      this.flatList.scrollToEnd();
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
    this.flatList.scrollToEnd();
  };

  keyboardWillHide = (e) => {
  };

  keyboardDidHide = () => {
    this.setState({isKeyboardActive: false});
    this.flatList.scrollToEnd();
  };

  updateLayoutHeight(e) {
    this.setState({layoutHeight: e.nativeEvent.layout.height});
  }

  updateContentSize(w, h) {
    this.setState({contentSize: h});
  }

  _keyExtractor = (item) => item.id;

  render() {
    const {data, renderItem} = this.props;

    return (
      <Wrapper height={this.listHeight}>
        <FlatList
          ref={ref => this.flatList = ref}
          data={data}
          renderItem={renderItem}
          onLayout={e => this.updateLayoutHeight(e)}
          onContentSizeChange={(w, h) => this.updateContentSize(w, h)}
          keyExtractor={this._keyExtractor}/>
      </Wrapper>
    );
  }
}
