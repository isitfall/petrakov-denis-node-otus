import { mockData, mockData1 } from "../mock";
import { buildTree } from "../index";
import { Data } from "../types";
import { HORIZONTAL_LINE, LAST_NEST_SIGN, NEST_SIGN } from "../consts";
import { describe } from "node:test";
import * as utilsModule from "../utils";

beforeEach(() => {
    jest.resetAllMocks();
});


describe('build tree', () => {
    it.each([
        [mockData],
        [mockData1],
    ])('should match snapshot', (data) => {
        expect(buildTree(data)).toMatchSnapshot();
    })

    it('should handle an empty items array', () => {
        const input: Data = {
            name: 1,
            items: [],
        };
        const result = buildTree(input);
        expect(result).toBe('1');
    });

    it('should handle multiple levels of nested items', () => {
        const input: Data = {
            name: 1,
            items: [
                {
                    name: 2,
                    items: [
                        {name: 3},
                        {name: 4},
                    ],
                },
                {name: 5},
            ],
        };
        const expectedOutput = '1\n├──2\n│  ├──3\n│  └──4\n└──5';
        const result = buildTree(input);

        expect(result).toBe(expectedOutput);
    });

    it('should use constants correctly', () => {
        const input: Data = {
            name: 1,
            items: [
                {name: 2, items: [{name: 3}]},
                {name: 4},
            ],
        };
        const result = buildTree(input);

        expect(result).toContain(NEST_SIGN);
        expect(result).toContain(LAST_NEST_SIGN);
        expect(result).toContain(HORIZONTAL_LINE);
    });


    it.each([
        [{name: 1}, 0],
        [{name: 1, items: []}, 0],
        [mockData, 1],
        [mockData1, 1],
    ])('should run mock times', (data, times) => {
        const mockReduceNested = jest.spyOn(utilsModule, 'reduceNested').mockImplementation(() => '');

        buildTree(data);
        expect(mockReduceNested).toHaveBeenCalledTimes(times);
    })
})