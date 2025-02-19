"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/Card";

const cards = [
  {
    id: 1,
    title: "Company Overview",
    image: "./images/PSEbuilding.jpg",
    link: "/companyoverview",
  },
  {
    id: 2,
    title: "Mission and Vision",
    image: "./images/Dart.jpeg",
    link: "/missionvision",
  },
  {
    id: 3,
    title: "Message from Executives",
    image: "./images/Denmark.jpeg",
    link: "/messageexec",
  },
  {
    id: 4,
    title: "Organization",
    image: "./images/CompanyMeeting.jpeg",
    link: "/orgchart",
  },
];

const AnimatedCard = ({ title, image, link }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full p-4"
    >
      <a href={link} rel="noopener noreferrer">
        <Card className="overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition h-full flex flex-col">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="text-lg font-semibold flex-grow text-center">
              {title}
            </h3>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

const ProjectCards = () => {
  return (
    <div className="flex flex-wrap justify-center p-8" id="about">
  
      {/* Grid layout: 2 columns on all screen sizes with responsive padding */}
      <div className="grid grid-cols-2 gap-4 w-full pr-2 pl-2 md:pr-44 md:pl-44 sm:pl-16 sm:pr-16 xl:pl-32 xl:pr-32">
        {cards.map((card) => (
          <AnimatedCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
