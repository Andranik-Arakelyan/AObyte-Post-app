import yup from "yup";

export const newPostValidation = async (req, res, next) => {
  const { title, description, category, isPublic } = req.body;

  const uploadedPhoto = req.file;

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(800, "Description must be at most 800 characters")
      .required("Description is required"),
    uploadedPhoto: yup
      .mixed()
      .test("fileSize", "File size is too large", (value) => {
        const MAX_FILE_SIZE = 10 * 1024 * 1024;

        if (value) {
          return value && value.size <= MAX_FILE_SIZE;
        } else {
          return true;
        }
      })
      .test("fileType", "Unsupported file type", (value) => {
        const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
        if (value) {
          return value && SUPPORTED_IMAGE_TYPES.includes(value.mimetype);
        } else {
          return true;
        }
      }),
    isPublic: yup.boolean(),
  });

  try {
    await validationSchema.validate(
      { title, description, category, isPublic, uploadedPhoto },
      { abortEarly: false }
    );

    next();
  } catch (error) {
    if (error.name === "ValidationError") {
      const errObj = {};

      error.inner.forEach((err) => {
        errObj[err.path] = err.message;
      });

      res.json({
        status: "FAILED",
        errors: errObj,
      });
    } else {
      res.json({
        status: "FAILED",
        message: "Server Error",
      });
    }
  }
};
