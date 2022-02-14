import React from 'react';
import { render, screen } from "@testing-library/react";
import Pagination from '@/components/common/Pagination/Pagination'


describe("Pagination", () => {
    it("renders without crashing", () => {
        render(<Pagination pages={2}  currentPage={1} />);
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();

    });
});