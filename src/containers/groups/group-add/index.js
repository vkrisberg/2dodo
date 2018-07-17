import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ContactList, GroupList} from '../../../components/lists';
import {Button, Checkbox, ContactListItem, SearchInput, GroupPublicListItem, Loader, ButtonBack, ButtonNavbar, Navbar} from '../../../components/elements';
import {CreateChannel} from '../../../components/forms';
import {groupActions} from '../../../store/actions';
import {routeEnum} from '../../../enums';
import {colors} from '../../../styles';
import styles from './styles';

class GroupAdd extends Component {

  static propTypes = {
    account: PropTypes.object,
    contact: PropTypes.object,
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
      chosenContacts: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(groupActions.getPublicGroupList());
  }

  getAccountUserData = () => {
    let accountUserData = Object.assign({}, this.props.account.user);

    if (accountUserData.fullName) {
      accountUserData.fullName = `${this.context.t('Me')}: ${accountUserData.fullName}`;
    } else {
      accountUserData.username = `${this.context.t('Me')}: ${accountUserData.username}`;
    }

    return accountUserData;
  };

  onNext = (checked) => {
    switch (checked) {
      case 'groupChat':
        if(this.state.chosenContacts.length > 0) {
          this.props.navigation.navigate(routeEnum.GroupCreate, {users: [this.getAccountUserData(), ...this.state.chosenContacts]});
        } else {
          Alert.alert(this.context.t('NoUserAddInGroup'));
        }
        break;
      case 'createChannel':
        alert('createChannel');
        break;
      default:
        alert(this.context.t('UnexpectedError'));
    }
  };

  renderNavbarButton = (theme) => {
    return (
      <ButtonNavbar
        position="right"
        onPress={() => this.onNext(this.state.checked)}
        color={colors[theme].blue}>
        {this.context.t('Next')}
      </ButtonNavbar>
    );
  };

  onCheckboxPress = (checkbox) => {
    this.setState({
      checked: checkbox,
    });
  };

  onSearchChange = (text) => {
    this.props.dispatch(groupActions.filterPublicGroup(text));
  };

  isContactChosen = (contact) => {
    return this.state.chosenContacts.find(item => item === contact);
  };

  onContactCheckboxPress = (contact) => {
    const {chosenContacts} = this.state;
    const contactCheck = chosenContacts.find(item => item === contact);

    if (contactCheck) {
      this.setState({chosenContacts: chosenContacts.filter(item => item !== contact)});
    } else {
      this.setState({chosenContacts: [...chosenContacts, contact]});
    }
  };

  onGroupPress = (link) => {
    this.props.dispatch(groupActions.subscribeToGroup(link))
      .then(() => this.props.navigation.goBack())
      .catch((e) => {
        if(e.message === 'AlreadyInGroup') {
          Alert.alert(this.context.t('AlreadyInGroup'));
        } else {
          Alert.alert(this.context.t('UnexpectedError'));
        }
      });
  };

  onGroupLongPress = () => {};

  renderContactList = ({item}) => {
    return (
      <ContactListItem
        item={item}
        context={this.context}
        checked={this.isContactChosen(item)}
        onPress={() => this.onContactCheckboxPress(item)}
        onCheckboxPress={() => this.onContactCheckboxPress(item)}
        checkboxVisibility/>
    );
  };

  renderGroupItem = ({item}) => {
    const {account} = this.props;

    return (
      <GroupPublicListItem item={item}
        theme={account.user.theme}
        context={this.context}
        showRightBlock={false}
        onPress={() => this.onGroupPress(item.link)}
        onLongPress={this.onGroupLongPress}/>
    );
  };

  render() {
    const {context} = this;
    const {account, group, contact} = this.props;
    const {checked} = this.state;
    const {theme} = account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          <Navbar
            renderTitle={context.t('GroupCreate')}
            renderLeft={<ButtonBack/>}
            renderRight={checked !== 'findGroup' && this.renderNavbarButton(theme)}/>
          <DismissKeyboardLayout style={{width: '100%', flex: 1}}>
            <View style={_styles.top}>
              <View style={_styles.actionItemWrap}>
                <TouchableOpacity style={_styles.actionItem} onPress={() => this.onCheckboxPress('groupChat')}>
                  <Text style={_styles.text}>{context.t('CroupChat')}</Text>
                  <Checkbox
                    input={{value: checked === 'groupChat', onChange: () => this.onCheckboxPress('groupChat')}}
                    style={_styles.checkbox}/>
                </TouchableOpacity>
              </View>
              <View style={_styles.actionItemWrap}>
                <TouchableOpacity style={_styles.actionItem} onPress={() => this.onCheckboxPress('createChannel')}>
                  <Text style={_styles.text}>{context.t('CreateChannel')}</Text>
                  <Checkbox
                    input={{value: checked === 'createChannel', onChange: () => this.onCheckboxPress('createChannel')}}
                    style={_styles.checkbox}/>
                </TouchableOpacity>
              </View>
              <View style={_styles.actionItemWrap}>
                <TouchableOpacity style={_styles.actionItem} onPress={() => this.onCheckboxPress('findGroup')}>
                  <Text style={_styles.text}>{context.t('FindGroup')}</Text>
                  <Checkbox
                    input={{value: checked === 'findGroup', onChange: () => this.onCheckboxPress('findGroup')}}
                    style={_styles.checkbox}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={_styles.fullWrap}>
              <Text style={_styles.caption}>
                {checked === 'groupChat' && context.t('InviteUsers')}
                {checked === 'createChannel' && context.t('InviteUsers')}
                {checked === 'findGroup' && context.t('SearchGroupsOnly')}
              </Text>
              {checked === 'groupChat' &&
                <View style={{flex: 1}}>
                  {group.loading && <Loader inheritSizes/>}
                  <ContactList context={context} items={contact.list} renderItem={this.renderContactList} showTop={false} showSearchResult={false}/>
                </View>}
              {checked === 'groupChat' &&
              <View style={_styles.btnContainer}>
                <Button
                  style={_styles.btn}
                  backgroundColor={colors[theme].white}
                  onPress={() => this.onNext(this.state.checked)}>
                  <Text style={_styles.btnText}>{context.t('NextStep')}</Text>
                </Button>
              </View>}
              {checked === 'createChannel' &&
              <ScrollView>
                <CreateChannel
                  theme={theme}
                  context={context}/>
              </ScrollView>}
              {checked === 'findGroup' &&
              <View style={_styles.searchBlock}>
                <SearchInput
                  styledInput={_styles.styledInput}
                  inputViewStyles={_styles.inputViewStyles}
                  styledPlaceholder={_styles.searchPlaceholder}
                  placeholder={context.t('SearchGlobalGroups')}
                  onChange={this.onSearchChange}/>
                <View style={_styles.fullWrap}>
                  {group.getPublicListLoading && <Loader inheritSizes/>}
                  <GroupList
                    theme={theme}
                    context={this.context}
                    items={group.filteredPublicList}
                    renderItem={this.renderGroupItem}/>
                </View>
              </View>}
            </View>
          </DismissKeyboardLayout>
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
  contact: state.contact,
  group: state.group,
}))(GroupAdd);
