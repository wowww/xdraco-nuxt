import redirections from '@/middleware/redirections.json';

export default function({ route, redirect }) {
  const { path } = route;

  const destination = redirections.find(({ from }) => from === path);
  if (destination) {
    redirect(destination.to);
  }
}
