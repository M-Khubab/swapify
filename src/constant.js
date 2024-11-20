import Login from "./app/login/page"


 const productCategories =[{
        categoryid:1,
        categoryName:"Mobiles",
        route:"/mobiles"
    },
    {
        categoryid:2,
        categoryName:"Cars",
        route:"/cars"
    },
    {
        categoryid:3,
        categoryName:"Motorcycles",
        route:"/motorcycles"
    },
    {
        categoryid:4,
        categoryName:"Houses",
        route:"/houses"
    },
    {
        categoryid:2,
        categoryName:"Jobs",
        route:"/jobs"
    }
]

const navLinks = [{

   navlinksid:1,
   navlinksName:"Log in",
   route:"/login"
},
   {
   navlinksid:3,
   navlinksName:"Cart",
   route:"/cart"
},
   {navlinksid:4,
   navlinksName:"Wishlist",
   route:"/wishlist"
},
   {navlinksid:5,
   navlinksName:"+ Sell",
route:"/+sell"
},


]
  

export {productCategories,navLinks}
