"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { subjects } from "@/constants";
import { createLesson } from "@/lib/actions/lesson.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Companion is required"),
  subject: z.string().min(1, "subject is required"),
  topic: z.string().min(1, "topic is required"),
  voice: z.string().min(1, "voice is required"),
  style: z.string().min(1, "style is required"),
  duration: z.number().min(1, "Duration is required"),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const lesson = await createLesson(data);
    console.log(lesson);
    if (lesson) {
      redirect(`/companions/${lesson.id}`);
    } else {
      console.log("Error redirecting..");
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create A Lesson Session</CardTitle>
        <CardDescription>Choose A Subject And A Topic</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="lesson-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" className="font-bold">
                    Name of Session
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name of the Session Trainer"
                    autoComplete="off"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-bold">Course</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select the Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Courses</SelectLabel>
                        {subjects.map((subject) => (
                          <SelectItem
                            key={subject}
                            value={subject}
                            className="capitalize"
                          >
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="topic" className="font-bold">
                    Topic: What Do You Want To Learn
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="topic"
                      placeholder="Ex. Derivatives and Integrals"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-bold">Voice</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select the Voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Voices</SelectLabel>

                        <SelectItem value={"male"}>Male</SelectItem>
                        <SelectItem value={"female"}>Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="font-bold">Styles</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select a Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Style</SelectLabel>

                        <SelectItem value={"formal"}>Formal</SelectItem>
                        <SelectItem value={"casual"}>Casual</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name" className="font-bold">
                    Estimated Session Duration In Mins
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="15"
                    autoComplete="off"
                    className="input"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className={"cursor-pointer"}
          >
            Reset
          </Button>
          <Button type="submit" form="lesson-form" className={"cursor-pointer"}>
            Create Session
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CompanionForm;
