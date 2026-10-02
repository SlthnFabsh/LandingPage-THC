import type { ServiceBlock } from '@/lib/service-blocks';
import type {
  BadgesData,
  CardsData,
  CtaData,
  FeaturesData,
  ImageData,
  IntroData,
  MetricsData,
  ProcessData,
  TableData,
  TabsData,
} from '@/lib/service-blocks';
import Reveal from './Reveal';
import CardsBlock from './CardsBlock';
import TabsBlock from './TabsBlock';
import {
  BadgesBlock,
  CtaBlock,
  FeaturesBlock,
  ImageBlock,
  IntroBlock,
  MetricsBlock,
  ProcessBlock,
  TableBlock,
} from './server-blocks';

function Block({ block, delay }: { block: ServiceBlock; delay: number }) {
  const { type, data } = block;

  switch (type) {
    case 'INTRO':
      return (
        <Reveal delay={delay}>
          <IntroBlock data={data as IntroData} />
        </Reveal>
      );

    case 'BADGES':
      return (
        <Reveal delay={delay}>
          <BadgesBlock data={data as BadgesData} />
        </Reveal>
      );

    case 'METRICS':
      return (
        <Reveal delay={delay}>
          <MetricsBlock data={data as MetricsData} />
        </Reveal>
      );

    case 'FEATURES':
      return (
        <Reveal delay={delay}>
          <FeaturesBlock data={data as FeaturesData} />
        </Reveal>
      );

    case 'CARDS':
      return (
        <Reveal delay={delay}>
          <CardsBlock data={data as CardsData} />
        </Reveal>
      );

    case 'TABS':
      return (
        <Reveal delay={delay}>
          <TabsBlock data={data as TabsData} />
        </Reveal>
      );

    case 'TABLE':
      return (
        <Reveal delay={delay}>
          <TableBlock data={data as TableData} />
        </Reveal>
      );

    case 'PROCESS':
      return (
        <Reveal delay={delay}>
          <ProcessBlock data={data as ProcessData} />
        </Reveal>
      );

    case 'IMAGE':
      return (
        <Reveal delay={delay}>
          <ImageBlock data={data as ImageData} />
        </Reveal>
      );

    case 'CTA':
      return (
        <Reveal delay={delay}>
          <CtaBlock data={data as CtaData} />
        </Reveal>
      );

    default:
      return null;
  }
}

/**
 * Merender daftar blok sebuah halaman. Blok dengan interaksi (Tab, Kartu
 * accordion) memuat JS, sisanya HTML murni hasil render server.
 */
export default function ServiceBlockList({
  blocks,
  nested = false,
}: {
  blocks: ServiceBlock[];
  nested?: boolean;
}) {
  if (blocks.length === 0) return null;

  return (
    <div className={nested ? 'space-y-8' : 'space-y-6'}>
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} delay={nested ? 0 : index * 0.05} />
      ))}
    </div>
  );
}
