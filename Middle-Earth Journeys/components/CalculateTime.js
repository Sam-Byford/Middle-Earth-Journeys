export function calculateTime(data){

    console.log("Data: ", data)
    let start_time = new Date(data[0].timestamp).getTime();
    let end_time = new Date(data[data.length - 1].timestamp).getTime();

    let total_time_ms = end_time - start_time;
    let total_time_s = total_time_ms / 1000;

    /*let final_time_m = Math.floor(total_time_s / 60);
    let final_time_s = Math.floor(total_time_s - (final_time_m * 60));*/

    // Display total distance and time

    return(total_time_s);
}

    