import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {withNavigation} from 'react-navigation';

import Title from '../../../elements/title';
import Input from '../../../elements/input';
import Button from '../../../elements/button';
import AvatarIcon from '../../../icons/avatar-icon';
import ThemeButton from './components/theme-button';
import {
  StyledTitle,
  DescriptionWrapper,
  Description,
  ButtonWrapper,
  StyledImage,
  Container
} from './styles';

class SettingsForm extends Component {

  setDayTheme = () => {
    return null;
  }

  setNightTheme = () => {
    return null;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Title style={StyledTitle}>Settings</Title>
        <DescriptionWrapper>
          <Description>
            You can set up the application or skip
            this step until better times
          </Description>
        </DescriptionWrapper>
        <StyledImage>
          <AvatarIcon />
        </StyledImage>
        <ButtonWrapper>
          <ThemeButton markColor="black" marginRight={15} />
          <ThemeButton markColor="#333" night />
        </ButtonWrapper>
        <Field
          focusedColor="#7bb2ff"
          name="name"
          component={Input}
          placeholder="Name"
        />
        <Field
          focusedColor="#7bb2ff"
          name="secondName"
          component={Input}
          placeholder="Second Name"
        />
        <Description marginBottom={20}>
          Get 2dodo access to push notifications
          to recieve a messages
        </Description>
        <Button color="black" onPress={handleSubmit}>
          Done
        </Button>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'registration',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(withNavigation(SettingsForm));
