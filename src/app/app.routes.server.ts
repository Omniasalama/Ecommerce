import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'address/:cartId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server,
  },
];
