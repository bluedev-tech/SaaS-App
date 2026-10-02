import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/CTA";
import { recentSessions } from "@/constants";

const Page = () => {
  const comps = [
    {
      id: "1",
      subject: "science",
      name: "Neura the Brainy Explorer",
      topic: "Neural Network of the Brain",
      duration: 45,
      color: "#E5D0FF",
    },
    {
      id: "2",
      subject: "maths",
      name: "Countsy the Number Wizard",
      topic: "Derivatives & Integrals",
      duration: 30,
      color: "#FFDA6E",
    },
    {
      id: "3",
      subject: "language",
      name: "Verba the Vocabulary Builder",
      topic: "English Literature",
      duration: 30,
      color: "#BDE7FF",
    },
  ];
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        {comps.map((item) => (
          <CompanionCard data={item} key={item.id} />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
