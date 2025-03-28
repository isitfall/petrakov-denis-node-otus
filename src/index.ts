import { Data } from "./types";
import { mockData, mockData1 } from "./mock";
import { reduceNested } from "./utils";


const buildTree = (data: Data): string => {
    return [data].reduce((acc, current) => {
        acc = current.name.toString();
        if (current?.items?.length) {
            acc += reduceNested(current.items);
        }
        return acc;
    }, '')
}

console.log('build tree mockData')
console.log(buildTree(mockData))
console.log('build tree mockData1')
console.log(buildTree(mockData1))