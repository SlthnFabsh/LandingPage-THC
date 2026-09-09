import { requireCms } from '@/lib/cms-auth';
import SliderForm from '@/components/cms/SliderForm';
import { createHeroSlide } from '@/app/cms/actions/content';

export const dynamic = 'force-dynamic';

export default async function SliderNewPage() {
  await requireCms();
  return <SliderForm mode="create" action={createHeroSlide as never} />;
}