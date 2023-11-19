import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
const topques = [
  {
    _id: 1,
    title: "Redux Toolkit Not Updating State as Expected",
  },

  {
    _id: 2,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    _id: 3,
    title: "How to Perfectly Center a Div with Tailwind CSS?",
  },
  {
    _id: 4,
    title:
      "How do ES6 module exports and imports work in JavaScript, and what are the key differences from CommonJS?",
  },
  {
    _id: 5,
    title: "Next.js Redirect from / to another page",
  },
  {
    _id: 6,
    title: "Node.js Vs Bun | Which one is better for creating APIs?",
  },
];

const tags = [
  {
    _id: 1,
    name: "javascript",
    totalQuestions: 5,
  },
  {
    _id: 2,
    name: "react",
    totalQuestions: 3,
  },
  {
    _id: 3,
    name: "nextjs",
    totalQuestions: 5,
  },
  {
    _id: 4,
    name: "typescript",
    totalQuestions: 2,
  },
  {
    _id: 5,
    name: "redux",
    totalQuestions: 5,
  },
];

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden max-sm:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topques.map((question) => (
            <Link
              href={`/question/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
              key={question._id}
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Top Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags.map((tag) =>(
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} totalQuestions={tag.totalQuestions} showCount/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
