import CompanionCard from "@/components/CompanionCard";
import { getAllLessons } from "@/lib/actions/lesson.actions";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = Array.isArray(filters?.subject)
    ? (filters.subject[0] ?? "")
    : (filters?.subject ?? "");
  const topic = Array.isArray(filters?.topic)
    ? (filters.topic[0] ?? "")
    : (filters?.topic ?? "");

  const lessons = await getAllLessons({ subject, topic });

  return (
    <section className="flex flex-col justify-between px-2 py-3 gap-4 max-sm:flex-col">
      <div className="flex gap-4 items-center justify-around max-sm:flex-col max-sm:items-start">
        <h1 className="font-bold">Lessons Library</h1>
        <div className="flex gap-4 items-center max-sm:flex-col max-sm:items-start">
          <SearchInput />
          <SubjectFilter />
        </div>
      </div>
      <section className="companions-grid">
        {lessons?.map((lesson) => (
          <CompanionCard
            key={lesson.id}
            data={lesson}
            color={getSubjectColor(lesson.subject)}
          />
        ))}
      </section>
    </section>
  );
};

export default CompanionsLibrary;
