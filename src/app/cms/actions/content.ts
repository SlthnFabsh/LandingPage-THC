'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { isPasswordExpired } from '@/lib/password';
import { processImageUpload } from '@/lib/upload';
import { writeAudit } from '@/lib/audit';

const ERROR_NOT_AUTH = 'You are not allowed to perform this action.';
const ERROR_EXPIRED = 'Password expired. Change your password first.';

export interface ContentFormState {
  error?: string;
}

const PUBLIC_PATHS = ['/', '/tentang/informasi-perusahaan'];

async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null as null, expired: false };
  return { user, expired: isPasswordExpired(user.passwordChangedAt) };
}

function linesToArray(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

async function resolveImage(
  formData: FormData,
  current?: string | null
): Promise<{ image?: string; error?: string }> {
  const url = String(formData.get('imageUrl') || '').trim();
  const file = (formData.get('image') as File) || null;
  if (url) return { image: url };
  if (file && file.size > 0) {
    const result = await processImageUpload(file);
    if (result.error) return { error: result.error };
    return { image: result.coverImage };
  }
  return { image: current ?? '' };
}

function text(formData: FormData, key: string): string {
  return String(formData.get(key) || '').trim();
}

function active(formData: FormData): boolean {
  return formData.get('active') === 'on';
}

/* ------------------------------ Hero Slide ------------------------------ */

export async function createHeroSlide(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const titleEn = text(formData, 'titleEn');
  if (!titleEn) return { error: 'Slide title is required.' };

  const imageResult = await resolveImage(formData);
  if (imageResult.error) return { error: imageResult.error };
  if (!imageResult.image) return { error: 'Slide image is required (upload or URL).' };

  const slide = await prisma.heroSlide.create({
    data: {
      titleId: titleEn,
      titleEn,
      subtitleId: text(formData, 'subtitleEn') || null,
      subtitleEn: text(formData, 'subtitleEn') || null,
      ctaLabelId: text(formData, 'ctaLabelEn') || null,
      ctaLabelEn: text(formData, 'ctaLabelEn') || null,
      ctaHref: text(formData, 'ctaHref') || null,
      image: imageResult.image,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'HeroSlide',
    entityId: slide.id,
    detail: `Hero slide "${slide.titleEn}" added`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/slider');
}

export async function updateHeroSlide(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) return { error: 'Slide not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const titleEn = text(formData, 'titleEn');
  if (!titleEn) return { error: 'Slide title is required.' };

  const imageResult = await resolveImage(formData, existing.image);
  if (imageResult.error) return { error: imageResult.error };

  const slide = await prisma.heroSlide.update({
    where: { id },
    data: {
      titleId: titleEn,
      titleEn,
      subtitleId: text(formData, 'subtitleEn') || null,
      subtitleEn: text(formData, 'subtitleEn') || null,
      ctaLabelId: text(formData, 'ctaLabelEn') || null,
      ctaLabelEn: text(formData, 'ctaLabelEn') || null,
      ctaHref: text(formData, 'ctaHref') || null,
      image: imageResult.image || existing.image,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'HeroSlide',
    entityId: slide.id,
    detail: `Hero slide "${slide.titleEn}" updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/slider');
}

export async function deleteHeroSlide(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = text(formData, 'id');
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) return;

  await prisma.heroSlide.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'HeroSlide',
    entityId: id,
    detail: `Hero slide "${slide.titleEn}" deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/slider');
}

/* --------------------------- Profil Perusahaan --------------------------- */

export async function upsertProfile(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const titleEn = text(formData, 'titleEn');
  const p1En = text(formData, 'p1En');
  if (!titleEn || !p1En) {
    return { error: 'Title and first paragraph are required.' };
  }

  const licensesEn = linesToArray(text(formData, 'licensesEn'));
  const misiEn = text(formData, 'misiEn');
  const existingId = text(formData, 'id');

  const homeImage = await (async () => {
    const url = text(formData, 'homeImageUrl');
    if (url) return url;
    const file = (formData.get('homeImage') as File) || null;
    if (file && file.size > 0) {
      const result = await processImageUpload(file);
      if (result.error) return null;
      return result.coverImage;
    }
    return null;
  })();

  const data = {
    titleId: titleEn,
    titleEn,
    p1Id: p1En,
    p1En,
    p2Id: text(formData, 'p2En'),
    p2En: text(formData, 'p2En'),
    introId: text(formData, 'introEn'),
    introEn: text(formData, 'introEn'),
    visiId: text(formData, 'visiEn'),
    visiEn: text(formData, 'visiEn'),
    misiId: misiEn,
    misiEn,
    licensesId: licensesEn.length ? licensesEn : [],
    licensesEn: licensesEn.length ? licensesEn : [],
    ...(homeImage ? { homeImage } : {}),
  };

  let company;
  if (existingId) {
    company = await prisma.companyContent.update({ where: { id: existingId }, data });
  } else {
    company = await prisma.companyContent.create({ data: { id: 'company', ...data } });
  }

  await writeAudit(existingId ? 'CONTENT_UPDATED' : 'CONTENT_CREATED', {
    userId: user.id,
    entity: 'CompanyContent',
    entityId: company.id,
    detail: 'Company profile saved',
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/profil');
}

/* ------------------------------ Statistik ------------------------------ */

async function getCompanyId(): Promise<string> {
  const existing = await prisma.companyContent.findFirst();
  if (existing) return existing.id;
  const created = await prisma.companyContent.create({
    data: {
      id: 'company',
      titleId: 'COMPANY',
      titleEn: 'COMPANY',
      p1Id: '',
      p1En: '',
      p2Id: '',
      p2En: '',
      introId: '',
      introEn: '',
      visiId: '',
      visiEn: '',
      misiId: '',
      misiEn: '',
      licensesId: [],
      licensesEn: [],
    },
  });
  return created.id;
}

export async function createStat(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const labelEn = text(formData, 'labelEn');
  const value = Number(text(formData, 'value'));
  if (!labelEn || Number.isNaN(value)) {
    return { error: 'Value and statistic label are required.' };
  }

  const stat = await prisma.companyStat.create({
    data: {
      companyId: await getCompanyId(),
      order: Number(text(formData, 'order') || 0),
      value,
      suffix: text(formData, 'suffix') || '',
      labelId: labelEn,
      labelEn,
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'CompanyStat',
    entityId: stat.id,
    detail: `Statistic "${stat.labelEn}" added`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/profil/statistik');
}

export async function updateStat(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.companyStat.findUnique({ where: { id } });
  if (!existing) return { error: 'Statistic not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const labelEn = text(formData, 'labelEn');
  const value = Number(text(formData, 'value'));
  if (!labelEn || Number.isNaN(value)) {
    return { error: 'Value and statistic label are required.' };
  }

  const stat = await prisma.companyStat.update({
    where: { id },
    data: {
      order: Number(text(formData, 'order') || 0),
      value,
      suffix: text(formData, 'suffix') || '',
      labelId: labelEn,
      labelEn,
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'CompanyStat',
    entityId: stat.id,
    detail: `Statistic "${stat.labelEn}" updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/profil/statistik');
}

export async function deleteStat(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = text(formData, 'id');
  const stat = await prisma.companyStat.findUnique({ where: { id } });
  if (!stat) return;

  await prisma.companyStat.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'CompanyStat',
    entityId: id,
    detail: `Statistic "${stat.labelEn}" deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/profil/statistik');
}

/* ------------------------------- Layanan ------------------------------- */

export async function createService(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const titleEn = text(formData, 'titleEn');
  const descEn = text(formData, 'descEn');
  if (!titleEn || !descEn) {
    return { error: 'Title and description are required.' };
  }

  const service = await prisma.serviceItem.create({
    data: {
      titleId: titleEn,
      titleEn,
      descId: descEn,
      descEn,
      icon: text(formData, 'icon') || 'layers',
      iconColor: text(formData, 'iconColor') || 'text-brand-600',
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'ServiceItem',
    entityId: service.id,
    detail: `Service "${service.titleEn}" added`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/layanan');
}

export async function updateService(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.serviceItem.findUnique({ where: { id } });
  if (!existing) return { error: 'Service not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const titleEn = text(formData, 'titleEn');
  const descEn = text(formData, 'descEn');
  if (!titleEn || !descEn) {
    return { error: 'Title and description are required.' };
  }

  const service = await prisma.serviceItem.update({
    where: { id },
    data: {
      titleId: titleEn,
      titleEn,
      descId: descEn,
      descEn,
      icon: text(formData, 'icon') || existing.icon,
      iconColor: text(formData, 'iconColor') || existing.iconColor,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'ServiceItem',
    entityId: service.id,
    detail: `Service "${service.titleEn}" updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/layanan');
}

export async function deleteService(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = text(formData, 'id');
  const service = await prisma.serviceItem.findUnique({ where: { id } });
  if (!service) return;

  await prisma.serviceItem.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'ServiceItem',
    entityId: id,
    detail: `Service "${service.titleEn}" deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/layanan');
}

/* -------------------- Pelanggan & Mitra (logo) -------------------- */

type LogoEntity = 'CustomerLogo' | 'PartnerLogo';
type LogoRedirect = '/cms/pelanggan' | '/cms/mitra';

function logoRepository(entity: LogoEntity) {
  return entity === 'CustomerLogo' ? prisma.customerLogo : prisma.partnerLogo;
}

function logoRedirectPath(entity: LogoEntity): LogoRedirect {
  return entity === 'CustomerLogo' ? '/cms/pelanggan' : '/cms/mitra';
}

export async function createLogo(
  entity: LogoEntity,
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const name = text(formData, 'name');
  if (!name) return { error: 'Name is required.' };

  const imageResult = await resolveImage(formData);
  if (imageResult.error) return { error: imageResult.error };
  if (!imageResult.image) return { error: 'Logo is required (upload or URL).' };

  const repo = logoRepository(entity);
  const item = await (repo as typeof prisma.customerLogo).create({
    data: {
      name,
      image: imageResult.image,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity,
    entityId: item.id,
    detail: `${entity === 'CustomerLogo' ? 'Customer' : 'Partner'} "${name}" added`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect(logoRedirectPath(entity));
}

export async function updateLogo(
  entity: LogoEntity,
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const id = text(formData, 'id');
  const repo = logoRepository(entity) as typeof prisma.customerLogo;
  const existing = await repo.findUnique({ where: { id } });
  if (!existing) return { error: 'Record not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const name = text(formData, 'name');
  if (!name) return { error: 'Nama wajib diisi.' };

  const imageResult = await resolveImage(formData, existing.image);
  if (imageResult.error) return { error: imageResult.error };

  const item = await repo.update({
    where: { id },
    data: {
      name,
      image: imageResult.image || existing.image,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity,
    entityId: item.id,
    detail: `${entity === 'CustomerLogo' ? 'Customer' : 'Partner'} "${name}" updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect(logoRedirectPath(entity));
}

export async function deleteLogo(entity: LogoEntity, formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = text(formData, 'id');
  const repo = logoRepository(entity) as typeof prisma.customerLogo;
  const existing = await repo.findUnique({ where: { id } });
  if (!existing) return;

  await repo.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity,
    entityId: id,
    detail: `${entity === 'CustomerLogo' ? 'Customer' : 'Partner'} "${existing.name}" deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect(logoRedirectPath(entity));
}

/* -------------------------------- FAQ -------------------------------- */

export async function createFaq(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const questionEn = text(formData, 'questionEn');
  const answerEn = text(formData, 'answerEn');
  if (!questionEn || !answerEn) {
    return { error: 'Question and answer are required.' };
  }

  const faq = await prisma.faqEntry.create({
    data: {
      questionId: questionEn,
      questionEn,
      answerId: answerEn,
      answerEn,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'FaqEntry',
    entityId: faq.id,
    detail: `FAQ "${questionEn.slice(0, 60)}" added`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/faq');
}

export async function updateFaq(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.faqEntry.findUnique({ where: { id } });
  if (!existing) return { error: 'FAQ not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const questionEn = text(formData, 'questionEn');
  const answerEn = text(formData, 'answerEn');
  if (!questionEn || !answerEn) {
    return { error: 'Question and answer are required.' };
  }

  const faq = await prisma.faqEntry.update({
    where: { id },
    data: {
      questionId: questionEn,
      questionEn,
      answerId: answerEn,
      answerEn,
      order: Number(text(formData, 'order') || 0),
      active: active(formData),
    },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'FaqEntry',
    entityId: faq.id,
    detail: `FAQ "${questionEn.slice(0, 60)}" updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/faq');
}

export async function deleteFaq(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = text(formData, 'id');
  const existing = await prisma.faqEntry.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.faqEntry.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'FaqEntry',
    entityId: id,
    detail: `FAQ deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/faq');
}

/* -------------------------------- Kontak -------------------------------- */

export async function upsertContact(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const email = text(formData, 'email');
  const phoneDisplay = text(formData, 'phoneDisplay');
  if (!email || !phoneDisplay) return { error: 'Email and phone number are required.' };

  const existingId = text(formData, 'id');
  const data = {
    officeAddressId: text(formData, 'officeAddressEn'),
    officeAddressEn: text(formData, 'officeAddressEn'),
    operationalAddressId: text(formData, 'operationalAddressEn'),
    operationalAddressEn: text(formData, 'operationalAddressEn'),
    phone: text(formData, 'phone') || phoneDisplay,
    phoneDisplay,
    email,
    whatsapp: text(formData, 'whatsapp') || null,
  };

  if (existingId) {
    const row = await prisma.contactSetting.update({ where: { id: existingId }, data });
    await writeAudit('CONTENT_UPDATED', {
      userId: user.id,
      entity: 'ContactSetting',
      entityId: row.id,
      detail: 'Contacts updated',
    });
  } else {
    const row = await prisma.contactSetting.create({ data: { id: 'kontak', ...data } });
    await writeAudit('CONTENT_CREATED', {
      userId: user.id,
      entity: 'ContactSetting',
      entityId: row.id,
      detail: 'Contacts created',
    });
  }

  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/kontak');
}

/* ----------------------------- Sosial Media ----------------------------- */

export async function createSocial(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const platform = text(formData, 'platform');
  const url = text(formData, 'url');
  if (!platform || !url) return { error: 'Platform and URL are required.' };

  const social = await prisma.socialMediaLink.create({
    data: { platform, url, order: Number(text(formData, 'order') || 0), active: active(formData) },
  });

  await writeAudit('CONTENT_CREATED', {
    userId: user.id,
    entity: 'SocialMediaLink',
    entityId: social.id,
    detail: `Social media ${platform} added`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/sosmed');
}

export async function updateSocial(
  prevState: ContentFormState,
  formData: FormData
): Promise<ContentFormState> {
  const id = text(formData, 'id');
  const existing = await prisma.socialMediaLink.findUnique({ where: { id } });
  if (!existing) return { error: 'Link not found.' };

  const { user, expired } = await requireUser();
  if (!user) return { error: ERROR_NOT_AUTH };
  if (expired) return { error: ERROR_EXPIRED };

  const platform = text(formData, 'platform');
  const url = text(formData, 'url');
  if (!platform || !url) return { error: 'Platform and URL are required.' };

  const social = await prisma.socialMediaLink.update({
    where: { id },
    data: { platform, url, order: Number(text(formData, 'order') || 0), active: active(formData) },
  });

  await writeAudit('CONTENT_UPDATED', {
    userId: user.id,
    entity: 'SocialMediaLink',
    entityId: social.id,
    detail: `Social media ${platform} updated`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/sosmed');
}

export async function deleteSocial(formData: FormData) {
  const { user, expired } = await requireUser();
  if (!user) return;
  if (expired) redirect('/cms/password');

  const id = text(formData, 'id');
  const existing = await prisma.socialMediaLink.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.socialMediaLink.delete({ where: { id } });
  await writeAudit('CONTENT_DELETED', {
    userId: user.id,
    entity: 'SocialMediaLink',
    entityId: id,
    detail: `Social media ${existing.platform} deleted`,
  });
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  redirect('/cms/sosmed');
}