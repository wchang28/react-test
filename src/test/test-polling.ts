import * as pl from "../utils/polling";

type TestMode = "LongWorkTime_ShortPollingInterval" | "ShortWorkTime_LongPollingInterval";

function getTestParams(testMode: TestMode) {
    if (testMode === "LongWorkTime_ShortPollingInterval") {
        return {workDurationMS: 10000, pollingIntervalSec: 1};
    } else {
        return {workDurationMS: 100, pollingIntervalSec: 10};
    }
}

const testMode = "LongWorkTime_ShortPollingInterval";
//const testMode = "ShortWorkTime_LongPollingInterval";

const {workDurationMS, pollingIntervalSec} = getTestParams(testMode);

function simulateDoingSomeWork(durationMS: number) {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(() => {
            resolve();
        }, durationMS);
    });
}

const polling = pl.Polling.get(async () => {
    console.log(`doing some work...`);
    await simulateDoingSomeWork(workDurationMS);
    console.log(`done working :-)`);
    return 4;
}, pollingIntervalSec)
.on("state-change", (state) => {
    console.log(`<<state-change>>: state=${state}`);
}).on("before-poll", () => {
    //console.log(`<<before-poll>>`);
}).on("after-poll", (err, result) => {
    /*
    if (err) {
        console.error(`<<after-poll>>: !!! Error: ${JSON.stringify(err)}`);
    } else {
        console.log(`<<after-poll>>: result=${JSON.stringify(result, null, 2)}`);
    }
    */
});

polling.start();

setTimeout(() => {
    console.log(`\nSTOPPING the polling...`);
    polling.stop();
}, 60000);