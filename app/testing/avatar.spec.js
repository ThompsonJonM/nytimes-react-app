// Dependencies
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Avatar from '../lib/avatar';

describe('<Avatar/>', function() {
    it('Should have an image to display a gravatar', function() {

        // shallow isolates the component for testing
        const wrapper = shallow(<Avatar/>);
        expect(wrapper.find('img')).to.have.length(1);
    });

    it('Should have props for email and src', function() {

        // shallow isolates the component for testing
        const wrapper = shallow(<Avatar/>);
        expect(wrapper.props().email).to.be.defined;
        expect(wrapper.props().src).to.be.defined;
    });
});