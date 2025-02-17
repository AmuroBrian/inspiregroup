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
    link: "#",
  },
  {
    id: 2,
    title: "Mission and Vision",
    image: "./images/Dart.jpeg",
    link: "#",
  },
  {
    id: 3,
    title: "Message from Executives",
    image: "./images/Denmark.jpeg",
    link: "#",
  },
  {
    id: 4,
    title: "Organization",
    image: "./images/CompanyMeeting.jpeg",
    link: "#",
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
      className="w-full md:w-1/3 p-4"
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Card className="overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
};

const ProjectCards = () => {
  return (
    <div className="flex flex-wrap justify-center p-8">
      {cards.map((card) => (
        <AnimatedCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default ProjectCards;
