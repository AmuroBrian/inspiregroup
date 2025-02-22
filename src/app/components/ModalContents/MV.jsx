import React from "react";

export const MV = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">Our Mission and Vision</h1>
      <hr className="my-4 border-gray-300" />

      {/* Wide Image */}
      <div className="w-full">
        <img
          src="images/Stocks.jpeg"
          alt="Stocks"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Mission & Vision Sections */}
      <div className="mt-6 space-y-8">
        {/* Mission */}
        <div>
          <h2 className="text-3xl font-bold text-left">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            As Inspire Holdings, our mission is to emerge as a global
            enterprise. From our base in the Philippines, the heart of Asia, we
            are driving international business expansion, facilitating mergers
            and acquisitions, and pioneering global entertainment initiatives.
            We are dedicated to growth and innovation, and we invite you to join
            us in this journey.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Embrace the vision of Inspire Holdings and let's together achieve
            remarkable success and create a brighter future. Our commitment to
            excellence and sustainability is at the core of everything we do. We
            strive to build a diverse and inclusive organization that nurtures
            talent, fosters creativity, and encourages collaboration. By
            leveraging cutting-edge technology and harnessing the power of data
            analytics, we aim to stay ahead of industry trends and deliver
            unparalleled value to our stakeholders.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            At Inspire Holdings, we believe in the transformative power of
            global partnerships. We are dedicated to forging strategic alliances
            that enhance our capabilities and extend our reach. Through these
            collaborations, we seek to create innovative solutions that address
            complex challenges and drive positive change in the communities we
            serve.
          </p>
        </div>

        {/* Vision */}
        <div>
          <h2 className="text-3xl font-bold text-left">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our vision extends beyond business success; we are passionate about
            making a meaningful impact on society. We actively engage in
            corporate social responsibility initiatives that promote education,
            environmental sustainability, and economic empowerment.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            By investing in these areas, we hope to contribute to the
            development of a more equitable and prosperous world. Join us at
            Inspire Holdings and be part of a dynamic organization that values
            integrity, creativity, and a relentless pursuit of excellence.
            Together, we can achieve remarkable success and create a brighter
            future for generations to come.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-left">The Future</h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Are you all aware? By 2027, the major corporations and national
            projects will be nearing completion, heralding significant changes
            for the Philippines. You may frequently hear about 2027 in the media
            and through various plans. This is because, ahead of the 2028
            presidential election, the current president aims to make the
            Philippines the leading nation in Asia. This grand vision is driven
            by the coordinated efforts of key figures in the business
            conglomerates and the government.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our company, Inspire, is also committed to this mission and plans to
            go public by 2027. We invite you to join us in this endeavor to make
            the Philippines number one in Asia. Thank you for your cooperation
            and support.
          </p>
        </div>
      </div>
    </div>
  );
};
