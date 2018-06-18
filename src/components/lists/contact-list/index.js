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
    onContactPress: PropTypes.func,
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
    this.state = {
      items: props.items,
    };
  }

  componentDidMount() {
    return null;
  }

  componentDidUpdate() {
    if (this.state.items.length !== this.props.items.length) {
      this.setState({items: this.props.items});
    }
  }

  _keyExtractor = (item, index) => index;

  render() {
    const {theme, context, renderItem} = this.props;
    const {items} = this.state;
    const _styles = styles(theme);

    if (items.length) {
      return (
        <View style={_styles.wrapper}>
          <View style={_styles.divider}/>
          <Text style={_styles.caption}>{`${context.t('SearchResults')} (${items.length})`}</Text>
          <FlatList
            data={items}
            renderItem={renderItem}
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
