import React from "react";

export const CompanyMessage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="w-full h-[80px]"></div>
      <h1 className="text-3xl font-bold text-left">
        Welcome to Inspire Holdings!
      </h1>
      <hr className="my-4 border-gray-300" />

      <div className="w-full">
        <img
          src="images/flag.jpeg"
          alt="Stocks"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="mt-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-left">
            Message from our President{" "}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            I am Melody Santos, privileged to serve as President of this
            esteemed organization. My journey began in 1993 as a civil servant,
            during which I was fortunate to garner the support and mentorship of
            many prominent business magnates. This paved the way for my foray
            into the financial sector in 1999.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            In 2005, I founded a modest finance company, which has since evolved
            significantly. By 2012, we were deeply entrenched in the financial
            industry, partnering with leading corporations. With unwavering
            support from our esteemed partners, we embarked on the journey
            toward public listing in 2023, culminating in a successful launch in
            2024.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our vision is ambitious: to position the Philippines as the foremost
            economy in Asia by 2027. At Inspire Holdings, we are committed to
            empowering our business partners, driving innovation, and achieving
            extraordinary growth together. Thank you for your trust and
            continued support.
          </p>

          <p className="text-gray-700 text-lg font-semibold text-right leading-relaxed mt-4">
            Melody Santos
          </p>
        </div>

        <hr className="my-4 border-gray-300" />
        <h1 className="text-2xl font-bold text-left">
          Message from our Executive Vice President
        </h1>

        <div>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            “In 2012, Inspire Holdings Incorporated., has gained auspicious
            success among well-known firms, engaging in a wide range of
            activities, such as micro-finance, real estate development, sales,
            management, and national infrastructure projects.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            This is all because of my excellent colleagues who has been working
            hard enough for us to reach our objective, For this we are very
            grateful and we sincerely express our gratitude to all our
            employees.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Our company is committed in creating happiness for everyone and
            contributing to a productive life. We strive hard to make each day a
            source of smiles and always moving towards a brighter future for
            both individuals and corporate development."
          </p>

          <p className="text-gray-700 text-lg font-semibold text-right leading-relaxed mt-4">
            Rhia Alberto
          </p>
        </div>
      </div>
    </div>
  );
};
