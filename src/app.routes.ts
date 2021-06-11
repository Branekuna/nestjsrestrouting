import { Routes } from 'nest-router';
import { CatsModule } from './cats/cats.module';
import { OwnersModule } from './owners/owners.module';

export const routes: Routes = [
  {
    path: '/cats',
    module: CatsModule,
    children: [
      {
        path: '/:id/owners',
        module: OwnersModule,
      },
    ],
  },
];
