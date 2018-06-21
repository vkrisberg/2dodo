import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';

import {MainLayout, BackgroundLayout} from '../../../components/layouts';
import {ContactList} from '../../../components/lists';
import {Button, Checkbox, ContactListItem} from '../../../components/elements';
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


  renderContactList = ({item}) => {
    return (
      <ContactListItem
        item={item}
        checked={this.isContactChosen(item)}
        onPress={this.onContactPress(item)}
        onCheckboxPress={() => this.onContactCheckboxPress(item)}
        checkboxVisibility/>
    );
  };

  render() {
    const {context} = this;
    const {account, group} = this.props;
    const {checked} = this.state;
    const {theme} = account.user;
    const _styles = styles(theme);

    return (
      <MainLayout netOffline={!account.net.connected}>
        <BackgroundLayout theme={theme} paddingHorizontal={10}>
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
            {checked === 'findGroup' && context.t('InviteUsers')}
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
            <Text>CreateChannel</Text>
          }
          {checked === 'findGroup' &&
            <Text>findGroup</Text>
          }
        </BackgroundLayout>
      </MainLayout>
    );
  }
}

export default connect(state => ({
  account: state.account,
}))(Groups);
