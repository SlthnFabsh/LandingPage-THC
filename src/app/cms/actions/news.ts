'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import { processImageUpload } from '@/lib/upload';
import { writeAudit } from '@/lib/audit';

const ERROR_NOT_AUTH = 'You are not allowed to perform this action.';

export interface NewsFormState {
  error?: string;
  success?: boolean;
  id?: string;
}

function slugifyText(input: string): string {
  const base = input.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
  return base || `news-${Date.now()}`;
}

export async function createNews(
  prevState: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  const user = await getCurrentUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (isPasswordExpired(user.passwordChangedAt)) {
    return { error: 'Password expired. Change your password first.' };
  }

  const titleEn = String(formData.get('titleEn') || '').trim();
  const summaryEn = String(formData.get('summaryEn') || '').trim();
  const contentEn = String(formData.get('contentEn') || '').trim();
  const date = String(formData.get('date') || '').trim();
  const published = formData.get('published') === 'on';
  const imageFile = (formData.get('coverImage') as File) || null;
  const coverUrl = String(formData.get('coverUrl') || '').trim();

  if (!titleEn || !summaryEn) {
    return { error: 'Title and summary are required.' };
  }

  let coverImage = '';
  if (coverUrl) {
    coverImage = coverUrl;
  } else if (imageFile && imageFile.size > 0) {
    const result = await processImageUpload(imageFile);
    if (result.error) return { error: result.error };
    coverImage = result.coverImage;
  }

  if (!coverImage) {
    return { error: 'Cover image is required (upload or URL).' };
  }

  let slug = slugifyText(titleEn);
  const existing = await prisma.newsPost.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const news = await prisma.newsPost.create({
    data: {
      titleId: titleEn,
      titleEn,
      summaryId: summaryEn,
      summaryEn,
      contentId: contentEn || null,
      contentEn: contentEn || null,
      coverImage,
      date: date ? new Date(`${date}T00:00:00.000Z`) : new Date(),
      published,
      slug,
      authorId: user.id,
    },
  });

  await writeAudit('NEWS_CREATED', {
    userId: user.id,
    entity: 'NewsPost',
    entityId: news.id,
    detail: `News "${news.titleEn}" added${published ? ' (published)' : ' (draft)'}`,
  });

  revalidatePath('/');
  revalidatePath('/cms');
  redirect('/cms/news');
}

export async function updateNews(
  prevState: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  const user = await getCurrentUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (isPasswordExpired(user.passwordChangedAt)) {
    return { error: 'Password expired. Change your password first.' };
  }

  const id = String(formData.get('id') || '');
  const titleEn = String(formData.get('titleEn') || '').trim();
  const summaryEn = String(formData.get('summaryEn') || '').trim();
  const contentEn = String(formData.get('contentEn') || '').trim();
  const date = String(formData.get('date') || '').trim();
  const published = formData.get('published') === 'on';
  const imageFile = (formData.get('coverImage') as File) || null;
  const coverUrl = String(formData.get('coverUrl') || '').trim();

  const existing = await prisma.newsPost.findUnique({ where: { id } });
  if (!existing) return { error: 'News not found.' };
  if (!titleEn || !summaryEn) {
    return { error: 'Title and summary are required.' };
  }

  let coverImage = existing.coverImage;
  if (coverUrl) {
    coverImage = coverUrl;
  } else if (imageFile && imageFile.size > 0) {
    const result = await processImageUpload(imageFile);
    if (result.error) return { error: result.error };
    coverImage = result.coverImage;
  }

  const news = await prisma.newsPost.update({
    where: { id },
    data: {
      titleId: titleEn,
      titleEn,
      summaryId: summaryEn,
      summaryEn,
      contentId: contentEn || null,
      contentEn: contentEn || null,
      coverImage,
      date: date ? new Date(`${date}T00:00:00.000Z`) : existing.date,
      published,
    },
  });

  await writeAudit(
    published !== existing.published
      ? published
        ? 'NEWS_PUBLISHED'
        : 'NEWS_UNPUBLISHED'
      : 'NEWS_UPDATED',
    {
      userId: user.id,
      entity: 'NewsPost',
      entityId: news.id,
      detail: `News "${news.titleEn}" updated`,
    }
  );

  revalidatePath('/');
  revalidatePath('/cms');
  revalidatePath(`/cms/news/${id}/edit`);
  redirect('/cms/news');
}

export async function deleteNews(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return;
  if (isPasswordExpired(user.passwordChangedAt)) {
    redirect('/cms/password');
  }

  const id = String(formData.get('id') || '');
  const news = await prisma.newsPost.findUnique({ where: { id } });
  if (!news) return;

  await prisma.newsPost.delete({ where: { id } });
  await writeAudit('NEWS_DELETED', {
    userId: user.id,
    entity: 'NewsPost',
    entityId: id,
    detail: `News "${news.titleEn}" deleted`,
  });

  revalidatePath('/');
  revalidatePath('/cms');
  redirect('/cms/news');
}
