import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RNLanguages from 'react-native-languages';
import {View, Text, FlatList, SectionList, TouchableOpacity} from 'react-native';

import {TextLabel} from '../../elements';
import {ContactsEmptyIcon} from '../../icons/index';
import {themeEnum, alphabetEnum} from '../../../enums';
import {generateAlphabet} from '../../../utils';
import styles from './styles';
import {colors} from '../../../styles';

export default class ContactList extends Component {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    onPressLetter: PropTypes.func,
    sections: PropTypes.bool,
    showSearchResult: PropTypes.bool,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onViewableItemsChanged: PropTypes.func,
    onScrollBeginDrag: PropTypes.func,
    theme: PropTypes.string,
    context: PropTypes.object,
    style: PropTypes.any,
    currentLetter: PropTypes.string,
  };

  static defaultProps = {
    items: [],
    renderItem: () => {
    },
    onPressLetter: () => {
    },
    theme: themeEnum.light,
    sections: false,
    showSearchResult: true,
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

  onPressLetter = (letter) => {
    this.props.onPressLetter(letter);
  };

  renderSearchResult = (_styles) => {
    const {theme, context} = this.props;

    if (this.props.showSearchResult) {
      return (
        <TextLabel style={_styles.searchResult}
                   color={colors[theme].grayInput}
                   size={13}>
          {`${context.t('SearchResults')} (${this.state.items.length})`}
        </TextLabel>
      );
    }
  };

  renderSectionList = (_styles) => {
    const {items} = this.state;
    const {renderItem, currentLetter, refreshing, onRefresh, onViewableItemsChanged, onScrollBeginDrag} = this.props;
    const lng = RNLanguages.language.substr(0, 2);
    const alphabet = generateAlphabet(alphabetEnum[lng].start, alphabetEnum[lng].end);

    return (
      <View style={_styles.sectionContainer}>
        <SectionList
          ref={ref => this.sectionListRef = ref}
          sections={items}
          renderItem={renderItem}
          onLayout={e => this.updateLayoutHeight(e)}
          onContentSizeChange={(w, h) => this.updateContentSize(w, h)}
          keyExtractor={this._keyExtractor}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onScrollBeginDrag={onScrollBeginDrag}
          onViewableItemsChanged={onViewableItemsChanged}
          renderSectionHeader={({section: {title}}) => (
            <View style={_styles.sectionHeader}>
              <Text style={_styles.sectionLeft}>{title}</Text>
              {!(title === 'Me' || title === 'Я') && <View style={[_styles.divider]}/>}
            </View>
          )}
        />
        <View style={_styles.alphabet}>
          {
            alphabet.map((letter, index) =>
              <TouchableOpacity key={index} onPress={() => this.onPressLetter(letter)}>
                <Text style={[_styles.alphabetLetter, currentLetter === letter && {color: colors[this.props.theme].blue}]}>{letter}</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    );
  };

  renderFlatList = (_styles) => {
    const {items} = this.state;
    const {renderItem} = this.props;

    return (
      <View>
        {this.renderSearchResult(_styles)}
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
  };

  render() {
    const {items} = this.state;
    const {sections, theme, context, style} = this.props;
    const _styles = styles(theme);

    if (!items.length) {
      return (
        <View style={_styles.emptyContainer}>
          <View style={_styles.emptyWrapper}>
            <ContactsEmptyIcon/>
            <TextLabel style={_styles.text} color={colors[theme].blackText}>{context.t('NoContacts')}</TextLabel>
          </View>
        </View>
      );
    }

    return (
      <View style={[_styles.container, style]}>
        {sections && this.renderSectionList(_styles)}
        {!sections && this.renderFlatList(_styles)}
      </View>
    );
  }
}
