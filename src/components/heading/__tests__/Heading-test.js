import React from 'react';

import Heading from '..';

describe('components/heading/Heading', () => {
    test('should correctly render h1', () => {
        const wrapper = shallow(<Heading level={1}>BDL</Heading>);
        expect(wrapper.type()).toEqual('h1');
        expect(wrapper.hasClass('bdl-h1')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render h2', () => {
        const wrapper = shallow(<Heading level={2}>BDL</Heading>);
        expect(wrapper.type()).toEqual('h2');
        expect(wrapper.hasClass('bdl-h2')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render h3', () => {
        const wrapper = shallow(<Heading level={3}>BDL</Heading>);
        expect(wrapper.type()).toEqual('h3');
        expect(wrapper.hasClass('bdl-h3')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render h4', () => {
        const wrapper = shallow(<Heading level={4}>BDL</Heading>);
        expect(wrapper.type()).toEqual('h4');
        expect(wrapper.hasClass('bdl-h4')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render h5', () => {
        const wrapper = shallow(<Heading level={5}>BDL</Heading>);
        expect(wrapper.type()).toEqual('h5');
        expect(wrapper.hasClass('bdl-h5')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
    test('should correctly render h6', () => {
        const wrapper = shallow(<Heading level={6}>BDL</Heading>);
        expect(wrapper.type()).toEqual('h6');
        expect(wrapper.hasClass('bdl-h6')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});
