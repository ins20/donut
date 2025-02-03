"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const { signIn } = useAuthActions();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Навигация */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold">Donut</h1>
        <Button 
          onClick={() => signIn("google")}
          className="bg-black text-white hover:bg-gray-800 text-sm md:text-base"
        >
          Начать
        </Button>
      </nav>

      {/* Главный раздел */}
      <section className="flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Революция в донатах на стримах</h1>
        <p className="text-base md:text-xl mb-8 text-gray-600 max-w-2xl">
          Donut предлагает самую гибкую и удобную систему донатов с нулевыми комиссиями и мгновенными выплатами.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Button className="bg-black text-white hover:bg-gray-800"  onClick={() => signIn("google")}>Начать бесплатно</Button>
          <Button variant="outline">Узнать больше</Button>
        </div>
      </section>

      {/* Секция сравнения */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Почему Donut?</h2>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <Card className="p-6 flex-1">
              <CardTitle className="mb-4">Donut vs Другие</CardTitle>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span>Комиссии</span>
                  <span>0% vs 5-10%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Скорость выплат</span>
                  <span>Мгновенно vs 3-7 дней</span>
                </div>
                <div className="flex justify-between">
                  <span>Настройка</span>
                  <span>Полная vs Ограниченная</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 flex-1">
              <CardTitle className="mb-4">Основные функции</CardTitle>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  Поддержка нескольких платформ
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  Расширенная аналитика
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  Защита от возвратов
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Секция процесса работы */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Регистрация</h3>
              <p className="text-gray-600">Подключите свой стриминговый аккаунт</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Настройка</h3>
              <p className="text-gray-600">Создайте свои виджеты для донатов</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Стрим</h3>
              <p className="text-gray-600">Начните получать донаты</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Вывод</h3>
              <p className="text-gray-600">Мгновенные выплаты на ваш счет</p>
            </div>
          </div>
        </div>
      </section>

      {/* Секция FAQ */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6">
              <CardTitle>Есть ли комиссии?</CardTitle>
              <CardDescription className="mt-2">
                Donut не берет комиссий. Мы вычитаем только стандартные платежные сборы.
              </CardDescription>
            </Card>
            <Card className="p-6">
              <CardTitle>Можно ли использовать кастомные уведомления?</CardTitle>
              <CardDescription className="mt-2">
                Да, наш редактор позволяет полностью настраивать уведомления, звуки и визуальные эффекты.
              </CardDescription>
            </Card>
            <Card className="p-6">
              <CardTitle>Как быстро происходят выплаты?</CardTitle>
              <CardDescription className="mt-2">
                Все выплаты обрабатываются мгновенно на ваш платежный метод.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t py-8 mt-12 md:mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Donut. Все права защищены.</p>
          <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
            <a href="#" className="hover:text-gray-900">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gray-900">Условия использования</a>
            <a href="#" className="hover:text-gray-900">Поддержка</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
