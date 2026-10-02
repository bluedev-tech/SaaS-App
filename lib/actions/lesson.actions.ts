"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createLesson = async (formData: CreateLesson) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert({
      ...formData,
      author,
    })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create lesson");
  }
  return data[0];
};

export const getAllLessons = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllLessons) => {
  const supabase = createSupabaseClient();
  let query = supabase.from("lessons").select();
  if (subject && topic) {
    query = query.ilike("subject", `%${subject}%`);
    query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);
  const { data: lessons, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return lessons;
};
