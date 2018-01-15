// 'use strict';


const complexity    = require("./dbj_complex_comparators_testing.js");
const nanotest = require("./nanotest.js");
const tape = require("tape");

// complexity.run();

{
    // in node this == module.exports object
    // how do we know that ?
    // side note: bellow we need var if we switch to 'use strict;
    //
    const local_to_module = "Dummy";
    //
    // above is the same as this.local_to_module
    // 
    // nanotest.context = module.exports ;
    nanotest.do(module.exports, "local_to_module", "Dummy");
        // tape.comment("this == module.exports");
}

