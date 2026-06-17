import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { createProduct } from "../../../src/redux/actions/product.action";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

 useEffect(() => {
  if (error) {
    toast.error(error);
  }
  if (success) {
    toast.success("product created");
    dispatch({ type: "createProductReset" });
    navigate("/dashboard");
  }
}, [error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image.file);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm));
  };

    const inputStyle =
    "mt-2 w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      id: crypto.randomUUID(),
    }));

    setImages((prev) => [...prev, ...files]);
  };


return (
    <div className="w-[60%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll ">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Create Product
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded"></div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            className={inputStyle}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            value={description}
            className={`${inputStyle} h-auto pt-2`}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className={inputStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Choose a category</option>
            {categoriesData?.map((i) => (
              <option key={i.title} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={tags}
            className={inputStyle}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags"
          />
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Original Price
            </label>
            <input
              type="number"
              value={originalPrice}
              className={inputStyle}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Discount Price
            </label>
            <input
              type="number"
              value={discountPrice}
              className={inputStyle}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stock}
            className={inputStyle}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Upload Images
          </label>

          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />

          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 mt-2 flex flex-wrap gap-3 items-center">
            <label htmlFor="upload" className="cursor-pointer text-gray-500 hover:text-blue-600">
              <AiOutlinePlusCircle size={30} />
            </label>

            {images.map((item) => (
              <img
                key={item.id}
                src={URL.createObjectURL(item.file)}
                className="w-[80px] h-[80px] object-cover rounded-md border"
                alt=""
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 h-[45px] rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold
          hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};


export default CreateProduct;


