import React from 'react';
import { render, screen } from "@testing-library/react";
import ModalComp from '.';


describe("ModalComp", () => {
    it("renders without crashing", () => {
        render(<ModalComp title='Modal Title' openModal={true} >Modal Content</ModalComp>);
        expect(screen.getByText('Modal Title')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

});