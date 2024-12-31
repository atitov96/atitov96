'use client';

import RoadmapContent from './RoadmapContent';

interface RoadmapClientProps {
  type: string;
  title: string;
  description: string;
}

export function RoadmapClient({ 
    type,
}: RoadmapClientProps) {
    return (
        <div>
            <RoadmapContent
                type={type}
            />
    </div>
  );
}