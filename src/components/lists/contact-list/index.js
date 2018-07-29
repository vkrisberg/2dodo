import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RNLanguages from 'react-native-languages';
import {View, Text, FlatList, SectionList, TouchableOpacity, Image} from 'react-native';
import {range} from 'lodash';

import {TextLabel} from '../../elements';
import {ContactsEmptyIcon} from '../../icons/index';
import {themeEnum, alphabetEnum} from '../../../enums';
import {generateAlphabet} from '../../../utils';
import styles from './styles';
import {colors, sizes} from '../../../styles';

import IMG_MENU_DOTS from '../../elements/navbar-chat/img/menu_dots.png';

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

  renderLetterBlock = (letter, index, currentLetter, lettersArray, lastLetterCode) => {
    const _styles = styles(this.props.theme);

    return (
      <View key={index} style={_styles.alphabetBlock}>
        <TouchableOpacity onPress={() => this.onPressLetter(letter)}>
          <Text style={[_styles.alphabetLetter, currentLetter === letter && {color: colors[this.props.theme].blue}]}>{letter}</Text>
        </TouchableOpacity>
        {
          ((index !== (lettersArray.length - 1) && letter.charCodeAt(0) + 1 !== lettersArray[index + 1].charCodeAt(0)) ||
            ((lastLetterCode !== 90 || lastLetterCode !== 1071) && index === (lettersArray.length - 1) )) &&
          <Image style={_styles.alphabetLetterAfter} source={IMG_MENU_DOTS}/>
        }
      </View>
    );
  };

  renderLetters = (letterCount, planAddLetter, contactLettersLanguageLength, contactLettersMain, contactLettersSecond, startCode, finishCode) => {
    let renderLetters = [];
    let addedLetter = 0;

    if (contactLettersLanguageLength > 1) {
      let lastIndex = contactLettersMain[0].charCodeAt(0);

      contactLettersMain.map((item, index) => {
        const itemCode = item.charCodeAt(0);
        if(addedLetter < planAddLetter) {
          const letterDifference = itemCode - lastIndex;

          if(letterDifference > 1) {
            range(0, (letterDifference - 1), 1).map(item => {
              if (addedLetter < planAddLetter) {
                const currentLetter = String.fromCharCode(lastIndex + 1 + item);

                if(currentLetter.charCodeAt(0) >= startCode && currentLetter.charCodeAt(0) <= finishCode) {
                  renderLetters.push(currentLetter);
                  addedLetter++;
                }
              }
            });
          }
        }

        if(index !== 0) {
          lastIndex = itemCode;
        }
      });

      if(addedLetter < planAddLetter) {
        const firstLetterIndex = contactLettersMain[0].charCodeAt(0);
        const lastLetterIndex = contactLettersMain[contactLettersLanguageLength - 1].charCodeAt(0);
        const firstLetterDifference = firstLetterIndex - startCode;
        const lastLetterDifference = finishCode - lastLetterIndex;

        if (firstLetterDifference > lastLetterDifference) {
          range(1, (firstLetterDifference + 1), 1).map(item => {
            if(addedLetter < planAddLetter) {
              renderLetters.push(String.fromCharCode(firstLetterIndex - item));
              addedLetter++;
            }
          });
        }

        if (addedLetter < planAddLetter) {
          if(lastLetterDifference > 0) {
            range(1, (lastLetterDifference + 1), 1).map(item => {
              if (addedLetter < planAddLetter) {
                renderLetters.push(String.fromCharCode(lastLetterIndex + item));
                addedLetter++;
              }
            });
          }
        }
      }
    } else {
      const letterIndex = contactLettersMain[0].charCodeAt(0);
      const firstLetterDifference = letterIndex - startCode;
      const lastLetterDifference = finishCode - letterIndex;

      if (lastLetterDifference > 0) {
        range(1, (lastLetterDifference + 1), 1).map(item => {
          if (addedLetter < planAddLetter) {
            renderLetters.push(String.fromCharCode(letterIndex + item));
            addedLetter++;
          }
        });
      }

      if (addedLetter < planAddLetter) {
        range(1, (firstLetterDifference + 1), 1).map(item => {
          if (addedLetter < planAddLetter) {
            renderLetters.push(String.fromCharCode(letterIndex - item));
            addedLetter++;
          }
        });
      }
    }

    renderLetters = [...renderLetters, ...contactLettersMain, ...contactLettersSecond];
    renderLetters.sort(function(a, b){
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });

    return renderLetters;
  };

  renderAlphabet = (_styles, currentLetter) => {
    const {items} = this.state;
    const lng = RNLanguages.language.substr(0, 2);
    // const alphabet = generateAlphabet(alphabetEnum[lng].start, alphabetEnum[lng].end);
    const tabBarBottomHeight = 55;
    const searchInputHeight = 55;
    const containerHeight = sizes.windowHeight - sizes.navbarHeight - tabBarBottomHeight - searchInputHeight;
    const letterCount = Math.floor(containerHeight / _styles.alphabetBlock.height);
    let contactLettersEnglish = [];
    let contactLettersRussian = [];
    let contactLetters = [...contactLettersEnglish, ...contactLettersRussian];

    items.map(item => {
      const letter = item.title;
      const letterCode = letter.charCodeAt(0);

      if (letterCode >= 65 && letterCode <= 90) {
        contactLettersEnglish.push(letter);
      }

      if (letterCode >= 1040 && letterCode <= 1071) {
        contactLettersRussian.push(letter);
      }
    });

    if (contactLetters.length >= letterCount) {
      return (
        contactLetters.map((letter, index) => {
          if (index > letterCount) {
            return false;
          }

          const contactLettersLastLetterCode = contactLetters[contactLetters.length - 1].charCodeAt(0);

          return (
            this.renderLetterBlock(letter, index, currentLetter, contactLetters, contactLettersLastLetterCode)
          );
        })
      );
    }

    const contactLettersEnglishLength = contactLettersEnglish.length;
    const contactLettersRussianLength = contactLettersRussian.length;
    const planAddLetter = letterCount - contactLettersEnglishLength - contactLettersRussianLength;
    let renderLetters = [];

    if (lng === 'en' && contactLettersEnglish.length) {
      renderLetters = this.renderLetters(letterCount, planAddLetter, contactLettersEnglishLength, contactLettersEnglish, contactLettersRussian, 65, 90);
    } else if (lng === 'rus' && contactLettersRussian.length) {
      renderLetters = this.renderLetters(letterCount, planAddLetter, contactLettersRussianLength, contactLettersRussian, contactLettersEnglish, 1040, 1071);
    }

    const renderLettersLastLetterCode = renderLetters[renderLetters.length - 1].charCodeAt(0);

    return (
      renderLetters.map((letter, index) =>
        this.renderLetterBlock(letter, index, currentLetter, renderLetters, renderLettersLastLetterCode)
      )
    );
  };

  renderSectionList = (_styles) => {
    const {items} = this.state;
    const {renderItem, currentLetter} = this.props;

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
          {this.renderAlphabet(_styles, currentLetter)}
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
