import React, {PureComponent} from 'react';
import {View, FlatList, Image} from 'react-native';
import PropTypes from 'prop-types';

import {TextLabel} from '../../elements';
import {themeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

import IMG_CHATS_EMPTY from './img/chat_empty.png';

export default class ChatList extends PureComponent {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    theme: PropTypes.string,
    context: PropTypes.object,
    style: PropTypes.any,
  };

  static defaultProps = {
    items: [],
    renderItem: () => null,
    theme: themeEnum.light,
  };

  constructor(props) {
    super(props);

    this.flatList = null;

    this.state = {
      items: props.items,
      contentSize: 0,
      layoutHeight: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.items.length !== this.props.items.length) {
      this.setState({items: this.props.items});
    }
  }

  updateLayoutHeight(e) {
    this.setState({layoutHeight: e.nativeEvent.layout.height});
  }

  updateContentSize(w, h) {
    this.setState({contentSize: h});
  }

  _keyExtractor = (item) => item.id;

  render() {
    const {items} = this.state;
    const {renderItem, theme, context, style} = this.props;
    const _styles = styles({theme});

    if (!items.length) {
      return (
        <View style={_styles.emptyContainer}>
          <Image source={IMG_CHATS_EMPTY}/>
          <TextLabel style={_styles.text} color={colors[theme].blackText}>{context.t('NoChats')}</TextLabel>
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
      </View>
    );
  }
}
