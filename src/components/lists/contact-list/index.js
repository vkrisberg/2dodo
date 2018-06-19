import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';

import {ContactsEmptyIcon} from '../../icons/index';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ContactList extends Component {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    theme: PropTypes.string,
    context: PropTypes.object,
  };

  static defaultProps = {
    items: [],
    renderItem: () => {},
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

  _keyExtractor = (item) => item.username;

  render() {
    const {items} = this.state;
    const {theme, context, renderItem} = this.props;
    const _styles = styles(theme);

    if (items.length) {
      return (
        <View style={_styles.container}>
          <View style={_styles.divider}/>
          <Text style={_styles.caption}>{`${context.t('SearchResults')} (${items.length})`}</Text>
          <FlatList
            ref={ref => this.flatList = ref}
            data={items}
            renderItem={renderItem}
            onLayout={e => this.updateLayoutHeight(e)}
            onContentSizeChange={(w, h) => this.updateContentSize(w, h)}
            keyExtractor={this._keyExtractor}
          />
        </View>
      );
    }

    return (
      <View style={_styles.emptyContactsView}>
        <ContactsEmptyIcon/>
        <Text style={_styles.text}>{context.t('NoContacts')}</Text>
      </View>
    );
  }
}
