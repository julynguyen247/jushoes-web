import { Carousel } from "antd";
import React from "react";

const HomePage = () => {
  const contentStyle: React.CSSProperties = {
    height: "200px",
    color: "#fff",
    lineHeight: "200px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="p-12 mt-28">
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>

      <div className="flex-1 ">
        <h1 className="text-4xl p-4 font-bold mb-4 text-center">
          Sản phẩm nổi bật
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {[...Array(8)].map((_, index) => (
            <div className="flex flex-col">
              <div
                key={index}
                className=" h-96 rounded-lg  bg-gray-50 text-center shadow hover:shadow-md transition overflow-hidden cursor-pointer "
              >
                <img
                  src={`https://th.bing.com/th/id/R.d059c2391532f452241bcbeeed73c851?rik=PpeKScJqLQZxFg&riu=http%3a%2f%2fwww.tennisnuts.com%2fimages%2fproduct%2ffull%2fNike-LunarGlide-6-Womens-Running-Shoe-654434_603_A_PREM.jpg&ehk=L4qZM7YIgLPPjwkSByRfvdYRbZYztzGQEUCytlFG2as%3d&risl=&pid=ImgRaw&r=0`}
                  alt={`Shoes ${index + 1}`}
                  className="w-full h-auto mb-2"
                />
              </div>
              <div>
                <div className="text-red-500 font-medium ">BestSeller</div>
                <div className=" font-semibold text-xl">Nike alo alo</div>
                <div className="text-gray-500">2 Colors</div>
                <div className=" font-semibold ">2.900.000đ</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
