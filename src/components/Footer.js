import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-around bg-blue-600 text-white pb-32 mt-52">
        <div>
          <h2 className="font-bold text-lg pb-2 pt-2">Categories</h2>
          <div className="">
          <p>Mobiles</p>
          <p>Cars</p>
          <p>Motorcycles</p>
          <p>Houses</p>
          <p>Jobs</p>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg pb-2 pt-2">Support</h2>
          <div className="">
          <p>Marchant Support</p>
          <p>Help Center</p>
          <p>Hire a Partner</p>
          <p>Swapify Academy</p>
          <p>Swapify Community</p>
          </div>
        </div>
        <div>

            <h2 className="font-bold text-lg pb-2 pt-2">About Us</h2>
            <div className="">
            <p>abc</p>
            <p>cbv</p>
            <p>dcv</p>
            <p>tys</p>
            </div>
        </div>
        <div className="flex flex-col ">
            <h2 className="font-bold text-lg pb-2 pt-2">Contact Us</h2>
            <a href="">Facebook</a>
            <a href="">Instagram</a>
            <a href="">Whatsapp</a>
            <a href="">Tiktok</a>
            <a href="">Youtube</a>
            </div>
      </div>
    </div>
  );
};

export default Footer;
