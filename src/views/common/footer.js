import * as React from 'react'
import { Footer, FooterTab, Button, Icon } from 'native-base'

export default ({ navigation }) => (
        <Footer>
          <FooterTab>
            <Button data-testid="footer-home-button" onClick={() => navigation.navigate('Home')}>
              <Icon name="apps" />
            </Button>
            <Button data-testid="footer-profile-button" onClick={() => navigation.navigate('Details')}>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
    )