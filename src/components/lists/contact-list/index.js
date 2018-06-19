import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import RNLanguages from 'react-native-languages';
import {View, Text, FlatList, SectionList} from 'react-native';

import {generateAlphabet} from '../../../utils';
import {ContactsEmptyIcon} from '../../icons/index';
import {themeEnum} from '../../../enums';
import styles from './styles';

export default class ContactList extends PureComponent {

  static propTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    theme: PropTypes.string,
    context: PropTypes.object,
    sections: PropTypes.bool,
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
    const {theme, context, renderItem, sections} = this.props;
    const lng = RNLanguages.language.substr(0, 2);
    const _styles = styles(theme);
    let alphabet = null;

    if (lng === 'ru') {
      alphabet = generateAlphabet('а', 'я');
    } else {
      alphabet = generateAlphabet('a', 'z');
    }

    if (items.length) {
      if (sections) {
        return (
          <View style={_styles.sectionWrapper}>
            <SectionList
              style={_styles.section}
              ref={ref => this.flatList = ref}
              sections={items}
              renderItem={renderItem}
              onLayout={e => this.updateLayoutHeight(e)}
              onContentSizeChange={(w, h) => this.updateContentSize(w, h)}
              keyExtractor={this._keyExtractor}
              renderSectionHeader={({section: {title}}) => (
                <View style={_styles.sectionHeader}>
                  <Text style={_styles.sectionLeft}>{title}</Text>
                  {!(title === 'Me' || title === 'Я') && <View style={[_styles.divider]}/>}
                </View>
              )}
            />
            <View style={_styles.alphabet}>
              {
                alphabet.map( (letter, index) =>
                  <Text key={index} style={_styles.alphabetLetter}>{letter}</Text>
                )
              }
            </View>
          </View>
        );
      }

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
