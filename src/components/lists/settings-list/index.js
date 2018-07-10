import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';

export default class SettingsList extends Component {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    styles: PropTypes.any,
  };

  static defaultProps = {
    items: [],
    renderItem: () => {},
    styles: {},
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

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.setState({items: this.props.items});
    }
  }

  updateLayoutHeight(e) {
    this.setState({layoutHeight: e.nativeEvent.layout.height});
  }

  updateContentSize(w, h) {
    this.setState({contentSize: h});
  }

  _keyExtractor = (item) => item.username;

  render() {
    const {items} = this.state;
    const {renderItem, styles} = this.props;

    return (
      <FlatList
        ref={ref => this.flatList = ref}
        data={items}
        renderItem={renderItem}
        style={styles}
        onLayout={e => this.updateLayoutHeight(e)}
        onContentSizeChange={(w, h) => this.updateContentSize(w, h)}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}
