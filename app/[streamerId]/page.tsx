"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { payment } from "@/actions";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  amount: z.number().min(10),
  message: z.string().min(2).max(150),
  goalId: z.string().min(2).max(150),
});

export type valuesPayment = z.infer<typeof formSchema>;

export default function DonatePage({
  params,
}: {
  params: { streamerId: Id<"users"> };
}) {
  const form = useForm<valuesPayment>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      message: "",
      goalId: "k5730n1afw01hv6jfchwg50wjh79dy3w",
    },
  });
  const router = useRouter();
  const goals = useQuery(api.goals.getGoals);

  async function onSubmit(values: valuesPayment) {
    try {
      const data = await payment(values, params.streamerId);
      router.push(data.confirmation.confirmation_url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Донат стримеру</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сумма (руб.)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сообщение</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="goalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Сбор</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Сбор" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {goals?.map((goal) => (
                      <SelectItem key={goal._id} value={goal._id}>
                        {goal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Задонатить
          </Button>
        </form>
      </Form>
    </div>
  );
}
