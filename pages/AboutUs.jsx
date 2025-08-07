import React from "react";

function AboutUs() {
  const leaders = [
    { name: "Diya" },
    { name: "Het" },
    { name: "Shrey" },
    { name: "Krish" },
  ];
  return (
    <div className="bg-gray-100 font-['Roboto']">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <img
                src="assets/img/aimg.jpg"
                alt="Our Company Vision"
                className="rounded-xl shadow-xl object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-[#0a3d62] font-['Poppins'] mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                <strong>Welcome to Optical Shope – Where Vision Meets Style</strong> At Optical
                Shope, we believe that eyewear is more than just a
                necessity—it's a reflection of your personality. Whether you're
                searching for sleek and modern frames, timeless classics, or
                trendy sunglasses, our carefully curated collection offers
                something for everyone. We carry a wide range of high-quality
                lenses and designer frames to suit every style and budget. Our
                experienced staff is committed to helping you find the perfect
                pair that not only enhances your vision but also complements
                your look.
              </p>
              <p className="text-gray-700 text-lg">
                <strong>Trusted Eye Care, Right Around the Corner</strong> More than just a
                retail outlet, Optical Shope is your neighborhood destination
                for professional eye care. We offer comprehensive eye exams,
                prescription updates, and personalized guidance to ensure your
                visual health is always in focus. From kids to seniors, we cater
                to all ages with warmth, accuracy, and attention to detail. Come
                experience the perfect blend of fashion, function, and expert
                care—all under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-12">
          <h1 className="text-4xl text-center font-semibold text-[#0a3d62] font-['Poppins'] mb-10">
            Meet Our Leaders
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.length > 0 ? (
              leaders.map((leader) => (
                <div>
                  <h3 className="text-xl font-semibold font-['Poppins'] text-[#0a3d62] bg-gray-200 text-center rounded-md p-3">
                    {leader.name}
                  </h3>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-600">
                No leaders found.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
