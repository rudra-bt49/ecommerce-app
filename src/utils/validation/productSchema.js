import * as Yup from "yup";

const productSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  description: Yup.string().required("Description required"),
  category: Yup.string().required("Category required"),
  image: Yup.string()
    .url("Invalid image URL")
    .required("Image URL required"),
});

export default productSchema;
