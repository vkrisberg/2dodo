import React, {PureComponent} from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class ChatList extends PureComponent {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    verticalOffset: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    items: [],
    renderItem: () => null,
    verticalOffset: 0,
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
    const {renderItem, verticalOffset, style} = this.props;
    const _styles = styles(verticalOffset);

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
