"use client";
import React, { useEffect, useId } from "react";
import style from "./style.module.css";
import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function SellForm() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [color, setColor] = useState("");
  const [desc, setDesc] = useState("");
  const [shipment, SetShipment] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [floorPrice, setFloorprice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");
  const [tags, setTags] = useState([]);
  const subCategoriesMapMen = {
    TOPS: ["LONG SLEEVE T-SHIRTS", "POLOS"],
    BOTTOMS: ["CASUAL PANTS", " CROPPED PANTS", "DENIM"],
    OUTERWEAR: ["COATS", "JACKETS"],
    FOOTWEAR: ["SHOES", "SNEAKERS"],
    TAILORING: ["SUITS", "BLAZERS"],
    ACCESSORIES: ["HATS", "BELTS"],
  };

  const handlePostSubmit = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "STAF ID",
          userName: "STAFPRODUCTS",
          shippings: shipment,
          productImage1: imageUrl,
          productImage2: imageUrl2,
          productImage3: imageUrl3,
          productImage4: imageUrl4,
          productImage5: imageUrl5,
          designers: selectedDesigner,
          productName: productName,
          size: selectedSize,
          color: color,
          price: price,
          floorPrice: floorPrice,
          description: desc,
          vendor: "STAF PICKS",
          condition: selectedCondition,
          department: department,
          category: category,
          subcategory: selectedSubCategory,
          tag: [tags],
        }),
      });

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.status === 201) {
        toast.success("Product created successfully!");
      } else {
        toast.error("Failed to create product!");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product");
    }
  };

  const subCategoriesMapWomen = {
    TOPS: ["BLOUSES", " BODYSUITS", " BUTTON UPS"],
    BOTTOMS: ["Jeans", "Leggings"],
    OUTERWEAR: ["Coats", "Jackets"],
    FOOTWEAR: ["Heels", "Flats"],
    ACCESSORIES: ["Handbags", "Scarves"],
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    setCategory("");
    setSelectedSubCategory("");
    setFilteredSubCategories([]);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const subCategories =
      department === "WOMENSWEAR"
        ? subCategoriesMapWomen[selectedCategory]
        : subCategoriesMapMen[selectedCategory];

    setFilteredSubCategories(subCategories);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleConditionChange = (e) => {
    setSelectedCondition(e.target.value);
  };

  const handleDesignerChange = (e) => {
    setSelectedDesigner(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const newTag = inputValue.trim();

      if (newTag) {
        setTags([...tags, newTag]);
        setInputValue("");
      }
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className={style.wrapper}>
      <ToastContainer />
      <div className={style.wrapperCol}>
        <h1 className="Title">STAF PICK Listing</h1>
        <h2>Details</h2>
        <div className={style.detail}>
          <div className={style.selectWrpper}>
            <select
              className={style.selectFrom}
              value={department}
              onChange={handleDepartmentChange}
            >
              <option value="">DEPARTMENT/CATEGORY</option>
              <option value="MENSWEAR">MENSWEAR</option>
              <option value="WOMENSWEAR">WOMENSWEAR</option>
            </select>

            <select
              className={style.selectFrom}
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {department === "MENSWEAR" && (
                <>
                  <option value="TOPS">TOPS</option>
                  <option value="BOTTOMS">BOTTOMS</option>
                  <option value="OUTERWEAR">OUTERWEAR</option>
                  <option value="FOOTWEAR">FOOTWEAR</option>
                  <option value="TAILORING">TAILORING</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                </>
              )}
              {department === "WOMENSWEAR" && (
                <>
                  <option value="TOPS">TOPS</option>
                  <option value="BOTTOMS">BOTTOMS</option>
                  <option value="OUTERWEAR">OUTERWEAR</option>
                  <option value="FOOTWEAR">FOOTWEAR</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                </>
              )}
            </select>
          </div>
          <div className={style.selectWrpper}>
            <select
              className={style.selectFrom}
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              <option value="">Select Subcategory</option>
              {filteredSubCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>

            <input
              className={style.sizeInput}
              type="text"
              onChange={(e) => setSelectedSize(e.target.value)}
              placeholder="define your product Size"
            />
          </div>

          <div className={style.inputCol}>
            <div>
              <h2>Item Name</h2>
              <input
                type="text"
                placeholder="Item name"
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div>
              <h2>Color Name</h2>
              <input
                onChange={(e) => setColor(e.target.value)}
                type="text"
                placeholder="Item color"
              />
            </div>

            <div>
              <h2>Price</h2>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="Item price"
              />
            </div>

            <div>
              <h2>Floor Price</h2>
              <input
                onChange={(e) => setFloorprice(e.target.value)}
                type="text"
                placeholder="floor price"
              />
            </div>

            <div>
              <h2>Condition</h2>
              <select
                className={style.selectFrom}
                value={selectedCondition}
                onChange={handleConditionChange}
              >
                <option value="">Select Condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="gently_used">Gently Used</option>
              </select>
            </div>

            <div>
              <h2>ADD YOUR DESGNER</h2>
              <select
                className={style.selectFrom}
                value={selectedDesigner}
                onChange={handleDesignerChange}
              >
                <option value="">Select Designer</option>
                <option value="Gucci">Gucci</option>
                <option value="Jacquemus">Jacquemus</option>
                <option value="Kapital">Kapital</option>
                <option value="Loewe">Loewe</option>
                <option value="Louis Vuitton">Louis Vuitton</option>
              </select>
            </div>

            <div>
              <h2>Description</h2>
              <textarea
                name=""
                id="text"
                cols="100"
                rows="10"
                placeholder="add your product description"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <div>
              <h2>ADD YOUR TAGS</h2>
              <div>
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#0e0b0b",
                      padding: "5px",
                      color: "white",
                      display: "inline-block",
                      margin: "5px",
                    }}
                  >
                    {tag}
                    <button
                      style={{ background: "none", color: "red" }}
                      onClick={() => handleTagDelete(tag)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type and press Enter to add tags"
              />
            </div>

            <div>
              <h2>Shipment</h2>
              <textarea
                name=""
                id="text2"
                cols="100"
                rows="10"
                placeholder=""
                onChange={(e) => SetShipment(e.target.value)}
              ></textarea>
              <h2 style={{ margin: "20px 0px" }}>Photos</h2>
            </div>
            <h2>DropeZone 1</h2>
            <div className={style.dropzone}>
              {!imageUrl && (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    const fileUrl = res?.[0]?.url;
                    setImageUrl(fileUrl);
                    console.log("Files: ", res);
                  }}
                  onUploadError={(error) => {
                    console.log(error);
                  }}
                />
              )}

              {/* Render the uploaded image if imageUrl2 is available */}
              {imageUrl && (
                <div>
                  <img
                    width={220}
                    src={imageUrl}
                    className={style.imgs}
                    alt="Uploaded Image"
                  />
                  {/* Button to remove the uploaded image and show UploadDropzone again */}
                  <button onClick={() => setImageUrl(null)}>
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className={style.dropzoneWrapper}>
              <div className={style.dropZoneRow}>
                <div>
                  {!imageUrl2 && (
                    <UploadDropzone
                      endpoint="imageUploader2"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        const fileUrl = res?.[0]?.url;
                        setImageUrl2(fileUrl);
                        console.log("Files: ", res);
                      }}
                      onUploadError={(error) => {
                        console.log(error);
                      }}
                    />
                  )}

                  {/* Render the uploaded image if imageUrl2 is available */}
                  {imageUrl2 && (
                    <div>
                      <img
                        width={220}
                        src={imageUrl2}
                        className={style.imgs}
                        alt="Uploaded Image"
                      />
                      {/* Button to remove the uploaded image and show UploadDropzone again */}
                      <button onClick={() => setImageUrl2(null)}>
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {!imageUrl3 && (
                    <UploadDropzone
                      endpoint="imageUploader3"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        const fileUrl = res?.[0]?.url;
                        setImageUrl3(fileUrl);
                        console.log("Files: ", res);
                      }}
                      onUploadError={(error) => {
                        console.log(error);
                      }}
                    />
                  )}

                  {/* Render the uploaded image if imageUrl2 is available */}
                  {imageUrl3 && (
                    <div>
                      <img
                        width={220}
                        src={imageUrl3}
                        className={style.imgs}
                        alt="Uploaded Image"
                      />
                      {/* Button to remove the uploaded image and show UploadDropzone again */}
                      <button onClick={() => setImageUrl3(null)}>
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.dropZoneRow}>
                <div>
                  {!imageUrl4 && (
                    <UploadDropzone
                      endpoint="imageUploader3"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        const fileUrl = res?.[0]?.url;
                        setImageUrl4(fileUrl);
                        console.log("Files: ", res);
                      }}
                      onUploadError={(error) => {
                        console.log(error);
                      }}
                    />
                  )}

                  {/* Render the uploaded image if imageUrl2 is available */}
                  {imageUrl4 && (
                    <div>
                      <img
                        width={220}
                        src={imageUrl4}
                        className={style.imgs}
                        alt="Uploaded Image"
                      />
                      {/* Button to remove the uploaded image and show UploadDropzone again */}
                      <button onClick={() => setImageUrl4(null)}>
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {!imageUrl5 && (
                    <UploadDropzone
                      endpoint="imageUploader3"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        const fileUrl = res?.[0]?.url;
                        setImageUrl5(fileUrl);
                        console.log("Files: ", res);
                      }}
                      onUploadError={(error) => {
                        console.log(error);
                      }}
                    />
                  )}

                  {/* Render the uploaded image if imageUrl2 is available */}
                  {imageUrl5 && (
                    <div>
                      <img
                        width={220}
                        src={imageUrl5}
                        className={style.imgs}
                        alt="Uploaded Image"
                      />
                      {/* Button to remove the uploaded image and show UploadDropzone again */}
                      <button onClick={() => setImageUrl5(null)}>
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className={style.button1} onClick={handlePostSubmit}>
              upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
