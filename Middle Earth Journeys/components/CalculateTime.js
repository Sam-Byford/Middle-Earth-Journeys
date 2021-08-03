export function calculateTime(data){

    let start_time = new Date(data[0].timestamp).getTime();
    let end_time = new Date(data[data.length - 1].timestamp).getTime();

    console.log("start:", start_time)
    console.log("end:", end_time)

    let total_time_ms = end_time - start_time;
    let total_time_s = total_time_ms / 1000;

    console.log("total time s: ", total_time_s)

    let final_time_m = Math.floor(total_time_s / 60);
    let final_time_s = Math.floor(total_time_s - (final_time_m * 60));

    console.log("final m: ", final_time_m)
    console.log("final s: ", final_time_s)

    // Display total distance and time

    return(final_time_m + ":" + final_time_s+"s");
}
