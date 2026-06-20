import { ChevronRight } from 'lucide-react';
import IconBadge from '../shared/IconBadge';
import Card from '../shared/Card';
import { SERVICES } from '../../data/constants';

// Tailwind's JIT scanner only picks up class names it can see as literal
// strings in source — `bg-service-${tone}Bg` would be invisible to it and
// silently produce no styles. A static lookup keeps every class name
// literal so Tailwind generates it.
const CHEVRON_CIRCLE_CLASSES = {
  ambulance: 'bg-service-ambulanceBg text-service-ambulance',
  fire: 'bg-service-fireBg text-service-fire',
  police: 'bg-service-policeBg text-service-police',
  sos: 'bg-service-sosBg text-service-sos',
};

/**
 * ServiceSelect — recreates the "Place emergency call" list from the
 * mobile Home screen: Ambulance / Fire Service / Police / SOS Alert,
 * each with a soft coloured icon badge and a chevron circle on the
 * right in the same tone.
 */
export default function ServiceSelect({ value, onChange }) {
  return (
    <div className="space-y-3">
      {SERVICES.map((service) => {
        const Icon = service.icon;
        const selected = value?.id === service.id;
        return (
          <Card
            key={service.id}
            hoverable
            onClick={() => onChange(service)}
            className={selected ? 'ring-2 ring-nkwa-500' : ''}
          >
            <div className="flex items-center gap-3.5">
              <IconBadge icon={Icon} tone={service.tone} size="md" />
              <div className="flex-1">
                <p className="font-semibold text-ink-900">{service.label}</p>
                <p className="text-sm text-ink-500">{service.description}</p>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${CHEVRON_CIRCLE_CLASSES[service.tone]}`}
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
