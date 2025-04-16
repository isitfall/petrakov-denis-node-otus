import { mockData, mockData1 } from "../mock";
import { reduceNested } from "../utils";
import { Data } from "../types";
import { LAST_NEST_SIGN, NEST_SIGN } from "../consts";

describe('testing utils', () => {
    it.each([
        [mockData],
        [mockData1],
    ])('should match snapshot', (data) => {
        expect(reduceNested([data])).toMatchSnapshot();
    })

    it('should return empty string', () => {
        const input: Data[] = [];
        const result = reduceNested(input);
        expect(result).toBe('');
    })

    it('should handle multiple elements without children', () => {
        const input: Data[] = [{name: 1}, {name: 2}];
        const result = reduceNested(input);
        expect(result).toBe(`\n${NEST_SIGN}1\n${LAST_NEST_SIGN}2`);
    })
})