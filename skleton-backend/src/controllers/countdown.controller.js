import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CountdownSettings from '../models/countdown.model.js'; 

export const saveCountdownSettings = asyncHandler(async (req, res) => {
    const { countdownEndDate } = req.body;

    console.log("Received countdownEndDate:", countdownEndDate); 

    if (!countdownEndDate) {
        throw new ApiError(400, "Countdown end date is required.");
    }

    let settings = await CountdownSettings.findOne();
    if (settings) {
        settings.countdownEndDate = countdownEndDate;
    } else {
        settings = new CountdownSettings({ countdownEndDate });
    }

    await settings.save();
    res.status(200).json(new ApiResponse(200, "Countdown settings saved successfully!"));
});


export const getCountdownSettings = asyncHandler(async (req, res) => {
    const settings = await CountdownSettings.findOne();
    if (settings) {
        res.status(200).json(new ApiResponse(200, settings.countdownEndDate, "Countdown settings found successfully"));
    } else {
        throw new ApiError(404, "Countdown settings not found");
    }
});
