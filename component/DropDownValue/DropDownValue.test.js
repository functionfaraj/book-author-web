import React from 'react';
import { render } from "@testing-library/react";
import DropDownValue from './DropDownValue'


describe("DropDownValue", () => {
    it("renders without crashing", () => {
        render(<DropDownValue
            id='gender'
            placeholder="Gender"
            options={[{ name: 'Male' }, { name: 'Female' }]}
            value={'Male'}
            setCB={(value) => console.log(value?.name)}
        />);
    });

});