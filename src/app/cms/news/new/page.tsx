import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { createNews } from '@/app/cms/actions/news';
import NewsForm from '@/components/cms/NewsForm';

export const dynamic = 'force-dynamic';

export default async function NewNewsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/cms/login');

  return (
    <div>
      <NewsForm mode="create" action={createNews} initial={null} />
    </div>
  );
}