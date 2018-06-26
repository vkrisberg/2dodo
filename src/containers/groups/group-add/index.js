import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ContactList, GroupList} from '../../../components/lists';
import {Button, Checkbox, ContactListItem, SearchInput, GroupListItem} from '../../../components/elements';
import {CreateChannel} from '../../../components/forms';
import {ArrowIcon} from '../../../components/icons';
import {colors} from "../../../styles";
import styles from './styles';

const Contactslist = [
  {
    username: 'Abbysal Blade',
  },
  {
    username: 'Lisa Simpson',
  },
  {
    username: 'Margharet Simpson',
  },
  {
    username: 'Gomer Simpson',
  },
  {
    username: 'Professor',
  },
];

const list = [
  {
    name: 'Simpson\'s Family',
    properties: {
      avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Simpsons_FamilyPicture.png/220px-Simpsons_FamilyPicture.png',
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-06-21 21:30',
      unreadCount: 24
    },
  },
  {
    name: 'AIGO Big Group',
    properties: {
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-04-10 21:30',
    },
  },
  {
    name: 'AIGO Big Group',
    properties: {
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-04-10 21:30',
    },
  },
  {
    name: 'AIGO Big Group',
    properties: {
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-04-10 21:30',
    },
  },
  {
    name: 'AIGO Big Group',
    properties: {
      quote: 'Mom, we need a new father!',
      user: 'Lisa Simpson',
      dateUpdate: '2018-04-10 21:30',
    },
  },
];

class Groups extends Component {

  static propTypes = {
    account: PropTypes.object,
    group: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({navigate: PropTypes.func}),
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: 'groupChat',
    };
  }

  onNext = () => {};

  onCheckboxPress = (checkbox) => {
    this.setState({
      checked: checkbox,
    });
  };

  isContactChosen = (contact) => {};

  onContactPress = (contact) => {};

  onContactCheckboxPress = (contact) => {};

  onSearchChange = () => {};

  onEmptyBlock = () => {};

  onGroupPress = () => {};

  onGroupLongPress = () => {};

  renderContactList = ({item}) => {
    return (
      <ContactListItem
        item={item}
        context={this.context}
        checked={this.isContactChosen(item)}
        onPress={this.onContactPress(item)}
        onCheckboxPress={() => this.onContactCheckboxPress(item)}
        checkboxVisibility/>
    );
  };

  renderGroupItem = ({item}) => {
    const {account} = this.props;

    return (
      <GroupListItem item={item}
        theme={account.user.theme}
        context={this.context}
        showRightBlock={false}
        onPress={this.onGroupPress}
        onLongPress={this.onGroupLongPress}/>
    );
  };

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const {checked} = this.state;
    const {theme} = account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <DismissKeyboardLayout style={{width: '100%', flex: 1}}>
            <View style={_styles.header}>
              <View style={_styles.titleContainer}>
                <TouchableOpacity onPress={this.goBack}>
                  <ArrowIcon />
                </TouchableOpacity>
                <Text style={_styles.styledTitle}>{context.t('GroupCreate')}</Text>
                <Button
                  style={_styles.editBtn}
                  color={colors[theme].blue}
                  onPress={this.onNext}>
                  {context.t('Next')}
                </Button>
              </View>
            </View>
            <View style={_styles.top}>
              <View style={_styles.actionItem}>
                <Text style={_styles.text}>{context.t('CroupChat')}</Text>
                <Checkbox
                  input={{value: checked === 'groupChat', onChange: () => this.onCheckboxPress('groupChat')}}
                  style={_styles.checkbox}/>
              </View>
              <View style={_styles.actionItem}>
                <Text style={_styles.text}>{context.t('CreateChannel')}</Text>
                <Checkbox
                  input={{value: checked === 'createChannel', onChange: () => this.onCheckboxPress('createChannel')}}
                  style={_styles.checkbox}/>
              </View>
              <View style={_styles.actionItem}>
                <Text style={_styles.text}>{context.t('FindGroup')}</Text>
                <Checkbox
                  input={{value: checked === 'findGroup', onChange: () => this.onCheckboxPress('findGroup')}}
                  style={_styles.checkbox}/>
              </View>
            </View>
            <Text style={_styles.caption}>
              {checked === 'groupChat' && context.t('InviteUsers')}
              {checked === 'createChannel' && context.t('InviteUsers')}
              {checked === 'findGroup' && context.t('SearchGroupsOnly')}
            </Text>
            {checked === 'groupChat' && <ContactList context={context} items={Contactslist} renderItem={this.renderContactList} showTop={false}/>}
            {checked === 'groupChat' &&
            <View style={_styles.btnContainer}>
              <Button
                style={_styles.btn}
                backgroundColor={colors[theme].white}
                onPress={this.onNext}>
                <Text style={_styles.btnText}>{context.t('NextStep')}</Text>
              </Button>
            </View>
            }
            {checked === 'createChannel' &&
              <ScrollView>
                <CreateChannel
                  theme={theme}
                  context={context}/>
              </ScrollView>
            }
            {checked === 'findGroup' &&
              <View style={_styles.searchBlock}>
                <SearchInput
                  styledInput={_styles.styledInput}
                  inputViewStyles={_styles.inputViewStyles}
                  styledPlaceholder={_styles.searchPlaceholder}
                  placeholder={context.t('SearchGlobalGroups')}
                  onChange={this.onSearchChange}/>
                <GroupList
                  theme={theme}
                  context={this.context}
                  items={list}
                  renderItem={this.renderGroupItem}
                  onEmptyBlock={this.onEmptyBlock}/>
              </View>
            }
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Groups);
