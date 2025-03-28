import { Data } from "./types";

export const mockData: Data = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{"name": 3}, {"name": 4}]
    }, {
        "name": 5,
        "items": [{"name": 6}]
    }]
}

export const mockData1: Data = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{"name": 3}, {"name": 4, items: [{"name": 5}]}, {
            "name": 6,
            items: [{"name": 7, items: [{name: 8}, {name: 9}]}]
        }, {"name": 10}]
    }, {
        "name": 11,
        "items": [{"name": 12}]
    }, {name: 13}]
}