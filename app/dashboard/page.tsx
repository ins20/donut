"use client";
import { useDebouncedCallback } from "use-debounce";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Doc, Id } from "@/convex/_generated/dataModel";

export default function Donation() {
  const donations = useQuery(api.donations.listForStreamer);
  const { signOut } = useAuthActions();
  const currentUser = useQuery(api.users.getCurrentUser);

  const goals = useQuery(api.goals.getGoals);
  const goalStyles = useQuery(api.goalStyles.getGoalStyles);
  const alertStyles = useQuery(api.alertStyles.getAlertStyles);
  const addGoalStyle = useMutation(api.goalStyles.createGoalStyle);
  const deleteGoalStyle = useMutation(api.goalStyles.deleteGoalStyle);
  const addGoals = useMutation(api.goals.createGoal);
  const deleteAlert = useMutation(api.alertStyles.deleteAlertStyle);
  const updateAlert = useMutation(api.alertStyles.updateAlertStyle);
  const addAlert = useMutation(api.alertStyles.createAlertStyle);
  const deleteGoal = useMutation(api.goals.deleteGoal);
  const updateGoalStyle = useMutation(api.goalStyles.updateGoalStyle);
  const updateGoal = useMutation(api.goals.updateGoal);
  const handleAddAlert = () => {
    addAlert();
  };
  const handleAddGoal = () => {
    addGoals();
  };
  const handleAddGoalStyle = () => {
    addGoalStyle();
  };
  if (!donations) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex items-center">
        <Button onClick={signOut} size={"sm"} className="w-fit">
          Выйти
        </Button>
        <Button variant={"link"} asChild>
          <Link target="_blank" href={currentUser?._id as string}>
            Ссылка на страницу доната
          </Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link target="_blank" href={`${currentUser?._id}/alert`}>
            Ссылка на виджет оповещения
          </Link>
        </Button>
      </div>

      <div className="flex gap-6 h-full">
        <Card className="w-1/2 h-full">
          <CardHeader>
            <CardTitle>Донаты</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Сообщение</TableHead>
                  <TableHead>Дата</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation._id}>
                    <TableCell>{donation.name}</TableCell>
                    <TableCell>${donation.amount.toFixed(2)}</TableCell>
                    <TableCell>{donation.message}</TableCell>
                    <TableCell>
                      {new Date(donation.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="w-1/2 flex flex-col gap-6 w-full h-full">
          <div className="flex gap-6 w-full h-1/2">
            <Card className="w-1/2 h-full">
              <CardHeader className="flex flex-row items-center justify-between w-full">
                <CardTitle className="w-fit">Стили оповещения</CardTitle>
                <Button className="w-fit" size={"sm"} onClick={handleAddAlert}>
                  Новый стиль оповещения
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs>
                  <ScrollArea>
                    <TabsList>
                      {alertStyles?.map((style) => (
                        <TabsTrigger key={style._id} value={style._id}>
                          {style.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>

                  {alertStyles?.map((style) => (
                    <TabsContent key={style._id} value={style._id}>
                      <FormAlert
                        values={{
                          name: style.name,
                          image: style.image || "",
                          duration: style.duration || 0,
                          backgroundColor: style.backgroundColor || "",
                          textColor: style.textColor || "",
                          fontSize: style.fontSize || 0,
                        }}
                        onUpdate={async (values) => {
                          try {
                            await updateAlert({
                              id: style._id,
                              ...values,
                              duration: Number(values.duration),
                              fontSize: Number(values.fontSize),
                            });
                            toast({
                              title: "Стиль оповещения обновлено",
                            });
                          } catch (error) {
                            toast({
                              variant: "destructive",
                              title: "Не удалось обновить",
                            });
                            console.log(error);
                          }
                        }}
                        onDelete={async () => {
                          await deleteAlert({
                            id: style._id,
                          });
                        }}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
            <Card className="w-1/2 h-full">
              <CardHeader className="flex flex-row items-center justify-between w-full">
                <CardTitle className="w-fit">Стили сборов</CardTitle>
                <Button
                  className="w-fit"
                  size={"sm"}
                  onClick={handleAddGoalStyle}
                >
                  Новый стиль сбора
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs>
                  <TabsList>
                    {goalStyles?.map((style) => (
                      <TabsTrigger key={style._id} value={style._id}>
                        {style.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {goalStyles?.map((style) => (
                    <TabsContent key={style._id} value={style._id}>
                      <FormGoalStyles
                        values={{
                          name: style.name,
                          colorBorder: style.colorBorder || "",
                          colorFilled: style.colorFilled || "",
                          direction: style.direction || false,
                        }}
                        onUpdate={async (values) => {
                          try {
                            await updateGoalStyle({
                              id: style._id,
                              ...values,
                            });
                            toast({
                              title: "Стиль сбора обновлен",
                            });
                          } catch (error) {
                            toast({
                              variant: "destructive",
                              title: "Не удалось обновить",
                            });
                            console.log(error);
                          }
                        }}
                        onDelete={async () => {
                          await deleteGoalStyle({
                            id: style._id,
                          });
                        }}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <Card className="h-1/2">
            <CardHeader className="flex flex-row items-center justify-between w-full">
              <CardTitle className="w-fit">Сборы</CardTitle>
              <Button size={"sm"} className="w-fit" onClick={handleAddGoal}>
                Добавить сбор
              </Button>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <ScrollArea className="h-[270px] pr-5">
                  {goals?.map((goal) => (
                    <AccordionItem key={goal._id} value={goal._id}>
                      <AccordionTrigger>{goal.title}</AccordionTrigger>
                      <AccordionContent className="flex items-center gap-2 py-1">
                        <FormGoal
                          collected={goal.collected || 0}
                          alerts={alertStyles || []}
                          goals={goalStyles || []}
                          id={goal._id}
                          values={{
                            title: goal.title,
                            alertStyleId: goal.alertStyleId || "",
                            goalStyleId: goal.goalStyleId || "",
                            total: goal.total || 0,
                          }}
                          onUpdate={async (values) => {
                            try {
                              await updateGoal({
                                id: goal._id,
                                ...values,
                                alertStyleId: (values.alertStyleId ||
                                  undefined) as Id<"alertStyles">,
                                goalStyleId: (values.goalStyleId ||
                                  undefined) as Id<"goalStyles">,
                              });
                              toast({
                                title: "Сбор обновлен!",
                              });
                            } catch (error) {
                              toast({
                                title: "Не удалось обновить сбор",
                                variant: "destructive",
                              });
                              console.log(error);
                            }
                          }}
                          onDelete={async () => {
                            try {
                              await deleteGoal({
                                id: goal._id,
                              });
                            } catch (error) {
                              toast({
                                variant: "destructive",
                                title: "Не удалось удалить сбор",
                              });
                              console.log(error);
                            }
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const formSchemaAlert = z.object({
  backgroundColor: z.string(),
  textColor: z.string(),
  duration: z.number(),
  image: z.string(),
  name: z.string(),
  fontSize: z.number(),
});

function FormAlert({
  values,
  onUpdate,
  onDelete,
}: {
  values: z.infer<typeof formSchemaAlert>;
  onUpdate: (values: z.infer<typeof formSchemaAlert>) => void;
  onDelete: () => void;
}) {
  const formAlert = useForm<z.infer<typeof formSchemaAlert>>({
    resolver: zodResolver(formSchemaAlert),
    defaultValues: values,
  });
  const debouncedOnUpdate = useDebouncedCallback(
    (data: z.infer<typeof formSchemaAlert>) => {
      onUpdate(data);
    },
    500
  );

  useEffect(() => {
    const subscription = formAlert.watch((data) => {
      debouncedOnUpdate({
        backgroundColor: data.backgroundColor || "",
        textColor: data.textColor || "",
        duration: data.duration || 0,
        image: data.image || "",
        name: data.name || "",
        fontSize: data.fontSize || 0,
      });
    });
    return () => subscription.unsubscribe();
  }, [formAlert, debouncedOnUpdate]);

  return (
    <Form {...formAlert}>
      <form className="flex gap-3 flex-col">
        <Button
          type="button"
          disabled={values.name === "По умолчанию"}
          variant={"outline"}
          size={"sm"}
          onClick={onDelete}
        >
          Удалить
        </Button>
        <div className="flex gap-6">
          <FormField
            control={formAlert.control}
            name="textColor"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Цвет текста</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formAlert.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Цвет фона</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6">
          <FormField
            control={formAlert.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input disabled={values.name === "По умолчанию"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />{" "}
          <FormField
            control={formAlert.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Время</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Секунды" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6">
          <FormField
            control={formAlert.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Картинка</FormLabel>
                <FormControl>
                  <Input placeholder="Ссылка из интернета" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formAlert.control}
            name="fontSize"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Размер текста</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

const formSchemaGoalSyles = z.object({
  name: z.string(),
  colorBorder: z.string(),
  colorFilled: z.string(),
  direction: z.boolean(),
});

function FormGoalStyles({
  values,
  onUpdate,
  onDelete,
}: {
  values: z.infer<typeof formSchemaGoalSyles>;
  onUpdate: (values: z.infer<typeof formSchemaGoalSyles>) => void;
  onDelete: () => void;
}) {
  const formGoalStyle = useForm<z.infer<typeof formSchemaGoalSyles>>({
    resolver: zodResolver(formSchemaGoalSyles),
    defaultValues: values,
  });
  const debouncedOnUpdate = useDebouncedCallback(
    (data: z.infer<typeof formSchemaGoalSyles>) => {
      onUpdate(data);
    },
    500
  );

  useEffect(() => {
    const subscription = formGoalStyle.watch((data) => {
      debouncedOnUpdate({
        name: data.name || "",
        colorBorder: data.colorBorder || "",
        colorFilled: data.colorFilled || "",
        direction: data.direction || false,
      });
    });
    return () => subscription.unsubscribe();
  }, [formGoalStyle, debouncedOnUpdate]);

  return (
    <Form {...formGoalStyle}>
      <form className="flex gap-3 flex-col">
        <Button
          type="button"
          disabled={values.name === "По умолчанию"}
          variant={"outline"}
          size={"sm"}
          onClick={onDelete}
        >
          Удалить
        </Button>
        <div className="flex gap-6">
          <FormField
            control={formGoalStyle.control}
            name="colorBorder"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Цвет обводки</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formGoalStyle.control}
            name="colorFilled"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Цвет фона</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6">
          <FormField
            control={formGoalStyle.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input disabled={values.name === "По умолчанию"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />{" "}
          <FormField
            control={formGoalStyle.control}
            name="direction"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Направление</FormLabel>
                <div className="flex items-center gap-2 pt-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  {formGoalStyle.getValues("direction")
                    ? "Вериткально"
                    : "Горизонтально"}
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

const formSchemaGoal = z.object({
  title: z.string(),
  alertStyleId: z.optional(z.string()),
  goalStyleId: z.optional(z.string()),
  total: z.number(),
});
function FormGoal({
  id,
  collected,
  values,
  alerts,
  goals,
  onUpdate,
  onDelete,
}: {
  id: Id<"goals">;
  collected: number;
  values: z.infer<typeof formSchemaGoal>;
  alerts: Doc<"alertStyles">[] | [];
  goals: Doc<"goalStyles">[] | [];
  onUpdate: (values: z.infer<typeof formSchemaGoal>) => void;
  onDelete: () => void;
}) {
  const formGoal = useForm<z.infer<typeof formSchemaGoal>>({
    resolver: zodResolver(formSchemaGoal),
    defaultValues: values,
  });

  const debouncedOnUpdate = useDebouncedCallback(
    (data: z.infer<typeof formSchemaGoal>) => {
      onUpdate(data);
    },
    500
  );

  useEffect(() => {
    const subscription = formGoal.watch((data) => {
      debouncedOnUpdate({
        title: data.title || "",
        alertStyleId: data.alertStyleId || "",
        goalStyleId: data.goalStyleId || "",
        total: Number(data.total),
      });
    });
    return () => subscription.unsubscribe();
  }, [formGoal, debouncedOnUpdate]);
  return (
    <Form {...formGoal}>
      <form className="flex items-center gap-3">
        <span>{collected} /</span>
        <FormField
          control={formGoal.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="Цель" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  type="reset"
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `https://donut-psi.vercel.app/${id}/goal`
                      );
                      toast({
                        title: "Ссылка скопирована",
                      });
                    } catch (error) {
                      toast({
                        title: "Не удалось скопировать!",
                        variant: "destructive",
                      });
                      console.log(error);
                    }
                  }}
                >
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Скопировать ссылку на встраивание виджета
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <FormField
          control={formGoal.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder={"Название"} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={formGoal.control}
          name="alertStyleId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Стиль оповещения" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {alerts.map((style) => (
                    <SelectItem key={style._id} value={style._id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={formGoal.control}
          name="goalStyleId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Стиль сбора" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {goals.map((style) => (
                    <SelectItem key={style._id} value={style._id}>
                      {style.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="button" size={"sm"} onClick={onDelete}>
          Удалить
        </Button>
      </form>
    </Form>
  );
}
