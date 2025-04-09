"use client";

import React from "react";
import { Link } from "react-scroll";
import Image from "next/image";
import { Landmark } from "lucide-react";

const tocItems = [
  { name: "intro", label: "Open an Account via Inspire Wallet" },
  { name: "bdo", label: "BDO Unibank" },
  { name: "unionbank", label: "UnionBank" },
  { name: "bpi", label: "BPI Bank" },
  { name: "ctbc", label: "CTBC Bank" },
  { name: "security", label: "Security Bank" },
  { name: "maya", label: "MAYA" },
];

const ToC = () => (
  <div className="hidden md:block md:p-4 md:relative lg:fixed lg:left-10 lg:top-20 lg:w-1/4 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 className="font-semibold mb-2">📌 Table of Contents</h2>
    <ul className="space-y-2 text-sm">
      {tocItems.map((item, index) => (
        <li
          key={index}
          className={`flex items-center space-x-2 ${index === 0 ? "" : "ml-4"}`}
        >
          {index === 0 ? null : (
            <Landmark size={16} className="text-blue-600" />
          )}
          <Link
            to={item.name}
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Section = ({ title, name, showIcon = true, children }) => (
  <section id={name} className="mb-10">
    <div className="flex items-center space-x-2 mb-4">
      {showIcon && <Landmark size={20} className="text-blue-600" />}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    {children}
  </section>
);

const PartnerBanks = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6 pt-20">
      <ToC />
      <div className="md:w-3/4 md:ml-auto">
        {/* Intro Section */}
        <Image
          src="/images/inspirepartnerbanks.png"
          alt="Inspire Wallet Partner Banks"
          width={600}
          height={300}
          className="mb-6 mx-auto rounded-lg shadow-lg"
        />
        <h1 className="text-2xl font-bold mb-4 pt-4">
          Inspire Wallet Partner Banks
        </h1>
        <p className="mb-6">
          The following are the details of the banks and payment services that
          Inspire Holdings Inc. has partnered with.
        </p>

        <Section
          title="Open an Account via Inspire Wallet"
          name="intro"
          showIcon={false}
        >
          <Image
            src="/images/walletbankss.png"
            alt="Inspire Wallet Partner Banks"
            width={600}
            height={300}
            className="mb-6 mx-auto rounded-lg shadow-lg"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            Normally, you are required to open a bank account if you are a
            resident of the country or if you have a VISA. However, the
            Philippines' Inspire Wallet app has cleared that hurdle.
          </p>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            Although it is limited to banks, it is still possible to open
            accounts such as <strong>BDO</strong>, <strong>Union Bank</strong>,{" "}
            <strong>BPI</strong>, <strong>CTBC</strong>,{" "}
            <strong>Security Bank</strong>, <strong>MAYA</strong>, etc., with a{" "}
            <strong>Japan ID card</strong>.
          </p>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            Debit and cash cards are quickly delivered locally in the
            Philippines, it is truly an innovative system.
          </p>
        </Section>

        {/* BDO Unibank Section */}
        <Section title="BDO Unibank" name="bdo">
          <Image
            src="/images/bdo1.png"
            alt="BDO Unibank logo"
            width={400}
            height={200}
            className="mb-4 object-contain"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            BDO Unibank (commonly known as Banco de Oro, abbreviated as BDO) is
            one of the leading commercial banks in the Philippines and the
            largest in the country in terms of total assets.
          </p>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            BDO was founded on January 2, 1968 as Acme Savings Bank. It was
            acquired by SM Group in November 1976 and at the same time renamed
            Banco de Oro Savings and Mortgage Bank.
          </p>
          <Image
            src="/images/partnerbanksbdoinfo1.png"
            alt="BDO Info 1"
            width={400}
            height={200}
            className="my-4 object-contain"
          />
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            In December 1994 it was transformed into a commercial bank and
            became Banco de Oro Commercial Bank, and in September 1996 it
            established itself as a universal bank and changed its name to Banco
            de Oro Universal Bank (BDO Unibank). BDO has become the largest bank
            in the Philippines, with more than 1,300 branches and more than
            4,000 ATMs.
          </p>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            BDO offers a wide range of financial services to individuals and
            corporations, including lending, deposits, foreign exchange,
            brokerage, trusts and investments, credit cards, corporate cash
            management, and remittance services. In addition, the company also
            provides services such as leasing and financing, investment banking,
            private banking, bancassurance, insurance brokerage, and securities
            brokerage through its subsidiaries.
          </p>
          <Image
            src="/images/partnerbanksbdoinfo2.png"
            alt="BDO Info 2"
            width={600}
            height={600}
            className="my-4 object-contain"
          />
        </Section>

        <Section title="UnionBank" name="unionbank">
          <Image
            src="/images/ub1.png"
            alt="UnionBank logo"
            width={400}
            height={200}
            className="mb-4 object-contain"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            UnionBank of the Philippines is one of the leading commercial banks
            in the Philippines and is known as a pioneer in digital banking.
          </p>
          <h2 className="text-xl font-semibold">History</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            UnionBank was founded in 1968 as "Union Savings and Mortgage Bank".
            Later, in 1982, it was converted to a commercial bank, and in 1992
            it obtained a universal bank license and became the current name
            "UnionBank of the Philippines".
          </p>

          <h2 className="text-xl font-semibold">Recent Developments</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            UnionBank is a leader in digital banking in the Philippines,
            offering innovative services. The company is also listed on the
            Philippine Stock Exchange, with a stock price of 33.2 Philippine
            pesos and a market capitalization of approximately Philippine pesos
            of approximately 110.1 billion Philippine pesos as of March 15,
            2025.
          </p>

          <h2 className="text-xl font-semibold">Service Details</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            UnionBank is a leader in digital banking in the Philippines,
            offering innovative services. The company is also listed on the
            Philippine Stock Exchange, with a stock price of 33.2 Philippine
            pesos and a market capitalization of approximately Philippine pesos
            of approximately 110.1 billion Philippine pesos as of March 15,
            2025.
          </p>

          <Image
            src="/images/partnerbanksubinfo1.png"
            alt="UnionBank logo"
            width={500}
            height={400}
            className="mb-4 object-contain"
          />
        </Section>

        <Section title="BPI Bank" name="bpi">
          <Image
            src="/images/bpi.png"
            alt="BPI logo"
            width={400}
            height={300}
            className="mb-4 object-contain"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            BPI (Bank of the Philippine Islands) is the oldest bank in the
            Philippines, founded in 1851, and one of the oldest banks in all of
            Asia. It was initially named "El Banco Español Filipino de Isabel
            II" and was founded during the Spanish colonial period. Later, in
            1912, it was renamed to its current name, the Bank of the Philippine
            Islands (BPI).
          </p>

          <Image
            src="/images/partnerbanksbpiinfo1.png"
            alt="BPI Info logo"
            width={700}
            height={500}
            className="mb-4 object-contain"
          />

          <h2 className="text-xl font-semibold">Service Details</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            BPI offers a wide range of financial services to individuals and
            corporations. This includes deposit accounts, loans, credit cards,
            investment products, insurance, wealth management services, and
            more. The company also focuses on digital banking, providing
            convenient services to its customers through online and mobile
            banking.
          </p>
          <br />
          <h2 className="text-xl font-semibold">International Expansion</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            In addition to its extensive network of branches in the Philippines,
            BPI also has offices overseas to provide international financial
            services. In particular, we provide services around the world to
            meet the remittance needs of Filipino workers (OFWs). BPI's
            headquarters are located in Makati City, Metro Manila, which serves
            as the financial center of the Philippines.
          </p>
        </Section>

        <Section title="CTBC Bank" name="ctbc">
          <Image
            src="/images/ctbc1.png"
            alt="CTBC logo"
            width={400}
            height={200}
            className="mb-4 object-contain"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            CTBC Bank (formerly known as China Trust and Commercial Bank) is a
            leading commercial bank headquartered in Taipei, Taiwan. Its history
            and development are as follows.
          </p>

          <Image
            src="/images/partnerbanksctbcinfo1.png"
            alt="CTBC Info 1"
            width={700}
            height={450}
            className="mb-4 object-contain"
          />
          <h2 className="text-xl font-semibold">Business Development</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            CTBC Bank has 144 branches in Taiwan and is expanding the
            installation of off-branch ATMs, mainly at 7-Eleven branches in
            Taiwan operated by Unification Super Commerce. We also own the head
            office building built by Mitsui Corporation's first-class architects
            office in Japan. In addition, we have expanded into the Japan market
            and have established a Tokyo branch in Akasaka Mitsuke, Chiyoda-ku,
            Tokyo.
          </p>
          <br />
          <h2 className="text-xl font-semibold">
            Acquisition of Tokyo Star BankOn
          </h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            December 30, 2012, it was reported that CTBC Bank was considering
            acquiring Tokyo Star Bank, and it was officially announced on
            October 31, 2013. Later, in June 2014, we officially became a wholly
            owned subsidiary and strengthened our presence in the Japan market.
          </p>

          <Image
            src="/images/partnerbanksctbcinfo2.png"
            alt="CTBC Info 2"
            width={700}
            height={450}
            className="mb-4 object-contain"
          />
        </Section>

        <Section title="Security Bank" name="security">
          <Image
            src="/images/sb1.png"
            alt="SecurityBank logo"
            width={400}
            height={200}
            className="mb-4 object-contain"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            Security Bank Corporation is one of the leading universal banks in
            the Philippines, providing a wide range of financial services to
            individuals, commercial, corporate, and institutional investors.
          </p>

          <Image
            src="/images/partnerbankssbinfo1.png"
            alt="SecurityBank Info 1"
            width={700}
            height={450}
            className="mb-4 object-contain"
          />

          <Image
            src="/images/partnerbankssbinfo2.png"
            alt="SecurityBank Info 2"
            width={700}
            height={450}
            className="mb-4 object-contain"
          />

          <h2 className="text-xl font-semibold">Size & Locations</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            As of 2021, Security Bank has 313 branches and 787 ATMs across the
            Philippines. The company's headquarters is located on Ayala Avenue
            in Makati City.
          </p>
          <br />
          <h2 className="text-xl font-semibold">MUFG</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            Security Bank holds a 20% stake in MUFG Bank, while other
            shareholders include Frederick Y. Dy (19.39%) and Daniel S. Dy
            (12.96%).
          </p>
        </Section>

        <Section title="Maya" name="maya">
          <Image
            src="/images/maya.png"
            alt="Maya logo"
            width={400}
            height={200}
            className="mb-4 object-contain"
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            Maya (formerly PayMaya) is the leading digital financial services
            and payments platform in the Philippines. It offers a wide range of
            services for individuals and businesses, including online and
            offline payments, money transfers, bill payments, and mobile
            recharge.
          </p>

          <Image
            src="/images/partnerbanksmayainfo1.png"
            alt="Maya Info 1"
            width={700}
            height={450}
            className="mb-4 object-contain"
          />

          <Image
            src="/images/partnerbanksmayainfo2.png"
            alt="Maya Info 2"
            width={700}
            height={450}
            className="mb-4 object-contain"
          />

          <h2 className="text-xl font-semibold">Valuation & Investment</h2>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            April 2022, Voyager Innovations, the operator of Maya, raised $210
            million in a funding round led by SIG Venture Capital, the Asian arm
            of Susquehanna International Group (SIG). The valuation reached $
            1.4 billion. This made it the second unicorn company in the
            Philippines.
          </p>
        </Section>
        <hr className="my-10" />
        <h2 className="text-2xl font-bold mb-4">
          That's all for the list of partner banks!
        </h2>
        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          In summary, BDO is affiliated with Mizuho Bank, CTBC Bank is also the
          parent company of Star Bank, and Security Bank (SB) is affiliated with
          MUFG Bank.
        </p>
        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          Inspire is a company that plays a key role in partnering with these
          major banks.
        </p>
        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          Therefore, CTBC Bank can deliver a cash card (with debit function)
          that can be used overseas if approved through an interview with
          Inspire even while in Japan.
        </p>
        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          In summary, BDO is affiliated with Mizuho Bank, CTBC Bank is also the
          parent company of Star Bank, and Security Bank (SB) is affiliated with
          MUFG Bank.
        </p>

        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          This wallet is the only one that can transact with so many banks while
          in Japan. What's more, the VISA problem has also been cleared. Try
          searching for "inspire wallet" on Google or Apple and try out its
          features.
        </p>
      </div>
    </div>
  );
};

export default PartnerBanks;
