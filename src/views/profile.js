import * as React from 'react'
import { Container, Content } from 'native-base'
import Footer from './common/footer'

export default ({ navigation }) => (
      <Container>
        <Content />
        <Footer navigation={navigation} />
      </Container>
    )