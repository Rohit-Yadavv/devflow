"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath} from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  connectToDatabase();
  try {
    const { content, author, question, path } = params;
    console.log(params);
    const newAnswer = await Answer.create({ content, author, question });
    console.log({ newAnswer });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  connectToDatabase();
  try {
    console.log("Inside getAnswers - before querying the database");
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    console.log("Fetched answers:", answers);

    return { answers };
  } catch (error) {
    console.log("Error in getAnswers:", error);
    throw error;
  }
}
