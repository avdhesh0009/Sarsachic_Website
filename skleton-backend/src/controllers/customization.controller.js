import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Home } from "../models/homedata.model.js";
import { Theme } from "../models/themeEdit.model.js";

export const saveHomeData = asyncHandler(async (req, res, next) => {
  const { mainColor, secondaryColor } = req.body;

  if (!mainColor || !secondaryColor) {
    throw new ApiError(400, "Please provide main color and secondary color");
  }

  if (req.file && !req.file.mimetype.startsWith("image")) {
    throw new ApiError(400, "Please provide an image file");
  }

  const bannerImageFromCloudinary = req.file
    ? await uploadOnCloudinary(req.file.path)
    : null;

  let homeBannerImage;

  if (!bannerImageFromCloudinary && req.file) {
    throw new ApiError(500, "Error uploading image to cloudinary");
  }

  if (bannerImageFromCloudinary) {
    homeBannerImage = bannerImageFromCloudinary.url;
  }

  const homeDataToStore = {
    mainColor: req.body.mainColor,
    secondaryColor: req.body.secondaryColor,
    homeBannerImage,
  };

  const homeData = await Home.create(homeDataToStore);

  if (!homeData) {
    throw new ApiError(500, "Error saving home data");
  }
  console.log(homeData);
  res.status(201).json(new ApiResponse(201, homeData));
});

export const saveThemeData = asyncHandler(async (req, res, next) => {
  const { themeName } = req.body;

  if (!themeName) {
    throw new ApiError(400, "Please provide theme name");
  }

  if (req.file && !req.file.mimetype.startsWith("image")) {
    throw new ApiError(400, "Please provide an image file");
  }

  const bannerImageFromCloudinary = req.file
    ? await uploadOnCloudinary(req.file.path)
    : null;

  if (!bannerImageFromCloudinary && req.file) {
    throw new ApiError(500, "Error uploading image to cloudinary");
  }
  let themeBannerImage;

  if (bannerImageFromCloudinary) {
    themeBannerImage = bannerImageFromCloudinary.url;
  }

  const themeDataToStore = {
    themeName: req.body.themeName,
    themeImage: themeBannerImage,
  };

  const themeData = await Theme.create(themeDataToStore);

  if (!themeData) {
    throw new ApiError(500, "Error saving theme data");
  }

  res.status(201).json(new ApiResponse(201, themeData));
});


export const getWebData = asyncHandler(async(req,res,next) => {

  const lastCreatedHomeData = await Home.findOne().sort({ createdAt: -1 })


 return res.status(200).json(
  new ApiResponse(200, lastCreatedHomeData)
)
})

export const getShopData = asyncHandler(async(req,res,next) => {


  const shop = req.params.shop


  const lastShopBanner = await Theme.findOne({themeName: shop}).sort({createdAt: -1})


  return res.status(200).json(
    new ApiResponse(200, lastShopBanner)
  )

})