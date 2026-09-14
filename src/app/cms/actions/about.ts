'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import { writeAudit } from '@/lib/audit';

const ERROR_NOT_AUTH = 'You are not allowed to perform this action.';
const ERROR_EXPIRED = 'Password expired. Change your password first.';

export interface AboutFormState {
  error?: string;
}

const PUBLIC_PATHS = [
  '/tentang/informasi-perusahaan',
  '/tentang/struktur-grup',
  '/tentang/nilai-inti',
];

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null as null, expired: false };
  return { user, expired: isPasswordExpired(user.passwordChangedAt) };
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) || '').trim();
}

function active(formData: FormData): boolean {
  return formData.get('active') === 'on';
}

function linesToArray(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

/* ------------------------------ Milestones ------------------------------ */

export async function createMilestone(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const year = text(formData, 'year');
  const titleEn = text(formData, 'titleEn');
  if (!year || !titleEn) return { error: 'Year and title are required.' };

  const milestone = await prisma.milestone.create({
    data: {
      order: Number(text(formData, 'order') || 0),
      year,
      titleId: text(formData, 'titleId') || titleEn,
      titleEn,
      pointsId: linesToArray(text(formData, 'pointsId')),
      pointsEn: linesToArray(text(formData, 'pointsEn')),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'Milestone',
    entityId: milestone.id,
    detail: `Milestone ${milestone.year} created`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/timeline');
}

export async function updateMilestone(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.milestone.findUnique({ where: { id } });
  if (!existing) return { error: 'Milestone not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const year = text(formData, 'year');
  const titleEn = text(formData, 'titleEn');
  if (!year || !titleEn) return { error: 'Year and title are required.' };

  const milestone = await prisma.milestone.update({
    where: { id },
    data: {
      order: Number(text(formData, 'order') || 0),
      year,
      titleId: text(formData, 'titleId') || titleEn,
      titleEn,
      pointsId: linesToArray(text(formData, 'pointsId')),
      pointsEn: linesToArray(text(formData, 'pointsEn')),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'Milestone',
    entityId: milestone.id,
    detail: `Milestone ${milestone.year} updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/timeline');
}

export async function deleteMilestone(formData: FormData) {
  const id = text(formData, 'id');
  const existing = await prisma.milestone.findUnique({ where: { id } });
  if (!existing) return;

  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  await prisma.milestone.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'Milestone',
    entityId: id,
    detail: `Milestone ${existing.year} deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/timeline');
}

/* --------------------------------- Core Values -------------------------------- */

export async function upsertCoreValueSetting(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const introEn = text(formData, 'introEn');
  if (!introEn) return { error: 'Intro text is required.' };

  const existing = await prisma.coreValueSetting.findFirst();
  const data = {
    introId: text(formData, 'introId') || introEn,
    introEn,
  };

  if (existing) {
    await prisma.coreValueSetting.update({ where: { id: existing.id }, data });
  } else {
    await prisma.coreValueSetting.create({ data });
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'CoreValueSetting',
    entityId: existing?.id ?? 'setting',
    detail: 'Core values section intro updated',
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/nilai-inti');
}

export async function createCoreValue(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const letter = text(formData, 'letter');
  const titleEn = text(formData, 'titleEn');
  const descriptionEn = text(formData, 'descriptionEn');
  if (!letter || !titleEn || !descriptionEn) {
    return { error: 'Letter, title, and description are required.' };
  }

  const value = await prisma.coreValue.create({
    data: {
      order: Number(text(formData, 'order') || 0),
      letter,
      titleId: text(formData, 'titleId') || titleEn,
      titleEn,
      descriptionId: text(formData, 'descriptionId') || descriptionEn,
      descriptionEn,
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'CoreValue',
    entityId: value.id,
    detail: `Core value ${value.letter} created`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/nilai-inti');
}

export async function updateCoreValue(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.coreValue.findUnique({ where: { id } });
  if (!existing) return { error: 'Core value not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const letter = text(formData, 'letter');
  const titleEn = text(formData, 'titleEn');
  const descriptionEn = text(formData, 'descriptionEn');
  if (!letter || !titleEn || !descriptionEn) {
    return { error: 'Letter, title, and description are required.' };
  }

  const value = await prisma.coreValue.update({
    where: { id },
    data: {
      order: Number(text(formData, 'order') || 0),
      letter,
      titleId: text(formData, 'titleId') || titleEn,
      titleEn,
      descriptionId: text(formData, 'descriptionId') || descriptionEn,
      descriptionEn,
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'CoreValue',
    entityId: value.id,
    detail: `Core value ${value.letter} updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/nilai-inti');
}

export async function deleteCoreValue(formData: FormData) {
  const id = text(formData, 'id');
  const existing = await prisma.coreValue.findUnique({ where: { id } });
  if (!existing) return;

  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  await prisma.coreValue.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'CoreValue',
    entityId: id,
    detail: `Core value ${existing.letter} deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/nilai-inti');
}

/* ------------------------------ Group Structure ------------------------------ */

export async function upsertGroupStructure(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const parentName = text(formData, 'parentName');
  if (!parentName) return { error: 'Parent company name is required.' };

  const data = {
    parentBadge: text(formData, 'parentBadge'),
    parentName,
    parentTag: text(formData, 'parentTag'),
    child1Name: text(formData, 'child1Name'),
    child1Tag: text(formData, 'child1Tag'),
    child2Name: text(formData, 'child2Name'),
    child2Tag: text(formData, 'child2Tag'),
    card1Label: text(formData, 'card1Label'),
    card1Desc: text(formData, 'card1Desc'),
    card2Label: text(formData, 'card2Label'),
    card2Desc: text(formData, 'card2Desc'),
    card3Label: text(formData, 'card3Label'),
    card3Desc: text(formData, 'card3Desc'),
  };

  const existing = await prisma.groupStructure.findFirst();
  if (existing) {
    await prisma.groupStructure.update({ where: { id: existing.id }, data });
  } else {
    await prisma.groupStructure.create({ data });
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'GroupStructure',
    entityId: existing?.id ?? 'setting',
    detail: 'Group structure updated',
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/struktur-grup');
}

/* ------------------------------ About Page Hero ------------------------------ */

export async function upsertAboutPage(
  prevState: AboutFormState,
  formData: FormData
): Promise<AboutFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const key = text(formData, 'key');
  if (!['informasi', 'struktur', 'nilai'].includes(key)) {
    return { error: 'Invalid page key.' };
  }

  const titleEn = text(formData, 'titleEn');
  if (!titleEn) return { error: 'Page title is required.' };

  const data = {
    titleId: text(formData, 'titleId') || titleEn,
    titleEn,
    subtitleId: text(formData, 'subtitleId'),
    subtitleEn: text(formData, 'subtitleEn'),
  };

  const existing = await prisma.aboutPage.findUnique({ where: { key } });
  if (existing) {
    await prisma.aboutPage.update({ where: { id: existing.id }, data });
  } else {
    await prisma.aboutPage.create({
      data: { key, titleId: data.titleId, titleEn, subtitleId: data.subtitleId, subtitleEn: data.subtitleEn },
    });
  }

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'AboutPage',
    entityId: existing?.id ?? key,
    detail: `About page ${key} hero updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/about-hero');
}
