"use client"
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db , storage } from "/src/firebase";
const Page = () => {
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState(""); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "products"), {
        brand,
        condition,
        title,
        description,
        price,
        imageUrl,
        username,
        phoneNumber,
        category,
      });

      setBrand("");
      setCondition("");
      setTitle("");
      setDescription("");
      setPrice("");
      setUsername("");
      setPhoneNumber("");
      setImage(null);
      setCategory("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Category</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="mobile">Mobile</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="house">House</option>
          <option value="jobs">Jobs</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Brand</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Condition</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Price</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Username</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Phone Number</label>
        <input
          type="tel"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Image</label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default Page;
