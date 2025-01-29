"use client";

import { useForm } from "react-hook-form";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
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
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  amount: z.number().min(10),
  message: z.string().min(2).max(150),
  offer: z.boolean(),
});

export default function DonatePage({
  params,
}: {
  params: { streamerId: Id<"users"> };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      message: "",
      offer: false,
    },
  });

  // const createDonation = useMutation(api.donations.create);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("https://api.yookassa.ru/v3/payments/", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa("1023837:test_gGyIHAufvXfLoyofv5hnfxt8i-pwuNdnRHDCZUql85M")}`,
          "Content-Type": "application/json",
          "Idempotence-Key": new Date().getTime().toString(),
        },
        body: JSON.stringify({
          amount: {
            value: String(values.amount),
            currency: "RUB",
          },
          payment_method_data: {
            type: "sbp",
          },
          confirmation: {
            type: "redirect",
            return_url: `https://donut-psi.vercel.app/${params.streamerId}`,
          },
          metadata: values,
        }),
      }).then((res) => res.json());
      router.push(res.confirmation.return_url);
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
            name="offer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    required
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  <Button asChild variant={"link"}>
                    <Link href="/offer">Пользовательское соглашение</Link>
                  </Button>
                </FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Задонатить
          </Button>
        </form>
      </Form>
      <footer className="fixed bottom-0">
        donutauth@gmail.com Ибрагимов Никита Сергеевич ИНН:182402617697
      </footer>
    </div>
  );
}
