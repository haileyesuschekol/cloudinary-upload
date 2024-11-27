const path = require("path")
const fs = require("fs")
const { StatusCodes } = require("http-status-codes")
const cloudinary = require("cloudinary").v2
const CustomeError = require("../errors")
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomeError.BadRequestError("No file uploaded!")
  }
  const productImage = req.files.image

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomeError.BadRequestError("Please upload image!")
  }

  const maxSize = 1024 * 1024

  if (productImage.size > maxSize) {
    throw new CustomeError.BadRequestError(
      "Please upload image smaller than 1mb!"
    )
  }
  const imagePath = path.join(
    __dirname,
    `../public/uploads/` + `${productImage.name}`
  )

  await productImage.mv(imagePath)
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

//upload image to cloudinary
const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "demo-upload",
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res
    .status(StatusCodes.CREATED)
    .json({ image: { src: result.secure_url } })
}

module.exports = { uploadProductImage }
