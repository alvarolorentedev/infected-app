import * as React from 'react'
import { shallow } from 'enzyme'
import Footer from '../../../src/views/common/footer'

describe('<Footer />', () => {
    const navigation = {
        navigate: jest.fn()
    }
    const wrapper = shallow(<Footer navigation={navigation} />);

    beforeEach(() => {
        navigation.navigate.mockClear()
    });

    describe('home section', () => {
        const homeButton = wrapper.find('[data-testid="footer-home-button"]')
        test('should have button with apps icon', () => {
            expect(homeButton.exists()).toBeTruthy()
            const Icon = homeButton.childAt(0)
            expect(Icon.props().name).toEqual("apps")
        });

        test('should call navigate to home on click event', () => {
            homeButton.simulate('click')
            expect(navigation.navigate).toHaveBeenCalledWith('Home')
        });
    });

    describe('profile section', () => {
        const homeButton = wrapper.find('[data-testid="footer-profile-button"]')
        test('should have button with apps icon', () => {
            expect(homeButton.exists()).toBeTruthy()
            const Icon = homeButton.childAt(0)
            expect(Icon.props().name).toEqual("person")
        });

        test('should call navigate to profile on click event', () => {
            homeButton.simulate('click')
            expect(navigation.navigate).toHaveBeenCalledWith('Details')
        });
    });

    
});