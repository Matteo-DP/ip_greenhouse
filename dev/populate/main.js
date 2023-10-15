import { populateLamp } from "./db/populateLamp.js";
import { populateMoisture } from "./db/populateMoisture.js";
import { truncateTable } from "./db/truncate.js";

const data_points = 1000;

async function main() {
    console.log("[*] Truncating DB sensor_dev")
    await truncateTable();
    console.log("[*] [TYPE 0] Populating DB sensor_dev with soil moisture data")
    await populateMoisture(data_points);
    console.log("[*] [TYPE 2] Populating DB sensor_dev with lamp data")
    await populateLamp(data_points);
    console.log("[*] Done!")
}

main();