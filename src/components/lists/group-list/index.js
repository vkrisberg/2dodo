import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, Image} from 'react-native';

import {themeEnum} from '../../../enums';
import styles from './styles';

import emptyIcon from './img/group_empty.png';

export default class GroupList extends Component {

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
    sections: false,
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

  _keyExtractor = (item) => item.id;

  render() {
    const {items} = this.state;
    const {theme, context, renderItem} = this.props;
    const _styles = styles(theme);

    if (items.length) {
      return (
        <View style={_styles.container}>
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
      <View style={_styles.emptyBlockWrap}>
        <View
          style={_styles.emptyBlock}>
          <Image source={emptyIcon}/>
          <View marginTop={20}>
            <Text style={_styles.text}>{context.t('NoGroupsInvited')}</Text>
          </View>
          <Text style={_styles.text}>{context.t('SearchGroups')}</Text>
        </View>
      </View>
    );
  }
}
