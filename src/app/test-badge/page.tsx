'use client';

import Badge from '../../modules/common/components/Badge';

export default function TestBadgePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Badge Test Page</h1>
      
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Rainbow Badge (with gradient border)</h2>
        <Badge text="COLOR" color="rainbow" square />
        <Badge text="COLOR with dot" color="rainbow" square dotted />
        <Badge text="Rounded Rainbow" color="rainbow" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Regular Badges</h2>
        <Badge text="Green Badge" color="green" square />
        <Badge text="Blue Badge" color="blue" square />
        <Badge text="Red Badge" color="red" />
      </div>
    </div>
  );
}