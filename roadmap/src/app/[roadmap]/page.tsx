import type { Metadata } from 'next';
import { roadmaps } from '@/data/roadmaps';
import { RoadmapClient } from '@/components/RoadmapClient';

export function generateStaticParams() {
    return Object.keys(roadmaps).map(roadmap => ({ roadmap }));
}

type Props = {
    params: Promise<{ roadmap: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const paramsSync = await params;
    const roadmapData = roadmaps[paramsSync.roadmap];
    
    return {
      title: `${roadmapData?.title || 'Roadmap'} | Alex Go`,
      description: roadmapData?.description || 'Путь в IT разработку',
    };
}

export default async function RoadmapPage({ params }: Props) {
    const paramsSync = await params;
    const roadmap = roadmaps[paramsSync.roadmap];
    
    if (!roadmap) {
      return <div>Roadmap not found</div>;
    }
  
    return <RoadmapClient 
        type={paramsSync.roadmap} 
        title={roadmap.title} 
        description={roadmap.description} 
    />;
}
