import { User } from "@prisma/client";

export const userEntityList: User[] = [
  {
    name: 'Joao Rangel',
    email: 'joao@hcode.com.br',
    imageUrl: "image",
    id: '02c6a30a-3b5d-4dcc-9f04-e1eed8ac809e',
    githubId: 123456,
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
  },
  {
    name: 'Glaucio Daniel',
    email: 'glaucio@hcode.com.br',
    imageUrl: "image",
    id: '2',
    githubId: 123456,
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
  },
  {
    name: 'Djalma Sindaux',
    email: 'djalma@hcode.com.br',
    imageUrl: "image",
    id: '3',
    githubId: 123456,
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
  },
];
