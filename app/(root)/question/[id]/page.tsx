// @ts-nocheck
import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/share/AllAnswers";
import Metric from "@/components/share/Metric";
import ParseHTML from "@/components/share/ParseHTML";
import RenderTag from "@/components/share/RenderTag";
import Votes from "@/components/share/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }: any) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1"
            href={`/profile/${result.author.clerkId}`}
          >
            <Image
              width={22}
              height={22}
              src={result.author.picture}
              alt="profile"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={mongoUser ? JSON.stringify(mongoUser._id) : null}
              upvotes={result.upvotes.length}
              hasupVoted={mongoUser && result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={
                mongoUser && result.downvotes.includes(mongoUser._id)
              }
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(result.createdAt)}`}
          title=""
          textStyle="body-medium text text-dark400_light700"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(result.views)}
          title="Answers"
          textStyle="small-medium-text text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(result.views)}
          title="Views"
          textStyle="small-medium-text text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        questionId={result._id}
        userId={mongoUser ? mongoUser._id : null}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={mongoUser ? JSON.stringify(mongoUser._id) : null}
      />
    </>
  );
};

export default page;
