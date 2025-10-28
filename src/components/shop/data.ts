import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Разделочная доска из дуба',
    price: 3500,
    category: 'Кухня',
    material: 'Дуб',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Прочная разделочная доска из массива дуба с натуральным покрытием'
  },
  {
    id: 2,
    name: 'Миска из ореха',
    price: 4200,
    category: 'Посуда',
    material: 'Орех',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Элегантная миска ручной работы из грецкого ореха'
  },
  {
    id: 3,
    name: 'Набор лопаток из бука',
    price: 2800,
    category: 'Кухня',
    material: 'Бук',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Набор из 3 кухонных лопаток из букового дерева'
  },
  {
    id: 4,
    name: 'Подставка под горячее из ясеня',
    price: 1500,
    category: 'Аксессуары',
    material: 'Ясень',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Стильная подставка для защиты поверхности от горячей посуды'
  },
  {
    id: 5,
    name: 'Салатница из дуба',
    price: 5200,
    category: 'Посуда',
    material: 'Дуб',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Большая салатница для семейных обедов'
  },
  {
    id: 6,
    name: 'Деревянная ложка из бука',
    price: 800,
    category: 'Кухня',
    material: 'Бук',
    image: 'https://cdn.poehali.dev/projects/f9f9e738-92d1-4622-b272-9d6b5155be71/files/68d40a55-1087-41ab-8f9a-14580eb1ac2a.jpg',
    description: 'Классическая деревянная ложка для приготовления пищи'
  }
];

export const careInstructions = [
  {
    title: 'Мытье',
    description: 'Мойте изделия вручную теплой водой с мягким мылом. Избегайте посудомоечных машин.',
    icon: 'Droplets'
  },
  {
    title: 'Сушка',
    description: 'Тщательно вытирайте после мытья мягкой тканью. Сушите в вертикальном положении.',
    icon: 'Wind'
  },
  {
    title: 'Уход',
    description: 'Регулярно обрабатывайте минеральным маслом для сохранения красоты дерева.',
    icon: 'Sparkles'
  },
  {
    title: 'Хранение',
    description: 'Храните в сухом месте, избегайте прямых солнечных лучей и источников тепла.',
    icon: 'Home'
  }
];
