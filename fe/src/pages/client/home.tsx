import { Carousel } from "antd";
import React from "react";

interface Product {
  name: string;
  image: string;
  colors: string;
  price: string;
  badge?: string;
}

const ProductCard = ({ image, name, colors, price, badge }: Product) => (
  <div className="flex flex-col">
    <div className="h-96 rounded-lg bg-gray-50 text-center shadow hover:shadow-lg transition-transform transform hover:scale-105 hover:border hover:border-red-400 overflow-hidden cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover mb-2 transition-all duration-300 hover:brightness-110"
      />
    </div>
    <div className="p-4">
      {badge && (
        <div className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full mb-2">
          {badge}
        </div>
      )}
      <div className="font-semibold text-xl mb-1">{name}</div>
      <div className="text-gray-500 mb-1">{colors}</div>
      <div className="font-semibold text-lg mb-2">{price}</div>
      <div className="flex items-center gap-1 text-yellow-400">
        {"⭐️⭐️⭐️⭐️☆"}
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const contentStyle: React.CSSProperties = {
    height: "300px",
    color: "#fff",
    lineHeight: "300px",
    textAlign: "center",
    background: "#364d79",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const products: Product[] = Array.from({ length: 8 }).map((_, index) => ({
    name: `Nike alo alo ${index + 1}`,
    image: `https://th.bing.com/th/id/R.d059c2391532f452241bcbeeed73c851?rik=PpeKScJqLQZxFg&riu=http%3a%2f%2fwww.tennisnuts.com%2fimages%2fproduct%2ffull%2fNike-LunarGlide-6-Womens-Running-Shoe-654434_603_A_PREM.jpg&ehk=L4qZM7YIgLPPjwkSByRfvdYRbZYztzGQEUCytlFG2as%3d&risl=&pid=ImgRaw&r=0`,
    colors: "2 Colors",
    price: "2.900.000đ",
    badge: "BestSeller",
  }));

  return (
    <div className="p-12 mt-28">
      <Carousel autoplay>
        {[1, 2, 3, 4].map((item) => (
          <div key={item}>
            <div style={contentStyle}>Banner {item}</div>
          </div>
        ))}
      </Carousel>

      <div className="flex-1 mt-16">
        <h1 className="text-4xl p-4 font-bold mb-8 text-center">
          Sản phẩm nổi bật
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
