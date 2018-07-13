import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';

import {MainLayout, BackgroundLayout, DismissKeyboardLayout} from '../../../components/layouts';
import {ContactList, GroupList} from '../../../components/lists';
import {Button, Checkbox, ContactListItem, SearchInput, GroupPublicListItem, Loader, ButtonBack, ButtonNavbar, Navbar} from '../../../components/elements';
import {CreateChannel} from '../../../components/forms';
import {groupActions} from '../../../store/actions';
import {colors} from '../../../styles';
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

  componentDidMount() {
    this.props.dispatch(groupActions.getPublicGroupList());
  }

  onNext = () => {};

  renderNavbarButton = (theme) => {
    return (
      <ButtonNavbar position="right" onPress={this.onNext} color={colors[theme].blue}>{this.context.t('Next')}</ButtonNavbar>
    );
  };

  onCheckboxPress = (checkbox) => {
    this.setState({
      checked: checkbox,
    });
  };

  isContactChosen = (contact) => {};

  onContactPress = (contact) => {};

  onContactCheckboxPress = (contact) => {};

  onSearchChange = () => {};


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
        onPress={this.onContactPress(item)}
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
    const {account, group} = this.props;
    const {checked} = this.state;
    const {theme} = account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected} wsConnected={account.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
          {group.loading && <Loader/>}
          <Navbar
            renderTitle={context.t('GroupCreate')}
            renderLeft={<ButtonBack/>}
            renderRight={this.renderNavbarButton(theme)}/>
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
                  items={group.publicList}
                  renderItem={this.renderGroupItem}/>
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
  group: state.group,
}))(Groups);
