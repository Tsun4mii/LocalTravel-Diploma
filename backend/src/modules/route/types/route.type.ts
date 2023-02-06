export class Route {
  id: string;
  name: string;
  description: string;
  userId: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
