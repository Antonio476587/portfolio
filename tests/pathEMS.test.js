import { __dirname as __rootDirname } from "../utils/pathEMS.js";

import path from "node:path";

test("The __root_dirname should be part of the __filename and __dirname", () => {

    expect(path.join(__rootDirname, "tests")).toEqual(__dirname);
    expect(path.resolve(__rootDirname, "tests", "pathEMS.test.js")).toEqual(__filename);

});

