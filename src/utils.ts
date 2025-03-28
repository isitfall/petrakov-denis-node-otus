import { Data } from "./types";
import { BASE_NESTED_COUNT, HORIZONTAL_LINE, LAST_NEST_SIGN, NEST_SIGN, TAB } from "./consts";

export const reduceNested = (data: Data[], nestedCount = BASE_NESTED_COUNT): string => {
    return data.reduce((acc, current, index, arr) => {
        const hasChildren = current?.items?.length;
        const nestedSign = index !== arr.length - 1 || hasChildren ? NEST_SIGN : LAST_NEST_SIGN;
        const horizontalLine = nestedCount > BASE_NESTED_COUNT ? HORIZONTAL_LINE : '';
        acc += '\n' + horizontalLine + TAB.repeat(nestedCount) + nestedSign + current.name;
        if (hasChildren) {
            acc += reduceNested(current.items, nestedCount + 1)
        }
        return acc
    }, '')
}